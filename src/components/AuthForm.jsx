// src/components/AuthForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FadeTransition from "./FadeTransition";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import NeuralNetworkBackground from "./NeuralNetworkBackground";
import ProgressBar from "./ProgressBar";
import GoogleButton from "./GoogleButton";
import SignUpStep1 from "./auth/SignUpStep1";
import SignUpStep2 from "./auth/SignUpStep2";
import SignInStep1 from "./auth/SignInStep1";
import OTPVerification from "./auth/OTPVerification";
import logo from "../assets/IdeaCodex_icon_yellow.png";
import "../styles/AuthForm.css";

const AuthFormInner = () => {
  const { mode, setMode, step, setStep, progress } = useAuth();
  const navigate = useNavigate();
  const { mode: routeMode } = useParams(); // "signup" or "signin"
  const [isSynced, setIsSynced] = useState(false); // fixes the brief mode mismatch

  // Initialize or sync mode with route
  useEffect(() => {
    if (routeMode && routeMode !== mode) {
      setMode(routeMode);
      setStep(1);
    }
    setIsSynced(true);
  }, [routeMode]);

  // toggle sign in / sign up (no double triggering)
  const toggleMode = () => {
    const newMode = mode === "signup" ? "signin" : "signup";
    navigate(`/auth/${newMode}`);
  };

  // back to landing page
  const handleBackHome = () => {
    navigate("/");
  };

  // render appropriate step
  const renderStep = () => {
    if (mode === "signup") {
      if (step === 1) return <SignUpStep1 onContinue={() => setStep(2)} />;
      if (step === 2)
        return (
          <SignUpStep2
            onBack={() => setStep(1)}
            onContinue={() => setStep(3)}
          />
        );
      if (step === 3) return <OTPVerification />;
    } else {
      if (step === 1) return <SignInStep1 onContinue={() => setStep(2)} />;
      if (step === 2) return <OTPVerification />;
    }
    return null;
  };

  // avoid premature render before sync
  if (!isSynced) return null;

  return (
    <div className="auth-form">
      <NeuralNetworkBackground withSpiral={false} nodeCount={20} />

      <div className="auth-form-inner">
        {/* Logo */}
        <div className="auth-logo">
          <img src={logo} alt="IdeaCodex logo" />
        </div>

        <p className="auth-subtitle">Begin your journey from idea to product.</p>

        <ProgressBar
          progress={progress}
          step={step}
          totalSteps={mode === "signup" ? 3 : 2}
          showPercent={true}
        />

        <FadeTransition modeKey={`${mode}-${step}`}>
          {renderStep()}
        </FadeTransition>

        <div style={{ marginTop: 14 }} className="auth-divider">
          <span>OR</span>
        </div>

        <GoogleButton
          onSuccess={() =>
            alert("Simulated Google sign-in success (connect real OAuth later)")
          }
        />

        <p className="auth-toggle" style={{ marginTop: 12 }}>
          {mode === "signup"
            ? "Already have an account? "
            : "Don’t have an account? "}
          <button type="button" onClick={toggleMode} className="toggle-link">
            {mode === "signup" ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

// Wrap in AuthProvider
const AuthForm = ({ mode = "signup" }) => (
  <AuthProvider>
    <AuthFormInner initialMode={mode} />
  </AuthProvider>
);

export default AuthForm;
