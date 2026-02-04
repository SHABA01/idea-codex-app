import React from "react";
import ReactMarkdown from "react-markdown";

export default function ChatBubble({
  block,
  isGrouped,
  isMine,
  highlightable = false
}) {
  const contentRef = React.useRef(null);
  const [expanded, setExpanded] = React.useState(false);
  const [overflowing, setOverflowing] = React.useState(false);

  React.useEffect(() => {
    if (!contentRef.current) return;
    setOverflowing(contentRef.current.scrollHeight > 120);
  }, [block.content]);

  return (
    <div className={`msg-row ${isMine ? "right" : "left"}`}>
      <div
        className={`msg ${block.role} ${isGrouped ? "grouped" : ""}`}
        data-sender={block.senderId}
      >
        {!isGrouped && (
          <div className="msg-header">
            <span className="tool-name">
              {block.headerLabel}
            </span>
          </div>
        )}

        <div
          ref={contentRef}
          className={`msg-content ${expanded ? "expanded" : ""}`}
        >
          <ReactMarkdown>
            {block.content}
          </ReactMarkdown>
        </div>

        {overflowing && !expanded && (
          <button className="read-more" onClick={() => setExpanded(true)}>
            …Read more
          </button>
        )}

        <div className="msg-meta">
          {block.timestamp}
        </div>

        {highlightable && (
          <div className="msg-actions">
            <button className="btn-insert" title="Insert into tool">
              →
            </button>
          </div>
        )}

        <div className="msg-cta">
          {block.suggestedActions?.map((action) => (
            <button key={action} className="msg-action-btn">
              {action}
            </button>
          ))}

          {block.canConvert && (
            <button className="msg-action-primary">
              Convert to Idea
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
