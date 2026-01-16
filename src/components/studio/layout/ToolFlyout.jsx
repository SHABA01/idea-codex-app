import React from "react";
import "../../../styles/ToolFlyout.css";

/**
 * ToolFlyout
 *
 * Pure visual container.
 * Does NOT resolve tools.
 */
export default function ToolFlyout({ title, onClose, children }) {
  return (
    <div className="tool-flyout">
      <header className="flyout-header">
        <strong>{title}</strong>
        <button className="flyout-close" onClick={onClose}>
          ✕
        </button>
      </header>

      <div className="flyout-content">
        {children}
      </div>
    </div>
  );
}
