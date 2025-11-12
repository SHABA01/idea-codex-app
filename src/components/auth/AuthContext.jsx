// src/components/auth/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../../assets/dummydb";


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const LOCAL_KEY = "dummydb_v1"; // store users here

const loadDB = () => {
  const local = localStorage.getItem(LOCAL_KEY);
  if (local) return JSON.parse(local);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(users));
  return users;
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

  // ⚙️ Local “database” simulation
  const [db, setDB] = useState(loadDB());
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    saveDB(db); // persist updates
  }, [db]);

  // Auto-calculate progress
  useEffect(() => {
    const totalSteps = mode === "signup" ? 3 : 2;
    setProgress(Math.round((step / totalSteps) * 100));
  }, [mode, step]);

  const updateField = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
  };

  // 🧮 Function to calculate profile completion dynamically
  const calculateProfileCompletion = (userData) => {
    if (!userData) return 0;
    const profileFields = ["fullName", "handle", "bio", "avatar"];
    const filledFields = profileFields.filter(
      (field) => userData[field] && userData[field].trim() !== ""
    );
    return Math.round((filledFields.length / profileFields.length) * 100);
  };

  // 🪄 Update user profile + recalc completion + persist to localStorage
  const updateProfile = (updates) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updates };
    updatedUser.profileCompletion = calculateProfileCompletion(updatedUser);

    setCurrentUser(updatedUser);

    // update DB
    const updatedDB = db.map((u) =>
      u.email === currentUser.email ? updatedUser : u
    );
    setDB(updatedDB);
    saveDB(updatedDB);
  };

  // 🟡 Generate & store OTP for given user (new or existing)
  const triggerOTP = (email) => {
    const otp = generateOTP();
    const updated = db.map((u) =>
      u.email === email ? { ...u, otp } : u
    );
    setDB(updated);
    saveDB(updated);
    console.log(`📩 OTP for ${email}: ${otp}`);
    setAuthMessage(`OTP sent to ${email} (simulated, check console/localStorage)`);
    return otp;
  };

  // 🔁 Resend OTP — just calls triggerOTP again
  const resendOTP = () => {
    if (!formData.email) {
      setAuthMessage("Enter your email to resend OTP.");
      return;
    }
    triggerOTP(formData.email);
  };

  // ✅ OTP Verification
  const verifyOTP = () => {
    const user = db.find((u) => u.email === formData.email);
    if (user && formData.otp === user.otp) {
      setVerified(true);
      setAuthMessage("✅ Verification successful!");

      setTimeout(() => {
        if (mode === "signup") {
          // After signup verification → go to sign-in
          setMode("signin");
          setStep(1);
          setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            otp: ""
          });
        } else {
          // After sign-in verification → go to choice page
          setAuthMessage("✅ Signed in successfully! Redirecting...");
          setTimeout(() => navigate("/choice"), 800);
        }
        setVerified(false);
      }, 1200);
    } else {
      setAuthMessage("❌ Incorrect OTP, please try again.");
    }
  };

  // 🧩 Sign-up handler — adds new user to DB, triggers OTP
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

    // Add new user
    const newUser = {
      id: db.length + 1,
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      otp: generateOTP(),
      displayName: "",
      handle: "",
      bio: "",
      avatar: "",
      profileCompletion: 0,
    };

    const updated = [...db, newUser];
    setDB(updated);
    saveDB(updated);

    console.log("🧾 New user added:", newUser);
    setAuthMessage(`OTP generated for ${formData.email}. Proceed to verification.`);
    setStep(3);
  };

  // 🔐 Sign-in handler
  const handleSignIn = () => {
    setAuthMessage("");

    const user = db.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      setAuthMessage("Proceeding to OTP verification...");
      setStep(2);
      triggerOTP(user.email);
    } else {
      setAuthMessage("Invalid email or password.");
    }
  };

  const logout = () => {
    setCurrentUser(null);
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
    // 🧠 added below:
    currentUser,
    setCurrentUser,
    updateProfile,
    calculateProfileCompletion,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
