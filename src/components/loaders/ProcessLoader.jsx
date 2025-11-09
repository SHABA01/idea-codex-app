// src/components/ProcessLoader.jsx
import React, { useEffect } from "react";
import NeuralNetworkConstellation from "../../components/visuals/NeuralNetworkConstellation";
import "../../styles/ProcessLoader.css";
import logo from "../../assets/IdeaCodex_icon_yellow.png";

const ProcessLoader = ({ message = "Processing…", onDone }) => {
  // We'll loop the constellation while process is active.
  useEffect(() => {
    // optional: focus management or aria-busy toggles can be added here
    return () => {
      onDone?.();
    };
  }, [onDone]);

  return (
    <div className="process-overlay" role="status" aria-live="polite">
      {/* translucent backdrop */}
      <div className="process-backdrop" />

      <div className="process-inner">
        <div style={{ position: "relative", width: 260, height: 120 }}>
          <NeuralNetworkConstellation
            nodeCount={40}
            responsiveTargets={false}
            targetType="logo"         // only logo for loader
            logoSrc={logo}
            phaseDurations={{ random: 700, move: 700, hold: 1200, dissolve: 600 }}
            loop={true}               // keep looping until overlay unmounts
            withSpiral={false}
          />
        </div>
        <div className="process-message">{message}</div>
      </div>
    </div>
  );
};

export default ProcessLoader;
