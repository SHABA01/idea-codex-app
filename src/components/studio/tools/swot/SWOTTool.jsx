import { useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import ToolFooter from "../common/ToolFooter";
import { swotSchema } from "./swotSchema";

export default function SWOTTool({ onInsert }) {
  const [data, setData] = useState(swotSchema.outputShape);
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <ToolStepShell title="SWOT Generator">
      <div className="studio-tool-content">
        <textarea placeholder="Strengths" onChange={e => update("strengths", e.target.value)} />
        <textarea placeholder="Weaknesses" onChange={e => update("weaknesses", e.target.value)} />
        <textarea placeholder="Opportunities" onChange={e => update("opportunities", e.target.value)} />
        <textarea placeholder="Threats" onChange={e => update("threats", e.target.value)} />
      </div>

      <ToolFooter
        primaryAction={{
          label: "Insert SWOT",
          onClick: () =>
            onInsert({ tool: swotSchema.id, title: swotSchema.title, content: data })
        }}
      />
    </ToolStepShell>
  );
}
