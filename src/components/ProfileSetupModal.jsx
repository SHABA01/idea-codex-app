// src/components/ProfileSetupModal.jsx
import React, { useEffect, useState } from "react";
import "../styles/ProfileSetupModal.css";

const ProfileSetupModal = ({ onClose = () => {} }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isTablet = windowWidth < 1025;
  const isMobile = windowWidth < 601;

  // Load user from unified storage
  const storedUser =
    JSON.parse(localStorage.getItem("ideaCodexUser")) || {};

  const [formData, setForm] = useState({
    fullName: storedUser.fullName || "",
    displayName: storedUser.displayName || "",
    handle: storedUser.handle || "",
    bio: storedUser.bio || "",
    avatar: storedUser.avatar || "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (k, v) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  /** Avatar upload handler */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => update("avatar", reader.result);
    reader.readAsDataURL(file);
  };

  /** Save + write back into ideaCodexUser */
  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.fullName && !formData.handle) {
      setError("Please provide your Full name or handle.");
      return;
    }

    setError("");
    setSaving(true);

    setTimeout(() => {
      const updatedUser = {
        ...storedUser,
        ...formData,
        profileCompletion: calculateProfileCompletion(formData),
      };

      localStorage.setItem(
        "ideaCodexUser",
        JSON.stringify(updatedUser)
      );

      // Let ProfileProgress & ChoiceModal update
      window.dispatchEvent(new Event("profileUpdated"));

      setSaving(false);
      onClose();
    }, 600);
  };

  /** Automatically calculate profile completion */
  const calculateProfileCompletion = (data) => {
    const fields = ["fullName", "displayName", "handle", "bio", "avatar"];
    const filled = fields.filter((f) => data[f] && data[f] !== "").length;

    return Math.round((filled / fields.length) * 100);
  };

  return (
    <div
      className="profile-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Complete your profile"
    >
      <div className="profile-card">
        <header className="profile-head">
          <h2>Complete your profile</h2>

          <button type="button" className="btn-skip" onClick={onClose}>
            {isTablet || isMobile ? "Skip" : "Skip for now"}
          </button>
        </header>

        <form className="profile-form" onSubmit={handleSave}>
          {/* Avatar */}
          <div className="avatar-upload">
            {formData.avatar ? (
              <img
                src={formData.avatar}
                alt="Avatar"
                className="avatar-preview"
              />
            ) : (
              <div className="avatar-placeholder">No Image</div>
            )}

            <label className="avatar-btn">
              Change Picture
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Full Name */}
          <label className="field">
            <span className="label">Full name *</span>
            <input
              value={formData.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="e.g. Philip Shaba"
              maxLength={20}
              required
            />
          </label>

          {/* Display Name */}
          <label className="field">
            <span className="label">Display name (optional)</span>
            <input
              value={formData.displayName}
              onChange={(e) => update("displayName", e.target.value)}
              placeholder="MACHOpes"
              maxLength={20}
            />
          </label>

          {/* Handle */}
          <label className="field">
            <span className="label">Handle *</span>
            <div className="handle-row">
              <span className="static">@</span>
              <input
                value={formData.handle}
                onChange={(e) =>
                  update(
                    "handle",
                    e.target.value.replace(/\s+/g, "")
                  )
                }
                placeholder="philshaba_IdeaCodex"
                maxLength={20}
                required
              />
            </div>
          </label>

          {/* Bio */}
          <label className="field">
            <span className="label">Short bio *</span>
            <textarea
              value={formData.bio}
              onChange={(e) => update("bio", e.target.value)}
              placeholder="Tell us about yourself…"
              rows="3"
              maxLength={350}
              required
            />
          </label>

          {error && <div className="error">{error}</div>}

          <div className="profile-actions">
            <button
              type="submit"
              className="btn-save-profile"
              disabled={saving}
            >
              {saving ? "Saving…" : "Save profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetupModal;
