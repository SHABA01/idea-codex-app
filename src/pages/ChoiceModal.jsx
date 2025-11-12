import React, { useState, useEffect } from "react";
import ProfileSetupModal from "../components/ProfileSetupModal";
import NeuralNetworkBackground from "../components/NeuralNetworkBackground";
import ProfileProgress from "../components/ProfileProgress";
import "../styles/ChoiceModal.css";

/**
 * ChoiceModal page. Shows the choice modal after sign-in.
 * Desktop: wide split panel (left visual / right choices)
 * Tablet: compressed split
 * Mobile: stacked / compact
 */
const ChoiceModal = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [firstName, setFirstName] = useState("Maker");
  const [avatar, setAvatar] = useState("../../assets/IdeaCodex_icon_yellow.png");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const profile = JSON.parse(localStorage.getItem("userProfile"));

    if (user?.fullName) {
      const first = user.fullName.split(" ")[0];
      setFirstName(first);
    }
    if (profile?.avatar) {
      setAvatar(profile.avatar);
    }
  }, []);

  return (
    <div className="choice-page">
      {/* The dynamic background */}
      <NeuralNetworkBackground withSpiral={false} nodeCount={40} />

      {/* The choice modal */}
      <div className="choice-modal" role="dialog" aria-modal="true" aria-labelledby="choice-title">
        {/* Left visual / hero column */}
        <aside className="choice-left" aria-hidden>
          <div className="choice-left-inner">
            <h2 className="left-eyebrow">Welcome back</h2>
            <h1 id="choice-title" className="left-title">Turn your concept into reality</h1>
            <p className="left-lead">
              You can jump straight into the Idea Studio to start building, explore the community feed,
              or complete your profile for a better personalized experience.
            </p>
            <div className="left-cta-hint">
              <span className="dot" /> Profile completion increases discovery and credibility.
            </div>
          </div>
        </aside>

        {/* Right actions column */}
        <main className="choice-right">
          <header className="choice-header">
            <div className="choice-brand">
              <img src={avatar} alt="Profile" className="choice-logo" />
              <div className="choice-welcome">
                <strong className="user-name">{firstName}</strong>
              </div>
            </div>

            <ProfileProgress />
          </header>

          <section className="choice-actions">
            <p className="choice-sub">
              Where would you like to go next?
            </p>

            <div className="action-grid">
              <button className="btn-studio-choice wide" onClick={() => window.location.assign("/studio")}>
                Go to Idea Studio
                <small className="muted">Start creating ideas</small>
              </button>

              <button className="btn-community-choice wide" onClick={() => window.location.assign("/community")}>
                Open Community Feed
                <small className="muted">Catch up with posts & ideas</small>
              </button>

              <button className="btn-profile-choice wide" onClick={() => setProfileOpen(true)}>
                Complete Profile
                <small className="muted">Add a display name, bio & avatar</small>
              </button>

              <button className="btn-dashboard-choice wide" onClick={() => window.location.assign("/dashboard")}>
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

      {/* Profile setup modal (overlay) */}
      {profileOpen && <ProfileSetupModal onClose={() => setProfileOpen(false)} />}

    </div>
  );
};

export default ChoiceModal;
