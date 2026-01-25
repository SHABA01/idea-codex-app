import React from "react";
import "../../../../styles/ToolStepShell.css";

/**
 * ToolStepShell
 *
 * Structural wrapper for tool steps.
 * Handles layout only.
 */
export default function ToolStepShell({
  title,
  children,
  onInsert,
  onReset,
  status = "draft",
  disabled = false
}) {
  return (
    <section className="tool-shell">
      <header className="tool-shell-header">
        <h3>{title}</h3>
      </header>

      <div className="tool-body">
        {children}
      </div>
    </section>
  );
}
