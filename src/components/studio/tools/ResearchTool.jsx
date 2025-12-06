// src/components/studio/tools/ResearchTool.jsx
import React from "react";

export default function ResearchTool({ onInsert }) {
  return (
    <div style={{ padding: 12 }}>
      <h3>Research</h3>
      <p>Quick web summary (placeholder)</p>
      <button onClick={() => onInsert("Research notes: ...")}>Insert</button>
    </div>
  );
}
