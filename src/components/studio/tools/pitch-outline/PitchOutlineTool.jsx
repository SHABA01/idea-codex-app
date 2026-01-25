import { useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import { pitchOutlineSchema } from "./pitchOutlineSchema";

export default function PitchOutlineTool({ onInsert }) {
  const [data, setData] = useState(pitchOutlineSchema.outputShape);
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <ToolStepShell title="Pitch Outline">
      <div className="studio-tool-content">
        <textarea placeholder="Opening hook" onChange={e => update("opening", e.target.value)} />
        <textarea placeholder="Problem" onChange={e => update("problem", e.target.value)} />
        <textarea placeholder="Solution" onChange={e => update("solution", e.target.value)} />
        <textarea placeholder="Market" onChange={e => update("market", e.target.value)} />
        <textarea placeholder="Business model" onChange={e => update("businessModel", e.target.value)} />
        <textarea placeholder="The ask" onChange={e => update("ask", e.target.value)} />
      </div>
    </ToolStepShell>
  );
}
