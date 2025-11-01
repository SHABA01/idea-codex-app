// src/components/auth/SignUpStep2.jsx
import React from "react";
import { useAuth } from "./AuthContext";
import PasswordInput from "../common/PasswordInput";

const SignUpStep2 = ({ onBack, onContinue }) => {
  const { formData, updateField, handleSignUp, authMessage } = useAuth();

  // call handleSignUp to validate and proceed to OTP
  return (
    <div className="auth-step">
      <h3>Create password</h3>
      <PasswordInput
        name="password"
        value={formData.password}
        onChange={(e) => updateField("password", e.target.value)}
        placeholder="Password"
      />
      <PasswordInput
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={(e) => updateField("confirmPassword", e.target.value)}
        placeholder="Confirm Password"
      />

      <div className="step-nav">
        <button className="auth-btn secondary" onClick={onBack}>
          ← Back
        </button>
        <button className="auth-btn" onClick={handleSignUp}>
          Continue →
        </button>
      </div>

      {authMessage && <p className="error-text">{authMessage}</p>}
    </div>
  );
};

export default SignUpStep2;
