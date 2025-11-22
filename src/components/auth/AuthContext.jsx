// src/components/auth/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { users as seedUsers } from "../../assets/dummydb"; // your existing dummydb import
import { getSavedUser, saveUser } from "../../utils/storage";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const LOCAL_KEY = "dummydb_v1"; // keep your DB key for the users array

const loadDB = () => {
  const local = localStorage.getItem(LOCAL_KEY);
  if (local) return JSON.parse(local);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(seedUsers));
  return seedUsers;
};

const saveDB = (data) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const AuthProvider = ({ children }) => {
  const [mode, setMode] = useState("signup"); // 'signup' | 'signin'
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });
  const [authMessage, setAuthMessage] = useState("");
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  // Local DB and currentUser (from DB OR unified ideaCodexUser storage)
  const [db, setDB] = useState(loadDB());
  const [currentUser, setCurrentUser] = useState(getSavedUser());

  useEffect(() => saveDB(db), [db]);

  // progress for auth steps
  useEffect(() => {
    const totalSteps = mode === "signup" ? 3 : 2;
    setProgress(Math.round((step / totalSteps) * 100));
  }, [mode, step]);

  const updateField = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
  };

  // calculate profile completion based on five fields
  const calculateProfileCompletion = (userData) => {
    if (!userData) return 0;
    const profileFields = ["fullName", "displayName", "handle", "bio", "avatar"];
    const filled = profileFields.filter((f) => userData[f] && userData[f].toString().trim() !== "");
    return Math.round((filled.length / profileFields.length) * 100);
  };

  // update profile (called by ProfileSetupModal) -> updates DB and ideaCodexUser
  const updateProfile = (updates) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updates };
    updatedUser.profileCompletion = calculateProfileCompletion(updatedUser);

    // update current in memory & unified storage
    setCurrentUser(updatedUser);
    saveUserToUnified(updatedUser);

    // update DB (if present)
    const updatedDB = db.map((u) => (u.email === updatedUser.email ? updatedUser : u));
    setDB(updatedDB);
    saveDB(updatedDB);

    // 🔥 notify UI instantly
    window.dispatchEvent(new CustomEvent("ideaCodexUserUpdated", { detail: updatedUser }));
  };

  // helper to save into ideaCodexUser unified localStorage
  const saveUserToUnified = (userObj) => {
    try {
      saveUser(userObj);
    } catch (err) {
      console.error("Error saving unified user:", err);
    }
  };

  // OTP helpers (store otp in DB to simulate)
  const triggerOTP = (email) => {
    const otp = generateOTP();
    const updated = db.map((u) => (u.email === email ? { ...u, otp } : u));
    setDB(updated);
    saveDB(updated);
    // if unified user is the same email, update its otp too (so OTPVerification reads it)
    const savedUnified = getSavedUser();
    if (savedUnified?.email === email) {
      saveUser({ ...savedUnified, otp });
    }
    console.log(`📩 OTP for ${email}: ${otp}`);
    setAuthMessage(`OTP sent to ${email} (simulated, check console/localStorage)`);
    return otp;
  };

  const resendOTP = () => {
    if (!formData.email) {
      setAuthMessage("Enter your email to resend OTP.");
      return;
    }
    triggerOTP(formData.email);
  };

  // verify OTP
  const verifyOTP = () => {
    const user = db.find((u) => u.email === formData.email) || getSavedUser();
    if (user && formData.otp === user.otp) {
      setVerified(true);
      setAuthMessage("✅ Verification successful!");

      // Mark user verified and persist in both DB & unified storage
      const updatedUser = { ...user, verified: true, otp: "" };
      setCurrentUser(updatedUser);
      saveUserToUnified(updatedUser);

      const updatedDB = db.map((u) => (u.email === updatedUser.email ? updatedUser : u));
      setDB(updatedDB);
      saveDB(updatedDB);

      setTimeout(() => {
        if (mode === "signup") {
          setMode("signin");
          setStep(1);
          setFormData({ fullName: "", email: "", password: "", confirmPassword: "", otp: "" });
        } else {
          setAuthMessage("✅ Signed in successfully! Redirecting...");
          setTimeout(() => navigate("/choice"), 800);
        }
        setVerified(false);
      }, 900);
    } else {
      setAuthMessage("❌ Incorrect OTP, please try again.");
    }
  };

  // sign-up (adds to DB and saves to unified user so next OTP step can read)
  const handleSignUp = () => {
    setAuthMessage("");

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setAuthMessage("Please fill in all required fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setAuthMessage("Passwords do not match.");
      return;
    }

    const exists = db.some((u) => u.email === formData.email);
    if (exists) {
      setAuthMessage("Email already registered.");
      return;
    }

    const newUser = {
      id: db.length + 1,
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      otp: generateOTP(),
      displayName: "",
      handle: "",
      bio: "",
      avatar: "/IdeaCodex_icon_yellow.png",
      profileCompletion: 0,
      verified: false
    };

    const updated = [...db, newUser];
    setDB(updated);
    saveDB(updated);

    // persist as unified current user so auth flow can pick it up
    setCurrentUser(newUser);
    saveUserToUnified(newUser);

    console.log("🧾 New user added:", newUser);
    setAuthMessage(`OTP generated for ${formData.email}. Proceed to verification.`);
    setStep(3);
  };

  // sign-in (check DB -> then create/refresh unified user)
  const handleSignIn = () => {
    setAuthMessage("");

    const user = db.find((u) => u.email === formData.email && u.password === formData.password);

    if (user) {
      // store user to unified storage for the rest of the app
      setCurrentUser(user);
      saveUserToUnified(user);

      setAuthMessage("Proceeding to OTP verification...");
      setStep(2);
      triggerOTP(user.email);
    } else {
      setAuthMessage("Invalid email or password.");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    // optionally clear unified storage if you want
    try {
      localStorage.removeItem("ideaCodexUser");
      window.dispatchEvent(new CustomEvent("ideaCodexUserUpdated", { detail: null }));
    } catch (e) {
      // noop
    }
  };

  const value = {
    mode,
    setMode,
    step,
    setStep,
    progress,
    formData,
    updateField,
    handleSignUp,
    handleSignIn,
    verifyOTP,
    resendOTP,
    authMessage,
    setAuthMessage,
    verified,
    currentUser,
    setCurrentUser,
    updateProfile,
    calculateProfileCompletion,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
