import React, { useEffect, useRef } from "react";
import toolRegistry from "../tools/toolRegistry";
import { useAppAccess } from "../../../contexts/AppAccessContext";
import { isTierAtLeast, isTierBelow } from "../../../utils/tierOrder";
import "../../../styles/StudioToolLauncher.css";

/**
 * StudioToolLauncher
 *
 * Shows tool availability based on user tier.
 * Does NOT show runtime state (beta/experimental).
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

            // Visibility gate (tool not shown at all)
            if (!visibleFor.includes(tier)) return null;

            // Lock logic
            const isLocked =
              lockedBelow && isTierBelow(tier, lockedBelow);

            const accessLabel = accessLevelByTier?.[tier] || null;

            return (
              <button
                key={id}
                className={`launcher-item ${isLocked ? "locked" : ""}`}
                disabled={isLocked}
                onClick={() => {
                  if (isLocked) return;
                  onSelectTool(tool);
                  onClose();
                }}
              >
                <i className={icon} aria-hidden />

                <span className="tool-name">{name}</span>

                {/* Spacer pushes badge / lock to the right */}
                <span className="tool-spacer" />

                {isLocked ? (
                  <span className="badge badge-locked">
                    <i className="fa-solid fa-lock lock-icon" />
                  </span>
                ) : (
                 accessLabel && (
                    <span className={`badge badge-${accessLabel.toLowerCase()}`}>
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
