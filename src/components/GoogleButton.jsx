// src/components/GoogleButton.jsx
import React from "react";
import "../styles/AuthForm.css"; // reuse your auth styles for consistent look

const GoogleButton = ({ disabled = false, onSuccess }) => {
  const handleGoogle = (e) => {
    e.preventDefault();
    // simulate external sign-in
    // in real app, you'd call OAuth; here we just simulate a successful sign-in
    if (onSuccess) {
      onSuccess({ provider: "google", email: "google.user@example.com" });
    } else {
      alert("Simulated Google sign-in (no backend).");
    }
  };

  return (
    <button className="google-btn" onClick={handleGoogle} disabled={disabled} aria-label="Continue with Google">
      <i className="fa-brands fa-google" aria-hidden="true" style={{ fontSize: 16 }}></i>
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleButton;
