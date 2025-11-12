// src/components/ProfileProgress.jsx
import React, { useEffect, useState } from "react";
import "../styles/ProfileProgress.css";

const ProfileProgress = () => {
  const [progress, setProgress] = useState(0);

  const calculateProgress = () => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
    const fields = ["displayName", "handle", "bio", "avatar"];
    const completed = fields.filter(
      (key) => storedProfile[key] && storedProfile[key].trim() !== ""
    ).length;

    const percentage = Math.round((completed / fields.length) * 100);
    setProgress(percentage);
  };

  useEffect(() => {
    calculateProgress();

    const handleProfileUpdated = () => calculateProgress();
    const handleStorage = (e) => {
      if (e.key === "userProfile") calculateProgress();
    };

    window.addEventListener("profileUpdated", handleProfileUpdated);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdated);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <div className="profile-completion">
      <div className="progress-pill">
        Profile: <strong>{progress}%</strong>
      </div>
    </div>
  );
};

export default ProfileProgress;
