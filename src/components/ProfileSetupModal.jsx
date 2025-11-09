import React, { useState } from "react";
import "../styles/ProfileSetupModal.css";

/**
 * ProfileSetupModal component
 * Props:
 * - onClose() : function when user dismisses the modal
 *
 * Minimal client-side validation for demo / MVP.
 */
const ProfileSetupModal = ({ onClose = () => {} }) => {
  const [form, setForm] = useState({
    fullName: "",
    displayName: "",
    username: "",
    bio: "",
    location: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

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
      setSaving(false);
      onClose();
      // In real app: call API, then redirect / update profile state
    }, 900);
  };

  return (
    <div className="profile-overlay" role="dialog" aria-modal="true" aria-label="Complete your profile">
      <div className="profile-card">
        <header className="profile-head">
          <h2>Complete your profile</h2>
          <button className="btn-close" onClick={onClose} aria-label="Close profile setup">✕</button>
        </header>

        <form className="profile-form" onSubmit={handleSave}>
          <label className="field">
            <span className="label">Full name (optional)</span>
            <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="e.g. Ada Lovelace" />
            <small className="hint">Shown on invoices & verified pages (optional)</small>
          </label>

          <label className="field">
            <span className="label">Display name</span>
            <input value={form.displayName} onChange={(e) => update("displayName", e.target.value)} placeholder="How people will see you" required />
          </label>

          <label className="field">
            <span className="label">Username / handle</span>
            <div className="username-row">
              <span className="static">@</span>
              <input value={form.username} onChange={(e) => update("username", e.target.value.replace(/\s+/g, ""))} placeholder="your-handle" />
            </div>
            <small className="hint">Used for profile links. No spaces.</small>
          </label>

          <label className="field">
            <span className="label">Short bio</span>
            <textarea value={form.bio} onChange={(e) => update("bio", e.target.value)} placeholder="Tell the community what you build" rows="3" />
          </label>

          {error && <div className="error">{error}</div>}

          <div className="profile-actions">
            <button type="button" className="btn-muted" onClick={onClose}>Skip for now</button>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving..." : "Save profile"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetupModal;
