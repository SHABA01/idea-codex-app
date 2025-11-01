// src/components/ProgressBar.jsx
import React from "react";
import "../styles/ProgressBar.css";

const ProgressBar = ({ progress, step, totalSteps, showPercent = "hover" }) => {
  // showPercent options:
  // "always" → always visible
  // "hover"  → only visible on hover
  // "none"   → hidden entirely

  return (
    <div
      className={`progress-container ${
        showPercent === "hover" ? "percent-hover" : ""
      }`}
    >
      <div className="progress-text">
        Step {step} of {totalSteps}
        {showPercent !== "none" && (
          <span className="progress-percent">{progress}%</span>
        )}
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
