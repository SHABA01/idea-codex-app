import { useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import { targetAudienceSchema } from "./targetAudienceSchema";

export default function TargetAudienceTool({ onInsert }) {
  const [data, setData] = useState(targetAudienceSchema.outputShape);
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <ToolStepShell title="Target Audience Profiler">
      <div className="studio-tool-content">
        <textarea placeholder="Primary audience" onChange={e => update("primaryAudience", e.target.value)} />
        <textarea placeholder="Secondary audience" onChange={e => update("secondaryAudience", e.target.value)} />
        <textarea placeholder="Jobs to be done" onChange={e => update("jobsToBeDone", e.target.value)} />
        <textarea placeholder="Pain points" onChange={e => update("painPoints", e.target.value)} />
        <textarea placeholder="Buying triggers" onChange={e => update("buyingTriggers", e.target.value)} />
      </div>
    </ToolStepShell>
  );
}
