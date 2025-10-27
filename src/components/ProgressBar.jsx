import React from "react";
import "../styles/ProgressBar.css";

const ProgressBar = ({ progress, step }) => {
  return (
    <div className="progress-container">
      <div className="progress-text">
        Step {step} of 3
        <span className="progress-percent">{progress}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
