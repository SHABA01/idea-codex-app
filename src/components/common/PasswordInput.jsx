// src/components/common/PasswordInput.jsx
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // modern, professional icons
import "../../styles/PasswordInput.css";

const PasswordInput = ({
  name = "password",
  value,
  onChange,
  placeholder = "Password",
  className = "auth-input",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-input-wrapper">
      <input
        className={className}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      {value.length > 0 && (
        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff size={18} strokeWidth={2} />
          ) : (
            <Eye size={18} strokeWidth={2} />
          )}
        </button>
      )}
    </div>
  );
};

export default PasswordInput;
