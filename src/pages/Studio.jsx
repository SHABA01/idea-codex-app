// src/pages/Studio.jsx
import React, { useRef, useState } from "react";
import ToolPanel from "../components/studio/ToolPanel";
import StudioCanvas from "../components/studio/StudioCanvas";
import AIBar from "../components/studio/AIBar";
import { StudioAccessProvider, useStudioAccess } from "../contexts/StudioAccessContext";
import "../styles/Studio.css";

function StudioInner() {
  const [openTool, setOpenTool] = useState(null);
  const canvasRef = useRef();
  const { isDemo } = useStudioAccess();

  const handleOpenTool = (tool) => setOpenTool(tool);

  const handleInsert = (content) => {
    // here we need to call a method on StudioCanvas - simplest: store a ref or pass handler
    // For now we broadcast an event; better: lift state. We'll keep simple: use custom event
    window.dispatchEvent(new CustomEvent("__studio_insert", { detail: content }));
  };

  // connect canvas insertion: override window.__studio_insert to call internal insert function
  // The StudioCanvas component will also listen to this event (we'll add listening there) OR you can use a ref.
  return (
    <div className="studio-wrapper">
      <ToolPanel onOpenTool={handleOpenTool} />
      <main className="studio-main">
        <div className="studio-topbar">
          <h1>Idea Studio</h1>
          {isDemo && <div className="studio-banner">Demo Mode — some tools are locked</div>}
        </div>

        <div className="studio-workarea">
          <StudioCanvas ref={canvasRef} />
          <div className="tool-flyout">
            {openTool ? (
              <div className="tool-flyout-inner">
                <openTool.Component onInsert={handleInsert} />
              </div>
            ) : (
              <div className="tool-flyout-empty">Open a tool to begin</div>
            )}
          </div>
        </div>

        <AIBar onInsert={handleInsert} />
      </main>
    </div>
  );
}

export default function StudioPageWrapper() {
  // wrap with access provider: you may instead do this globally at AppLayout
  return (
    <StudioAccessProvider>
      <StudioInner />
    </StudioAccessProvider>
  );
}
