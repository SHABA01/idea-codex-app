import React, { useState, useRef } from "react";
import { useAppAccess } from "../../../contexts/AppAccessContext";
import "../../../styles/AIBar.css";

export default function AIBar({ onInsert }) {
  const { tier, policy } = useAppAccess();

  const quota =
    typeof policy?.apiCredits === "number"
      ? policy.apiCredits
      : policy?.apiCredits === "unlimited"
      ? Infinity
      : 0;

  const [used, setUsed] = useState(0);
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [streaming, setStreaming] = useState(false);
  const pinned = useRef(new Set());

  const remaining = quota === Infinity ? "∞" : quota - used;

  const canSend = quota === Infinity || used < quota;

  const simulateStreaming = async (prompt) => {
    setStreaming(true);
    setUsed((u) => u + 1);

    const text = `AI result for: ${prompt}`;
    let current = "";

    for (let char of text) {
      await new Promise((r) => setTimeout(r, 15));
      current += char;
      setResults((r) => {
        if (!r[0] || r[0].id !== "stream") {
          return [{ id: "stream", text: current }, ...r];
        }
        return [{ ...r[0], text: current }, ...r.slice(1)];
      });
    }

    setResults((r) => [
      { id: Date.now().toString(), text: current },
      ...r.filter((x) => x.id !== "stream")
    ]);

    setStreaming(false);
  };

  const sendPrompt = async () => {
    if (!value.trim() || !canSend || streaming) return;
    const prompt = value;
    setValue("");
    simulateStreaming(prompt);
  };

  const clearHistory = () => {
    setResults((r) =>
      r.filter((x) => pinned.current.has(x.id))
    );
  };

  const togglePin = (id) => {
    if (pinned.current.has(id)) pinned.current.delete(id);
    else pinned.current.add(id);
    setResults((r) => [...r]);
  };

  return (
    <div className="ai-bar">
      <div className="ai-bar-results">
        {results.map((r) => (
          <div key={r.id} className="ai-result">
            <pre>{r.text}</pre>
            <div className="ai-result-actions">
              <button onClick={() => onInsert?.(r.text)}>
                Insert
              </button>
              <button onClick={() => togglePin(r.id)}>
                {pinned.current.has(r.id) ? "Unpin" : "Pin"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="ai-input">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            canSend
              ? "Ask IdeaCodex AI..."
              : "AI quota reached — upgrade to continue"
          }
          disabled={!canSend}
        />
        <button className="btn-send" onClick={sendPrompt} disabled={!canSend || streaming}>
          {streaming ? "Thinking…" : "Send"}
        </button>
      </div>

      <div className="ai-bar-meta">
        <span>Tier: {tier.toUpperCase()}</span>
        <span>Credits left: {remaining}</span>
        <button className="btn-clear" onClick={clearHistory}>Clear</button>
      </div>
    </div>
  );
}
