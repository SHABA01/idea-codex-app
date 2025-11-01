// src/components/auth/SignUpStep1.jsx
import React from "react";
import { useAuth } from "./AuthContext";

const SignUpStep1 = ({ onContinue }) => {
  const { formData, updateField, authMessage, setAuthMessage } = useAuth();

  return (
    <div className="auth-step">
      <h3>Sign Up</h3>
      <input
        className="auth-input"
        name="name"
        value={formData.name}
        onChange={(e) => updateField("name", e.target.value)}
        placeholder="Full name"
      />
      <input
        className="auth-input"
        name="email"
        value={formData.email}
        onChange={(e) => updateField("email", e.target.value)}
        placeholder="Email address"
      />
      <div style={{ display: "flex", gap: 8, justifyContent: "space-between", marginTop: 12 }}>
        {/*<div />  placeholder for left arrow space */}
        <button className="auth-btn" onClick={() => { setAuthMessage(""); onContinue(); }}>
          Continue →
        </button>
      </div>
      {authMessage && <p className="error-text">{authMessage}</p>}
    </div>
  );
};

export default SignUpStep1;
