import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import "../../../styles/StudioCanvas.css";

const NEAR_BOTTOM_PX = 80;

export default function StudioCanvas({ blocks = [], isTyping = false }) {
  const isEmpty = blocks.length === 0;

  const timelineRef = useRef(null);
  const bottomRef = useRef(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  // 🔒 Source of truth for auto-scroll permission
  const allowAutoScrollRef = useRef(true);

  /* =========================
     Scroll position detection
     ========================= */
  const updateScrollPosition = () => {
    const el = timelineRef.current;
    if (!el) return;

    const distance =
      el.scrollHeight - el.scrollTop - el.clientHeight;

    const nearBottom = distance <= NEAR_BOTTOM_PX;

    setIsAtBottom(nearBottom);
    allowAutoScrollRef.current = nearBottom;

    // ✅ Clear unread once user returns to bottom
    if (nearBottom) {
      setUnreadCount(0);
    }
  };

  /* =========================
     Scroll listener (user intent)
     ========================= */
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollPosition);

    // 🔑 MUST recompute after mount (survives hard refresh)
    requestAnimationFrame(updateScrollPosition);

    return () =>
      el.removeEventListener("scroll", updateScrollPosition);
  }, []);

  /* =========================
     Recalculate after content changes
     ========================= */
  useEffect(() => {
    requestAnimationFrame(updateScrollPosition);
  }, [blocks.length, isTyping]);

  /* =========================
     New content handling
     ========================= */
  useEffect(() => {
    if (allowAutoScrollRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      // ✅ New message while user is away
      setUnreadCount((c) => c + 1);
    }
  }, [blocks.length, isTyping]);

  /* =========================
     Empty state
     ========================= */
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

  /* =========================
     Render
     ========================= */
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

      {/* ✅ Button visibility + unread badge */}
      {!isAtBottom && (
        <button
          className="scroll-to-bottom centered"
          onClick={() => {
            allowAutoScrollRef.current = true;
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
            setUnreadCount(0);
          }}
          title="Jump to latest"
        >
          ↓
          {unreadCount > 0 && (
            <span className="unread-badge">
              {unreadCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
