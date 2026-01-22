import React from "react";
import FlyoutHeader from "./FlyoutHeader";
import FlyoutBody from "./FlyoutBody";
import FlyoutFooter from "./FlyoutFooter";
import "../../../styles/ToolFlyout.css";

/**
 * ToolFlyout
 *
 * Layout-only container.
 * Receives a resolved tool descriptor from Studio.jsx
 */
export default function ToolFlyout({
  tool,
  onClose,
  children,
  footer
}) {
  if (!tool) return null; // ✅ hard guard

  return (
    <div className="tool-flyout">
      <FlyoutHeader
        icon={tool.icon}
        title={tool.name}
        runtimeStatus={tool.runtimeStatus}
        onClose={onClose}
      />

      <FlyoutBody>
        {children}
      </FlyoutBody>

      {footer && (
        <FlyoutFooter>
          {footer}
        </FlyoutFooter>
      )}
    </div>
  );
}
