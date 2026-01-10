import React from "react";
import "../../../styles/ToolFlyout.css";

/**
 * ToolFlyout
 *
 * Hosts the active Studio tool.
 * Lifecycle controlled by Studio.jsx
 */
export default function ToolFlyout({
  tool,
  onClose,
  onInsert
}) {
  if (!tool) return null;

  const ToolComponent = tool.Component;

  return (
    <div className="tool-flyout">
      <header className="flyout-header">
        <strong>{tool.name}</strong>
        <button className="flyout-close" onClick={onClose}>
          ✕
        </button>
      </header>

      <div className="flyout-content">
        <ToolComponent onInsert={onInsert} />
      </div>
    </div>
  );
}
