import { useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import { problemValidatorSchema } from "./problemValidatorSchema";

export default function ProblemValidatorTool({ onInsert }) {
  const [data, setData] = useState(problemValidatorSchema.outputShape);
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <ToolStepShell title="Problem Validator">
      <div className="studio-tool-content">
        <textarea placeholder="Problem statement" onChange={e => update("problemStatement", e.target.value)} />
        <textarea placeholder="Who experiences this problem?" onChange={e => update("affectedUsers", e.target.value)} />
        <input placeholder="How often does it occur?" onChange={e => update("frequency", e.target.value)} />
        <input placeholder="How painful is it?" onChange={e => update("severity", e.target.value)} />
        <textarea placeholder="Existing alternatives" onChange={e => update("currentAlternatives", e.target.value)} />
        <textarea placeholder="Validated / weak / invalid?" onChange={e => update("validationVerdict", e.target.value)} />
      </div>
    </ToolStepShell>
  );
}
