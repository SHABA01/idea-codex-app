import { useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import ToolFooter from "../common/ToolFooter";
import { valuePropositionSchema } from "./valuePropositionSchema";

export default function ValuePropositionTool({ onInsert }) {
  const [data, setData] = useState(valuePropositionSchema.outputShape);
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <ToolStepShell title="Value Proposition Designer">
      <div className="studio-tool-content">
        <textarea placeholder="Customer problem" onChange={e => update("customerProblem", e.target.value)} />
        <textarea placeholder="Promised outcome" onChange={e => update("promisedOutcome", e.target.value)} />
        <textarea placeholder="Key differentiator" onChange={e => update("keyDifferentiator", e.target.value)} />
        <textarea placeholder="Proof or evidence" onChange={e => update("proofOrEvidence", e.target.value)} />
        <textarea placeholder="Why now?" onChange={e => update("whyNow", e.target.value)} />
      </div>

      <ToolFooter
        primaryAction={{
          label: "Insert Value Proposition",
          onClick: () =>
            onInsert({ tool: valuePropositionSchema.id, title: valuePropositionSchema.title, content: data })
        }}
      />
    </ToolStepShell>
  );
}
