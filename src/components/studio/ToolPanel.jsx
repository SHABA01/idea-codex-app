// src/components/studio/ToolPanel.jsx
import React from "react";
import toolRegistry from "./ToolRegistry";
import { useAppAccess } from "../../contexts/AppAccessContext";
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
  const { isDemo } = useAppAccess();

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
                  // You can replace this with your UpgradeModal
                  alert("This tool is premium — upgrade to unlock.");
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
