import { useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import { riskRegisterSchema } from "./riskRegisterSchema";

export default function RiskRegisterTool({ onInsert }) {
  const [data, setData] = useState(riskRegisterSchema.outputShape);
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <ToolStepShell title="Risk Register">
      <div className="studio-tool-content">
        <textarea placeholder="Market risks" onChange={e => update("marketRisks", e.target.value)} />
        <textarea placeholder="Technical risks" onChange={e => update("technicalRisks", e.target.value)} />
        <textarea placeholder="Execution risks" onChange={e => update("executionRisks", e.target.value)} />
        <textarea placeholder="Legal / compliance risks" onChange={e => update("legalOrComplianceRisks", e.target.value)} />
        <textarea placeholder="Mitigation plan" onChange={e => update("mitigationPlan", e.target.value)} />
      </div>
    </ToolStepShell>
  );
}
