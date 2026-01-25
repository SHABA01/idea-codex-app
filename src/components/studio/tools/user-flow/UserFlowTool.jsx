import { useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import { userFlowSchema } from "./userFlowSchema";

export default function UserFlowTool({ onInsert }) {
  const [data, setData] = useState(userFlowSchema.outputShape);
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <ToolStepShell title="User Flow Draft">
      <div className="studio-tool-content">
        <textarea placeholder="Entry point" onChange={e => update("entryPoint", e.target.value)} />
        <textarea placeholder="Core steps" onChange={e => update("coreSteps", e.target.value)} />
        <textarea placeholder="Decision points" onChange={e => update("decisionPoints", e.target.value)} />
        <textarea placeholder="Failure paths" onChange={e => update("failurePaths", e.target.value)} />
        <textarea placeholder="Success end state" onChange={e => update("successEndState", e.target.value)} />
      </div>
    </ToolStepShell>
  );
}
