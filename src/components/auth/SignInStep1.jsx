// src/components/auth/SignInStep1.jsx
import React from "react";
import { useAuth } from "./AuthContext";
import PasswordInput from "../common/PasswordInput";

const SignInStep1 = ({ onContinue }) => {
  const { formData, updateField, handleSignIn, authMessage } = useAuth();

  return (
    <div className="auth-step">
      <h3>Sign In</h3>
      <input
        className="auth-input"
        name="email"
        value={formData.email}
        onChange={(e) => updateField("email", e.target.value)}
        placeholder="Email address"
      />
      <PasswordInput
        name="password"
        value={formData.password}
        onChange={(e) => updateField("password", e.target.value)}
        placeholder="Password"
      />      

      <button className="auth-btn" onClick={handleSignIn}>
        Continue →
      </button>
      {authMessage && <p className="error-text">{authMessage}</p>}
    </div>
  );
};

export default SignInStep1;
