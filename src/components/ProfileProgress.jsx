// src/components/ProfileProgress.jsx
import React, { useEffect, useState } from "react";
import "../styles/ProfileProgress.css";
import { getSavedUser } from "../utils/storage";

const ProfileProgress = () => {
  const [progress, setProgress] = useState(0);

  const calculate = (user = null) => {
    const u = user || getSavedUser() || {};
    const fields = ["fullName", "displayName", "handle", "bio", "avatar"];
    let completed = 0;
    fields.forEach((k) => {
      if (u[k] && u[k].toString().trim() !== "") completed++;
    });
    setProgress(Math.round((completed / fields.length) * 100));
  };

  useEffect(() => {
    calculate();

    const onStorage = (e) => {
      if (e.key === "ideaCodexUser") {
        try {
          calculate(JSON.parse(e.newValue));
        } catch {
          calculate();
        }
      }
    };

    const onCustom = (ev) => {
      calculate(ev.detail);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("ideaCodexUserUpdated", onCustom);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ideaCodexUserUpdated", onCustom);
    };
  }, []);

  return (
    <div className="profile-completion">
      <div className="progress-pill">Profile: <strong>{progress}%</strong></div>
    </div>
  );
};

export default ProfileProgress;
