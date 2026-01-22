import React from "react";
import "../../../styles/FlyoutHeader.css";

export default function FlyoutHeader({
  icon,
  title,
  runtimeStatus,
  onClose,
}) {
  return (
    <header className="flyout-header">
      <div className="flyout-header-left">
        {icon && <i className={`flyout-icon ${icon}`} />}
        <strong className="flyout-title">{title}</strong>

        {runtimeStatus && (
          <span className={`flyout-status ${runtimeStatus.toLowerCase()}`}>
            {runtimeStatus}
          </span>
        )}
      </div>

      <button className="flyout-close" onClick={onClose}>
        ✕
      </button>
    </header>
  );
}
