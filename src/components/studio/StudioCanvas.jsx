// src/components/studio/StudioCanvas.jsx
import React, { useState, useCallback, useEffect } from "react";
import "../../styles/Studio.css";

/**
 * Simple block-based canvas: list of text blocks.
 * You can later replace with a rich editor or CRDT-backed model.
 */
export default function StudioCanvas({ initialBlocks = [], onSaveProject }) {
  const [blocks, setBlocks] = useState(initialBlocks);

  {/* useEffect(() => {
        function onInsertEvent(e) {
        if (!e?.detail) return;
        insertAtEnd(e.detail);
        }
         window.addEventListener("__studio_insert", onInsertEvent);
        return () => window.removeEventListener("__studio_insert", onInsertEvent);
    }, [insertAtEnd]);*/}

  const insertAtEnd = useCallback((content) => {
    setBlocks((b) => [...b, { id: Date.now().toString(), content }]);
  }, []);

  const removeBlock = (id) => {
    setBlocks((b) => b.filter(x => x.id !== id));
  };

  return (
    <div className="studio-canvas" aria-live="polite">
      <div className="canvas-toolbar">
        <button onClick={() => onSaveProject?.(blocks)}>Save</button>
      </div>

      <div className="canvas-blocks">
        {blocks.map((blk) => (
          <div key={blk.id} className="canvas-block">
            <pre>{blk.content}</pre>
            <div className="block-actions">
              <button onClick={() => removeBlock(blk.id)}>Delete</button>
            </div>
          </div>
        ))}

        {blocks.length === 0 && (
          <div className="canvas-empty">Start by adding a tool from the left.</div>
        )}
      </div>

      {/* expose insertion method via window for demo (optional) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__studio_insert = (s) => {}`, // overwritten in mount below if needed
        }}
      />
    </div>
  );
}
