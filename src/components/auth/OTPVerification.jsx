// src/components/auth/OTPVerification.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const OTPVerification = () => {
  const { formData, updateField, verifyOTP, resendOTP, authMessage } = useAuth();
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      const id = setTimeout(() => setTimer((t) => t - 1), 1000);
      return () => clearTimeout(id);
    }
  }, [timer]);

  return (
    <div className="otp-container">
      <h3>Verify your account</h3>
      <p className="muted">
        Enter the 6-digit code sent to <strong>{formData.email}</strong>
      </p>

      <input
        className="auth-input"
        maxLength={6}
        value={formData.otp}
        onChange={(e) =>
          updateField("otp", e.target.value.replace(/\D/g, "").slice(0, 6))
        }
        placeholder="123456"
        inputMode="numeric"
      />

      <button
        className="auth-btn"
        onClick={verifyOTP}
        disabled={formData.otp.length < 6}
      >
        Verify
      </button>

      <div style={{ marginTop: 12 }}>
        {timer > 0 ? (
          <span className="muted">Resend code in {timer}s</span>
        ) : (
          <button
            className="resend-btn"
            onClick={() => {
              resendOTP();
              setTimer(30);
            }}
          >
            Resend Code
          </button>
        )}
      </div>

      {authMessage && (
        <p className="error-text" style={{ marginTop: 12 }}>
          {authMessage}
        </p>
      )}
    </div>
  );
};

export default OTPVerification;
