// src/components/ProfileProgress.jsx
import React, { useEffect, useState } from "react";
import "../styles/ProfileProgress.css";

const ProfileProgress = () => {
  const [progress, setProgress] = useState(0);

  const calculateProgress = () => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
    const totalFields = 5; // displayName, username, bio, location, avatar
    let completed = 0;

    ["displayName", "username", "bio", "location", "avatar"].forEach((key) => {
      if (storedProfile[key] && storedProfile[key].trim() !== "") {
        completed++;
      }
    });

    setProgress(Math.round((completed / totalFields) * 100));
  };

  useEffect(() => {
    calculateProgress();

    // Listen for profile changes via localStorage or custom event
    const handleStorage = (e) => {
      if (e.key === "userProfile") calculateProgress();
    };
    const handleProfileUpdated = () => calculateProgress();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("profileUpdated", handleProfileUpdated);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("profileUpdated", handleProfileUpdated);
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
