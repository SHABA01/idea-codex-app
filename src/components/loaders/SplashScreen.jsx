// src/loaders/components/SplashScreen.jsx
import React, { useEffect, useState } from "react";
import NeuralNetworkConstellation from "../../components/visuals/NeuralNetworkConstellation";
import "../../styles/SplashScreen.css";
import logo from "../../assets/IdeaCodex_icon_yellow.png"; // bundled asset (same-origin)

const SplashScreen = ({ onComplete }) => {
  // small state to trigger fade-out before unmount in SplashRouteWrapper
  const [fadeOut, setFadeOut] = useState(false);

  // ensure the constellation has enough time to show its 'hold' phase
  // Choose durations: random (initial), move (to constellation), hold (show constellation), dissolve
  const phaseDurations = {
    random: 900,
    move: 900,
    hold: 1600,    // hold long enough so brand is readable
    dissolve: 700,
  };

  // After the full sequence finishes, we fade out a bit and notify parent.
  const handleComplete = () => {
    setFadeOut(true);
    setTimeout(() => onComplete?.(), 500); // match SplashRouteWrapper's remove timing if used
  };

  // Make the constellation select target automatically by width
  // responsiveTargets=true will pick "logo+text" | "text" | "logo" based on viewport width
  return (
    <div className={`splash-container ${fadeOut ? "fade-out" : ""}`} aria-hidden>
      <NeuralNetworkConstellation
        nodeCount={56}
        responsiveTargets={true}
        logoSrc={logo}            // pass logo so constellation can sample pixels to form identical logo
        phaseDurations={phaseDurations}
        loop={false}              // run sequence once
        withSpiral={true}
        onComplete={handleComplete}
      />

      {/* Visually hidden fallback brand for accessibility (not displayed) */}
      <div className="splash-brand-visually-hidden" aria-hidden="true">
        IdeaCodex
      </div>
    </div>
  );
};

export default SplashScreen;
