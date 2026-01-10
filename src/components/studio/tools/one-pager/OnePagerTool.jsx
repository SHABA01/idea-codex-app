import { useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import ToolFooter from "../common/ToolFooter";
import { onePagerSchema } from "./onePagerSchema";

export default function OnePagerTool({ onInsert }) {
  const [data, setData] = useState(onePagerSchema.outputShape);
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <ToolStepShell title="One-Pager">
      <div className="studio-tool-content">
        <input placeholder="Headline" onChange={e => update("headline", e.target.value)} />
        <textarea placeholder="Problem" onChange={e => update("problem", e.target.value)} />
        <textarea placeholder="Solution" onChange={e => update("solution", e.target.value)} />
        <textarea placeholder="Target market" onChange={e => update("targetMarket", e.target.value)} />
        <textarea placeholder="Why this is different" onChange={e => update("differentiation", e.target.value)} />
        <textarea placeholder="Traction or next step" onChange={e => update("tractionOrNextStep", e.target.value)} />
      </div>

      <ToolFooter primaryAction={{ label: "Insert One-Pager", onClick: () => onInsert({ tool: onePagerSchema.id, title: onePagerSchema.title, content: data }) }} />
    </ToolStepShell>
  );
}
