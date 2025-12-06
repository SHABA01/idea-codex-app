// src/components/studio/ToolPanel.jsx
import React from "react";
import toolRegistry from "./ToolRegistry";
import { useStudioAccess } from "../../contexts/StudioAccessContext";
import "../../styles/Studio.css";

const ToolListItem = ({ tool, onOpen }) => {
  return (
    <button className="tool-list-item" onClick={() => onOpen(tool)}>
      <i className={tool.icon} aria-hidden />
      <span>{tool.name}</span>
      {tool.premium && <small className="premium-badge">PRO</small>}
    </button>
  );
};

export default function ToolPanel({ onOpenTool }) {
  const { isDemo } = useStudioAccess();

  return (
    <aside className="studio-toolpanel">
      <div className="toolpanel-header"><strong>Tools</strong></div>
      <div className="tool-list">
        {toolRegistry.map((t) => (
          <div key={t.id} className={`tool-list-row ${t.premium ? "tool-premium" : ""}`}>
            <ToolListItem
              tool={t}
              onOpen={(tool) => {
                if (tool.premium && isDemo) {
                  // you can show a modal or toast here
                  alert("This tool is premium — sign in for access.");
                  return;
                }
                onOpenTool(tool);
              }}
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
