import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import "../../../styles/StudioCanvas.css";

export default function StudioCanvas({ blocks = [], isTyping = false }) {
  const isEmpty = blocks.length === 0;

  const timelineRef = React.useRef(null);
  const bottomRef = React.useRef(null);

  const [isAtBottom, setIsAtBottom] = React.useState(true);

  // Track user scroll position
  React.useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const onScroll = () => {
      const distance =
        el.scrollHeight - el.scrollTop - el.clientHeight;

      setIsAtBottom(distance < 80);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-scroll only when allowed
  React.useEffect(() => {
    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [blocks, isTyping, isAtBottom]);

  if (isEmpty) {
    return (
      <div className="studio-canvas">
        <div className="canvas-empty">
          <div className="canvas-empty-inner">
            <p className="primary">Your canvas is empty</p>
            <p className="secondary">
              Start by launching a tool or sending a message
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="studio-canvas">
      <div className="chat-timeline" ref={timelineRef}>
        {blocks.map((block, index) => {
          const prev = blocks[index - 1];
          const isGrouped =
            prev &&
            prev.senderId === block.senderId &&
            prev.role === block.role;

          return (
            <ChatBubble
              key={block.id}
              block={block}
              isGrouped={isGrouped}
              isMine={block.role === "user"}
              highlightable={block.role !== "user"}
            />
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

      {!isAtBottom && (
        <button
          className="scroll-to-bottom"
          onClick={() =>
            bottomRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          title="Jump to latest"
        >
          ↓
        </button>
      )}
    </div>
  );
}
