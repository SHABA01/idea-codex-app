import { useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import ToolFooter from "../common/ToolFooter";
import { solutionMapperSchema } from "./solutionMapperSchema";

export default function SolutionMapperTool({ onInsert }) {
  const [data, setData] = useState(solutionMapperSchema.outputShape);
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <ToolStepShell title="Solution Mapper">
      <div className="studio-tool-content">
        <textarea placeholder="Problem recap" onChange={e => update("problemRecap", e.target.value)} />
        <textarea placeholder="Core solution" onChange={e => update("coreSolution", e.target.value)} />
        <textarea placeholder="Key capabilities" onChange={e => update("keyCapabilities", e.target.value)} />
        <textarea placeholder="Constraints" onChange={e => update("constraints", e.target.value)} />
        <textarea placeholder="Tradeoffs made" onChange={e => update("tradeoffs", e.target.value)} />
      </div>

      <ToolFooter
        primaryAction={{
          label: "Insert Solution Map",
          onClick: () =>
            onInsert({ tool: solutionMapperSchema.id, title: solutionMapperSchema.title, content: data })
        }}
      />
    </ToolStepShell>
  );
}
