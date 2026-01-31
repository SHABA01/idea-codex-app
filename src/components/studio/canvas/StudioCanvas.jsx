import "../../../styles/StudioCanvas.css";

export default function StudioCanvas({ blocks = [] }) {
  const isEmpty = blocks.length === 0;

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
          {blocks.map((block) => (
            <div
              key={block.id}
              className={`msg-row ${block.role === "user" ? "right" : "left"}`}
            >
              <div className={`msg ${block.role}`}>
                {/* Tool header */}
                {block.role === "tool" && (
                  <div className="msg-header">
                    <span className="tool-name">{block.source}</span>
                  </div>
                )}

                {/* Content */}
                <div className="msg-content">{block.content}</div>

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
