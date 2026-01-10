import React, { useEffect, useRef } from "react";
import toolRegistry from "../tools/toolRegistry";
import { useAppAccess } from "../../../contexts/AppAccessContext";
import "../../../styles/StudioToolLauncher.css";

/**
 * StudioToolLauncher
 *
 * Overlay-style launcher for Studio tools.
 * Opens on demand, closes on selection or outside click.
 */
export default function StudioToolLauncher({
  isOpen,
  onClose,
  onSelectTool
}) {
  const ref = useRef(null);
  const { tier } = useAppAccess();

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="studio-tool-launcher-backdrop">
      <aside ref={ref} className="studio-tool-launcher">
        <header className="launcher-header">
          <strong>Studio Tools</strong>
          <button className="launcher-close" onClick={onClose}>
            ✕
          </button>
        </header>

        <div className="launcher-list">
          {toolRegistry.map((tool) => {
            const locked =
              tier === "demo" && tool.tier !== "demo" ||
              tier === "live" && tool.tier === "pro";

            return (
              <button
                key={tool.id}
                className={`launcher-item ${locked ? "locked" : ""}`}
                disabled={locked}
                onClick={() => {
                  if (locked) return;
                  onSelectTool(tool);
                  onClose();
                }}
              >
                <span className="tool-name">{tool.name}</span>

                <span className={`tool-badge tier-${tool.tier}`}>
                  {tool.tier.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
