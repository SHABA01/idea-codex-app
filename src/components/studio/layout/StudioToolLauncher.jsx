import React, { useEffect, useRef } from "react";
import toolRegistry from "../tools/toolRegistry";
import { useAppAccess } from "../../../contexts/AppAccessContext";
import { isTierBelow } from "../../../utils/tierOrder";
import "../../../styles/StudioToolLauncher.css";

/**
 * StudioToolLauncher
 *
 * Tool discovery surface.
 * Emits toolId only.
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

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
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
            const {
              id,
              name,
              icon,
              visibleFor,
              accessLevelByTier,
              lockedBelow
            } = tool;

            if (!visibleFor.includes(tier)) return null;

            const isLocked =
              lockedBelow && isTierBelow(tier, lockedBelow);

            const accessLabel = accessLevelByTier?.[tier];

            return (
              <button
                key={id}
                className={`launcher-item ${isLocked ? "locked" : ""}`}
                disabled={isLocked}
                onClick={() => {
                  if (isLocked) return;
                  onSelectTool(id);
                  onClose();
                }}
              >
                <i className={icon} aria-hidden />
                <span className="tool-name">{name}</span>
                <span className="tool-spacer" />

                {isLocked ? (
                  <span className="badge badge-locked">
                    <i className="fa-solid fa-lock" />
                  </span>
                ) : (
                  accessLabel && (
                    <span
                      className={`badge badge-${accessLabel.toLowerCase()}`}
                    >
                      {accessLabel}
                    </span>
                  )
                )}
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
