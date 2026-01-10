import React from "react";
import toolRegistry from "./toolRegistry";
import "../../../styles/ToolRenderer.css";

/**
 * ToolRenderer
 *
 * Runtime orchestrator for Studio tools.
 * Decides what tool to render and how.
 */
export default function ToolRenderer({
  activeToolId,
  project,
  userTier = "demo",
  onInsertBlock,
  onClose
}) {
  if (!activeToolId) {
    return (
      <div className="tool-renderer-empty">
        Select a tool to begin
      </div>
    );
  }

  const tool = toolRegistry.find((t) => t.id === activeToolId);

  if (!tool) {
    return (
      <div className="tool-renderer-error">
        Tool not found
      </div>
    );
  }

  /* Tier enforcement */
  const tierBlocked =
    tool.tier === "pro" && userTier !== "pro";

  if (tierBlocked) {
    return (
      <div className="tool-renderer-locked">
        <h3>{tool.name}</h3>
        <p>This tool is available on the Pro plan.</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  const ToolComponent = tool.Component;

  return (
    <div className="tool-renderer">
      <ToolComponent
        project={project}
        onInsert={(payload) =>
          onInsertBlock({
            tool: tool.id,
            title: tool.name,
            content: payload
          })
        }
        onClose={onClose}
      />
    </div>
  );
}
