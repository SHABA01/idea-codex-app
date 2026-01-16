import toolRegistry from "./toolRegistry";

/**
 * ToolRenderer
 *
 * Resolves tool configuration and renders the active tool.
 */
export default function ToolRenderer({
  activeToolId,
  project,
  userTier = "demo",
  onInsertBlock,
  onClose
}) {
  if (!activeToolId) return null;

  const tool = toolRegistry.find(t => t.id === activeToolId);
  if (!tool) return null;

  /* Tier enforcement */
  const tierBlocked =
    tool.tier === "pro" && userTier !== "pro";

  if (tierBlocked) {
    return (
      <div style={{ padding: "16px" }}>
        <h3>{tool.name}</h3>
        <p>This tool is available on the Pro plan.</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  const ToolComponent = tool.Component;

  return (
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
  );
}
