import { useState } from "react";
import { dashboardSummarySchema } from "./dashboardSummarySchema";
import ToolStepShell from "../common/ToolStepShell";
import ToolFooter from "../common/ToolFooter";

/**
 * Dashboard Summary Tool
 *
 * Purpose:
 * Curate what Studio outputs should surface
 * as high-level signals on the Dashboard.
 *
 * This is an intentional executive abstraction layer.
 */
export default function DashboardSummaryTool({ project, onInsert }) {
  const [summary, setSummary] = useState({
    idea: "",
    market: "",
    traction: "",
    risks: "",
    nextSteps: ""
  });

  const update = (field, value) => {
    setSummary((s) => ({ ...s, [field]: value }));
  };

  const handleInsert = () => {
    onInsert({
      tool: dashboardSummarySchema.id,
      title: dashboardSummarySchema.title,
      content: summary,
      schema: dashboardSummarySchema
    });
  };

  return (
    <ToolStepShell title={dashboardSummarySchema.title}>
      <div className="studio-tool-content">
        <p className="studio-muted">
          Define the signals that should appear on your Dashboard.
          This is an executive-facing summary — keep it sharp.
        </p>

        <label>
          Core Idea
          <textarea
            placeholder="One-sentence description of the idea"
            value={summary.idea}
            onChange={(e) => update("idea", e.target.value)}
          />
        </label>

        <label>
          Market Signal
          <textarea
            placeholder="Market size, urgency, or validation insight"
            value={summary.market}
            onChange={(e) => update("market", e.target.value)}
          />
        </label>

        <label>
          Traction / Evidence
          <textarea
            placeholder="Proof points: research, interviews, pilots, revenue"
            value={summary.traction}
            onChange={(e) => update("traction", e.target.value)}
          />
        </label>

        <label>
          Key Risks
          <textarea
            placeholder="Top risks that could block success"
            value={summary.risks}
            onChange={(e) => update("risks", e.target.value)}
          />
        </label>

        <label>
          Immediate Next Steps
          <textarea
            placeholder="What happens next if this progresses?"
            value={summary.nextSteps}
            onChange={(e) => update("nextSteps", e.target.value)}
          />
        </label>
      </div>

      <ToolFooter onInsert={handleInsert} />
    </ToolStepShell>
  );
}
