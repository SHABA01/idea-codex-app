import React from "react";
import "../../../styles/StudioTopbar.css";

/**
 * StudioTopbar
 *
 * Displays project metadata and high-level actions.
 * NO navigation, NO breadcrumbs.
 */
export default function StudioTopbar({
  projectName,
  status,
  lastSaved,
  onOpenTools
}) {
  return (
    <div className="studio-project-meta">
      <div className="meta-left">
        <h2>{projectName || "Untitled Project"}</h2>
        <span className="project-status">{status || "Draft"}</span>
      </div>

      <div className="meta-right">
        <span className="last-saved">
          {lastSaved ? `Saved ${lastSaved}` : "Not saved yet"}
        </span>

        <button
          className="open-tools-btn"
          onClick={onOpenTools}
        >
          Tools
        </button>
      </div>
    </div>
  );
}
