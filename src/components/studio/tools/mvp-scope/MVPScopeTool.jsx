import { useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import { mvpScopeSchema } from "./mvpScopeSchema";

export default function MVPScopeTool({ onInsert }) {
  const [data, setData] = useState(mvpScopeSchema.outputShape);

  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <ToolStepShell title="MVP Scope Builder">
      <div className="studio-tool-content">
        <textarea placeholder="Single core problem MVP solves" onChange={e => update("coreProblem", e.target.value)} />
        <textarea placeholder="Must-have features only" onChange={e => update("mustHaveFeatures", e.target.value)} />
        <textarea placeholder="Explicitly excluded features" onChange={e => update("excludedFeatures", e.target.value)} />
        <textarea placeholder="How success is measured" onChange={e => update("successCriteria", e.target.value)} />
        <textarea placeholder="Key assumptions this MVP tests" onChange={e => update("assumptionsTested", e.target.value)} />
      </div>
    </ToolStepShell>
  );
}
