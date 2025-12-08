// src/pages/ChoiceModal.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudioAccess } from "../contexts/StudioAccessContext";
import ProfileSetupModal from "../components/ProfileSetupModal";
import NeuralNetworkBackground from "../components/NeuralNetworkBackground";
import ProfileProgress from "../components/ProfileProgress";
import "../styles/ChoiceModal.css";
import { getSavedUser } from "../utils/storage";
import AvatarDisplay from "../components/AvatarDisplay";

const ChoiceModal = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Display values shown in the UI
  const [displayName, setDisplayName] = useState("IdeaCodex");
  const [handle, setHandle] = useState("ideacodex");
  const [avatar, setAvatar] = useState(""); // keep empty when no custom avatar; fallback handled by AvatarDisplay

  const navigate = useNavigate();
  const { switchMode } = useStudioAccess();

  const handleStudioLive = () => {
    switchMode("live");
    navigate("/studio");
  };

  const handleCommunityLive = () => {
    switchMode("live");
    navigate("/community");
  };

  const handleDashboardLive = () => {
    switchMode("live");
    navigate("/dashboard");
  };

  const applySaved = (saved) => {
    if (!saved) {
      // fallback defaults
      setDisplayName("IdeaCodex");
      setHandle("ideacodex");
      setAvatar("");
      setImgLoaded(false);
      return;
    }

    // displayName precedence: displayName -> first token of fullName -> default
    const nameToShow =
      saved.displayName && saved.displayName.trim() !== ""
        ? saved.displayName
        : saved.fullName
        ? saved.fullName.split(" ")[0]
        : "IdeaCodex";

    setDisplayName(nameToShow);

    // handle fallback
    setHandle(saved.handle && saved.handle.trim() !== "" ? saved.handle : "ideacodex");

    // Only accept avatar if it's a non-empty string; AvatarDisplay will decide whether it's data/blob/remote
    setAvatar(saved.avatar && saved.avatar.trim() !== "" ? saved.avatar : "");
    setImgLoaded(false);
  };

  useEffect(() => {
    // Initial load
    const saved = getSavedUser();
    applySaved(saved);

    // Listener for local updates (ProfileSetupModal → ChoiceModal)
    const onCustom = (ev) => {
      applySaved(ev.detail);
    };

    // Listener for updates caused by other tabs or view reloads
    const onStorage = (e) => {
      if (e.key === "ideaCodexUser") {
        try {
          applySaved(JSON.parse(e.newValue));
        } catch {
          applySaved(null);
        }
      }
    };

    window.addEventListener("ideaCodexUserUpdated", onCustom);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("ideaCodexUserUpdated", onCustom);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <div className="choice-page">
      <NeuralNetworkBackground withSpiral={false} nodeCount={40} />

      <div
        className="choice-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="choice-title"
      >
        <aside className="choice-left" aria-hidden>
          <div className="choice-left-inner">
            <h2 className="left-eyebrow">Welcome back</h2>
            <h1 id="choice-title" className="left-title">
              Turn your concept into reality
            </h1>
            <p className="left-lead">
              You can jump straight into the Idea Studio to start building,
              explore the community feed, or complete your profile for a better
              personalized experience.
            </p>
            <div className="left-cta-hint">
              <span className="dot" /> Profile completion increases discovery
              and credibility.
            </div>
          </div>
        </aside>

        <main className="choice-right">
          <header className="choice-header">
            <div className="choice-brand">
              {/* AvatarDisplay: when avatar empty -> show initials; when avatar present -> show image */}
              <AvatarDisplay
                avatar={avatar}
                name={displayName}
                size={60}
                className="choice-logo"
                placeholderMode="choiceModal"
              />

              <div className="choice-name">
                <strong className="firstName">{displayName}</strong>
                <small className="muted">@{handle}</small>
              </div>
            </div>

            <ProfileProgress />
          </header>

          <section className="choice-actions">
            <p className="choice-sub">Where would you like to go next?</p>

            <div className="action-grid">
              <button
                className="btn-studio-choice wide"
                onClick={handleStudioLive}
              >
                Go to Idea Studio
                <small className="muted">Start creating ideas</small>
              </button>

              <button
                className="btn-community-choice wide"
                onClick={handleCommunityLive}
              >
                Open Community Feed
                <small className="muted">Catch up with posts & ideas</small>
              </button>

              <button
                className="btn-profile-choice wide"
                onClick={() => setProfileOpen(true)}
              >
                Complete Profile
                <small className="muted">Add a display name, bio & avatar</small>
              </button>

              <button
                className="btn-dashboard-choice wide"
                onClick={handleDashboardLive}
              >
                Maybe Later
                <small className="muted">Take me to Dashboard</small>
              </button>
            </div>

            <div className="choice-footer">
              <a href="/help">Need help?</a>
              <span className="divider">•</span>
              <a href="/privacy">Privacy</a>
            </div>
          </section>
        </main>
      </div>

      {profileOpen && <ProfileSetupModal onClose={() => setProfileOpen(false)} />}
    </div>
  );
};

export default ChoiceModal;
