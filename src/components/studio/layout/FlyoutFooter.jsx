import "../../../styles/FlyoutFooter.css";

export default function FlyoutFooter({ status, onInsert }) {
  return (
    <footer className="flyout-footer">
      <span className={`tool-status ${status}`}>
        {status.toUpperCase()}
      </span>

      <button
        className="flyout-insert-btn"
        onClick={onInsert}
        disabled={status !== "ready"}
      >
        Insert into Canvas
      </button>
    </footer>
  );
}
