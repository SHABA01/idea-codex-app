import React from "react";
import "../../../styles/FlyoutFooter.css";

export default function FlyoutFooter({ onInsert }) {
  if (!onInsert) return null;

  return (
    <footer className="flyout-footer">
      <button className="flyout-insert-btn" onClick={onInsert}>
        Insert into Canvas
      </button>
    </footer>
  );
}
