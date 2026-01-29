import "../../../styles/StudioCanvas.css";

export default function StudioCanvas({ messages = [] }) {
  const isEmpty = messages.length === 0;

  return (
    <div className="studio-canvas">
      {isEmpty ? (
        <div className="canvas-empty">
          <div className="canvas-empty-inner">
            <p className="primary">Your canvas is empty</p>
            <p className="secondary">
              Start by launching a tool or sending a message
            </p>
          </div>
        </div>
      ) : (
        <div className="chat-timeline">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`msg-row ${msg.role === "user" ? "right" : "left"}`}
            >
              <div className={`msg ${msg.role}`}>
                {/* Tool header */}
                {msg.role === "tool" && (
                  <div className="msg-header">
                    <span className="tool-name">{msg.source}</span>
                  </div>
                )}

                {/* Content */}
                <div className="msg-content">{msg.content}</div>

                {/* Actions */}
                <div className="msg-actions">
                  <button
                    className="btn-insert"
                    title="Insert into tool"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
