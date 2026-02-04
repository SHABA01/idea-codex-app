import React from "react";
import "../../../styles/StudioCanvas.css";

function MessageContent({ text }) {
  const ref = React.useRef(null);
  const [expanded, setExpanded] = React.useState(false);
  const [overflowing, setOverflowing] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;
    setOverflowing(ref.current.scrollHeight > 120);
  }, [text]);

  return (
    <>
      <div
        ref={ref}
        className={`msg-content ${expanded ? "expanded" : ""}`}
      >
        {text}
      </div>

      {overflowing && !expanded && (
        <button className="read-more" onClick={() => setExpanded(true)}>
          …Read more
        </button>
      )}
    </>
  );
}

export default function StudioCanvas({ blocks = [], isTyping = false }) {
  const isEmpty = blocks.length === 0;
  const bottomRef = React.useRef(null);

  // Auto-scroll to bottom
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [blocks, isTyping]);

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
          {blocks.map((block, index) => {
            const prev = blocks[index - 1];
            const isGrouped =
              prev &&
              prev.role === block.role &&
              prev.source === block.source;

            return (
              <div
                key={block.id}
                className={`msg-row ${
                  block.role === "user" ? "right" : "left"
                }`}
              >
                <div
                  className={`msg ${block.role} ${
                    isGrouped ? "grouped" : ""
                  }`}
                >
                  {!isGrouped && block.role !== "user" && (
                    <div className="msg-header">
                      <span className="tool-name">
                        {block.source || "IdeaCodex"}
                      </span>
                    </div>
                  )}

                  <MessageContent text={block.content} />

                  <div className="msg-meta">
                    {block.timestamp}
                  </div>

                  <div className="msg-actions">
                    <button className="btn-insert" title="Insert into tool">
                      →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="msg-row left">
              <div className="msg ai typing">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
