import React from "react";
import "../../../../styles/ToolFooter.css";

/**
 * ToolFooter
 *
 * Standard action bar for Studio tools.
 * Pure UI + callbacks. No business logic.
 */
export default function ToolFooter({
  onInsert,
  onReset,
  disabled = false,
  status = "draft" // draft | ready | locked
}) {
  return (
    <div className="tool-footer">
      <div className="tool-footer-status">
        <span className={`tool-status ${status}`}>
          {status.toUpperCase()}
        </span>
      </div>

      <div className="tool-footer-actions">
        {onReset && (
          <button
            className="tool-btn ghost"
            onClick={onReset}
            disabled={disabled}
          >
            Reset
          </button>
        )}

        <button
          className="tool-btn primary"
          onClick={onInsert}
          disabled={disabled || status !== "ready"}
        >
          Insert into Canvas
        </button>
      </div>
    </div>
  );
}
