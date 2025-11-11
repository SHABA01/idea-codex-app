import React, { useEffect, useState } from "react";
import "../styles/ProfileSetupModal.css";

/**
 * ProfileSetupModal component
 * Props:
 * - onClose() : function when user dismisses the modal
 *
 * Minimal client-side validation for demo / MVP.
 */
const ProfileSetupModal = ({ onClose = () => {} }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
   const handleResize = () => setWindowWidth(window.innerWidth);
   window.addEventListener("resize", handleResize);
   return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isTablet = windowWidth < 1025;
  const isMobile = windowWidth < 601;

  const [form, setForm] = useState({
    fullName: "",
    displayName: "",
    username: "",
    bio: "",
    avatar: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => update("avatar", reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // Basic validation: require displayName or username
    if (!form.displayName && !form.username) {
      setError("Please provide a Display name or Username.");
      return;
    }

    setError("");
    setSaving(true);

    // Simulate saving
    setTimeout(() => {
      localStorage.setItem("userProfile", JSON.stringify(form));

       // ✅ Dispatch custom event so ProfileProgress updates instantly
       window.dispatchEvent(new Event("profileUpdated"));

       setSaving(false);
      console.log("Profile saved:", form);
      onClose();
    }, 800);
  };

  return (
    <div className="profile-overlay" role="dialog" aria-modal="true" aria-label="Complete your profile">
      <div className="profile-card">
        <header className="profile-head">
          <h2>Complete your profile</h2>
          {/*<button className="btn-close" onClick={onClose} aria-label="Close profile setup">✕</button>*/}

          {/* Skip Profile button */}
          <button type="button" className="btn-skip" onClick={onClose}>
            {isTablet || isMobile ? (
              <>Skip</> // Tablet & Mobile
            ) : (
              <>Skip for now</> // Desktop
            )}
          </button>        
        </header>

        <form className="profile-form" onSubmit={handleSave}>
          {/* Avatar Upload */}
          <div className="avatar-upload">
            {form.avatar ? (
              <img src={form.avatar} alt="Avatar" className="avatar-preview" />
            ) : (
              <div className="avatar-placeholder">No Image</div>
            )}
            <label className="avatar-btn">
              Change Picture
              <input type="file" accept="image/*" onChange={handleImageChange} hidden />
            </label>
          </div>

          <label className="field">
            <span className="label">Full name *</span>
            <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="e.g. Philip Shaba" required />
            <small className="hint">Shown on invoices</small>
          </label>

          <label className="field">
            <span className="label">Display name (optional)</span>
            <input value={form.displayName} onChange={(e) => update("displayName", e.target.value)} placeholder="MACHOpes" />
            <small className="hint">How people will see you</small>
          </label>

          <label className="field">
            <span className="label">Handle *</span>
            <div className="username-row">
              <span className="static">@</span>
              <input value={form.username} onChange={(e) => update("username", e.target.value.replace(/\s+/g, ""))} placeholder="philshaba_IdeaCodex" required />
            </div>
            <small className="hint">Used for profile links. No spaces.</small>
          </label>

          <label className="field">
            <span className="label">Short bio *</span>
            <textarea value={form.bio} onChange={(e) => update("bio", e.target.value)} placeholder="I’m a problem solver and builder passionate about turning ideas into actionable solutions. I create projects that combine technology, creativity, and data to make a real impact and help communities collaborate." rows="3" maxLength={350} /*max number of characters*/ required />
            <small className="hint">Introduce yourself — who you are and what you’re building (350 characters max)</small>
          </label>

          {error && <div className="error">{error}</div>}

          <div className="profile-actions">
            <button type="submit" className="btn-save-profile" disabled={saving}>{saving ? "Saving..." : "Save profile"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetupModal;
