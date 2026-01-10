import React from "react";
import "../../../styles/StudioLayout.css";

/**
 * StudioLayout
 *
 * Structural shell for the Studio ecosystem.
 * Does NOT own business logic.
 *
 * Slots:
 * - topbar: project meta, actions
 * - launcher: tool launcher trigger / overlay
 * - canvas: main working surface
 * - flyout: active tool panel
 * - aiBar: AI assistance bar
 */
export default function StudioLayout({
  topbar,
  launcher,
  canvas,
  flyout,
  aiBar
}) {
  return (
    <div className="studio-layout">
      {/* Top meta bar */}
      {topbar && (
        <header className="studio-topbar">
          {topbar}
        </header>
      )}

      {/* Main work area */}
      <div className="studio-body">
        {/* Tool launcher trigger / overlay anchor */}
        {launcher && (
          <div className="studio-launcher-slot">
            {launcher}
          </div>
        )}

        {/* Core working row */}
        <div className="studio-work-row">
          <main className="studio-canvas-slot">
            {canvas}
          </main>

          {flyout && (
            <aside className="studio-flyout-slot">
              {flyout}
            </aside>
          )}
        </div>
      </div>

      {/* AI bar is ALWAYS last and never overlaps */}
      {aiBar && (
        <footer className="studio-ai-slot">
          {aiBar}
        </footer>
      )}
    </div>
  );
}
