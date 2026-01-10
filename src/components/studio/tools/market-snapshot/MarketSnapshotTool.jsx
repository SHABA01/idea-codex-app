import { useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import ToolFooter from "../common/ToolFooter";
import { marketSnapshotSchema } from "./marketSnapshotSchema";

export default function MarketSnapshotTool({ onInsert, idea }) {
  const [data, setData] = useState({
    targetCustomer: "",
    customerContext: "",
    marketStage: "",
    demandDrivers: "",
    existingBehaviors: "",
    whyNow: ""
  });

  const update = (field, value) => {
    setData((d) => ({ ...d, [field]: value }));
  };

  const handleInsert = () => {
    onInsert({
      tool: marketSnapshotSchema.id,
      title: marketSnapshotSchema.title,
      content: {
        targetCustomer: data.targetCustomer,
        customerContext: data.customerContext,
        marketStage: data.marketStage,
        demandDrivers: data.demandDrivers,
        existingBehaviors: data.existingBehaviors,
        whyNow: data.whyNow
      }
    });
  };

  return (
    <ToolStepShell title="Market Snapshot">
      <div className="studio-tool-content">
        <p>
          This tool captures a realistic view of the market surrounding your
          idea — who it serves, how it behaves today, and why timing matters.
        </p>

        <h3>Target Customer</h3>
        <input
          placeholder="Who is the primary customer?"
          value={data.targetCustomer}
          onChange={(e) => update("targetCustomer", e.target.value)}
        />

        <textarea
          placeholder="Describe the customer's environment, constraints, and context"
          value={data.customerContext}
          onChange={(e) => update("customerContext", e.target.value)}
        />

        <h3>Market State</h3>
        <select
          value={data.marketStage}
          onChange={(e) => update("marketStage", e.target.value)}
        >
          <option value="">Select market stage</option>
          <option value="emerging">Emerging</option>
          <option value="growing">Growing</option>
          <option value="mature">Mature</option>
          <option value="declining">Declining</option>
        </select>

        <h3>Demand & Behavior</h3>
        <textarea
          placeholder="What forces are driving demand in this market?"
          value={data.demandDrivers}
          onChange={(e) => update("demandDrivers", e.target.value)}
        />

        <textarea
          placeholder="How do customers currently behave or solve this problem?"
          value={data.existingBehaviors}
          onChange={(e) => update("existingBehaviors", e.target.value)}
        />

        <h3>Timing</h3>
        <textarea
          placeholder="Why is now a good (or bad) time to enter this market?"
          value={data.whyNow}
          onChange={(e) => update("whyNow", e.target.value)}
        />
      </div>

      <ToolFooter
        primaryAction={{
          label: "Insert Market Snapshot",
          onClick: handleInsert
        }}
      />
    </ToolStepShell>
  );
}
