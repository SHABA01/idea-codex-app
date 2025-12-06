// src/components/studio/AIBar.jsx
import React, { useState } from "react";
import "../../styles/Studio.css";

export default function AIBar({ onInsert }) {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

  const sendPrompt = async () => {
    if (!value.trim()) return;
    // TODO: replace with real API call
    const fake = `AI result for: ${value}`;
    setResults((r) => [{ id: Date.now().toString(), text: fake }, ...r]);
    setValue("");
  };

  return (
    <div className="ai-bar">
      <div className="ai-bar-results">
        {results.map((r) => (
          <div key={r.id} className="ai-result">
            <pre>{r.text}</pre>
            <div className="ai-result-actions">
              <button onClick={() => onInsert?.(r.text)}>Insert</button>
            </div>
          </div>
        ))}
      </div>

      <div className="ai-input">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask IdeaCodex AI for prompts, summaries, features..."
        />
        <button onClick={sendPrompt}>Send</button>
      </div>
    </div>
  );
}
