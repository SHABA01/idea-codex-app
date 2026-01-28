import React, { useState, useRef, useEffect } from "react";
import { useAppAccess } from "../../../contexts/AppAccessContext";
import "../../../styles/AIBar.css";

export default function AIBar({ onSend }) {
  const { tier, policy } = useAppAccess();

  const quota =
    typeof policy?.apiCredits === "number"
      ? policy.apiCredits
      : policy?.apiCredits === "unlimited"
      ? Infinity
      : 0;

  const [used, setUsed] = useState(0);
  const [value, setValue] = useState("");
  const [streaming, setStreaming] = useState(false);

  const textareaRef = useRef(null);
  const remaining = quota === Infinity ? "∞" : quota - used;
  const canSend = quota === Infinity || used < quota;

  /* Auto-grow textarea */
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }, [value]);

  const send = () => {
    if (!value.trim() || !canSend || streaming) return;

    const prompt = value.trim();
    setValue("");
    setUsed((u) => u + 1);

    onSend?.(prompt);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="ai-bar">
      <div className="ai-composer">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={
            canSend
              ? "Message IdeaCodex…"
              : "AI quota reached — upgrade to continue"
          }
          disabled={!canSend}
          rows={1}
          maxLength={500}
        />

        <div className="ai-actions">
          <button
            className="btn-send"
            onClick={send}
            disabled={!canSend || streaming}
            title="Send"
          >
            ➤
          </button>
        </div>
      </div>

      <div className="ai-bar-meta">
        <span>Tier: {tier.toUpperCase()}</span>
        <span>Credits left: {remaining}</span>
      </div>
    </div>
  );
}
