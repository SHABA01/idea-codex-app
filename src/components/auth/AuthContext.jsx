// src/components/auth/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import dummyDB from "../../assets/dummydb.json";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [mode, setMode] = useState("signup"); // 'signup' | 'signin'
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });
  const [authMessage, setAuthMessage] = useState("");
  const [verified, setVerified] = useState(false);

  // progress mapping (auto-calculated)
  useEffect(() => {
    const totalSteps = mode === "signup" ? 3 : 2;
    setProgress(Math.round((step / totalSteps) * 100));
  }, [mode, step]);

  const updateField = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
  };

  // Simulate sending OTP (we'll just use dummyDB stored OTP)
  const triggerOTP = () => {
    const user = dummyDB.find((u) => u.email === formData.email);
    if (user) {
      setAuthMessage(`OTP sent to ${formData.email} (simulated)`);
    } else {
      setAuthMessage(`No account found for ${formData.email}`);
    }
  };

  const verifyOTP = () => {
    const user = dummyDB.find((u) => u.email === formData.email);
    if (user && formData.otp === user.otp) {
      setVerified(true);
      setAuthMessage("✅ Verification successful!");
      // simulate redirect/next step
      setTimeout(() => {
        if (mode === "signup") {
          // in real case, you would create user in DB then redirect to sign-in
          setMode("signin");
          setStep(1);
        } else {
          // successful sign-in -> redirect to dashboard (simulate)
          setAuthMessage("✅ Signed in. Redirecting to Dashboard (simulated)...");
        }
        setVerified(false);
        setFormData({ name: "", email: "", password: "", confirmPassword: "", otp: "" });
      }, 1200);
    } else {
      setAuthMessage("❌ Incorrect OTP, please try again.");
    }
  };

  // Sign up simulation: validate and move to OTP step
  const handleSignUp = () => {
    setAuthMessage("");
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setAuthMessage("Please fill in all required fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setAuthMessage("Passwords do not match.");
      return;
    }
    const exists = dummyDB.some((u) => u.email === formData.email);
    if (exists) {
      setAuthMessage("Email already registered.");
      return;
    }
    // proceed to OTP (simulated)
    setAuthMessage("Proceeding to OTP verification...");
    setStep(3);
    // in real app: send OTP via backend, here we just call triggerOTP
    setTimeout(() => triggerOTP(), 400);
  };

  // Sign in simulation: check credentials then OTP
  const handleSignIn = () => {
    setAuthMessage("");
    const user = dummyDB.find((u) => u.email === formData.email && u.password === formData.password);
    if (user) {
      setAuthMessage("Proceeding to OTP verification...");
      setStep(2); // Signin uses 2 steps: credentials -> OTP
      setTimeout(() => triggerOTP(), 400);
    } else {
      setAuthMessage("Invalid email or password.");
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
    authMessage,
    setAuthMessage,
    verified
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
