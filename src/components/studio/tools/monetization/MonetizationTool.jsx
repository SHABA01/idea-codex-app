import { useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import ToolFooter from "../common/ToolFooter";
import { monetizationSchema } from "./monetizationSchema";

export default function MonetizationTool({ onInsert }) {
  const [data, setData] = useState(monetizationSchema.outputShape);

  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  const insert = () =>
    onInsert({ tool: monetizationSchema.id, title: monetizationSchema.title, content: data });

  return (
    <ToolStepShell title="Monetization Model">
      <div className="studio-tool-content">
        <input placeholder="Primary revenue model" onChange={e => update("primaryModel", e.target.value)} />
        <textarea placeholder="Secondary / future revenue streams" onChange={e => update("secondaryModels", e.target.value)} />
        <textarea placeholder="Pricing logic (value, usage, tiers)" onChange={e => update("pricingLogic", e.target.value)} />
        <textarea placeholder="When and why users pay" onChange={e => update("paymentTrigger", e.target.value)} />
        <textarea placeholder="Monetization risks" onChange={e => update("risks", e.target.value)} />
      </div>

      <ToolFooter primaryAction={{ label: "Insert Monetization Model", onClick: insert }} />
    </ToolStepShell>
  );
}
