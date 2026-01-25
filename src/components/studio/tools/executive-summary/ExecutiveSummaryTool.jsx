import { useState } from "react";
import { executiveSummarySchema } from "./executiveSummarySchema";
import ToolStepShell from "../common/ToolStepShell";

/**
 * Executive Summary Tool
 *
 * Purpose:
 * Produce a high-level, decision-oriented summary
 * suitable for investors, leadership, or partners.
 *
 * This is NOT a dashboard snippet.
 * This is a standalone executive artifact.
 */
export default function ExecutiveSummaryTool({ onInsert }) {
  const [data, setData] = useState({
    overview: "",
    problem: "",
    solution: "",
    market: "",
    traction: "",
    businessModel: "",
    risks: "",
    nextSteps: ""
  });

  const update = (field, value) => {
    setData((d) => ({ ...d, [field]: value }));
  };

  const handleInsert = () => {
    onInsert({
      tool: executiveSummarySchema.id,
      title: executiveSummarySchema.title,
      content: data,
      schema: executiveSummarySchema
    });
  };

  return (
    <ToolStepShell title={executiveSummarySchema.title}>
      <div className="studio-tool-content">
        <p className="studio-muted">
          This summary should enable a decision in under 2 minutes.
          Write with clarity, confidence, and restraint.
        </p>

        <label>
          Venture Overview
          <textarea
            placeholder={executiveSummarySchema.fields.overview.hint}
            value={data.overview}
            onChange={(e) => update("overview", e.target.value)}
          />
        </label>

        <label>
          Problem Statement
          <textarea
            placeholder={executiveSummarySchema.fields.problem.hint}
            value={data.problem}
            onChange={(e) => update("problem", e.target.value)}
          />
        </label>

        <label>
          Proposed Solution
          <textarea
            placeholder={executiveSummarySchema.fields.solution.hint}
            value={data.solution}
            onChange={(e) => update("solution", e.target.value)}
          />
        </label>

        <label>
          Market Opportunity
          <textarea
            placeholder={executiveSummarySchema.fields.market.hint}
            value={data.market}
            onChange={(e) => update("market", e.target.value)}
          />
        </label>

        <label>
          Traction & Validation
          <textarea
            placeholder={executiveSummarySchema.fields.traction.hint}
            value={data.traction}
            onChange={(e) => update("traction", e.target.value)}
          />
        </label>

        <label>
          Business Model
          <textarea
            placeholder={executiveSummarySchema.fields.businessModel.hint}
            value={data.businessModel}
            onChange={(e) => update("businessModel", e.target.value)}
          />
        </label>

        <label>
          Key Risks
          <textarea
            placeholder={executiveSummarySchema.fields.risks.hint}
            value={data.risks}
            onChange={(e) => update("risks", e.target.value)}
          />
        </label>

        <label>
          Next Steps
          <textarea
            placeholder={executiveSummarySchema.fields.nextSteps.hint}
            value={data.nextSteps}
            onChange={(e) => update("nextSteps", e.target.value)}
          />
        </label>
      </div>
    </ToolStepShell>
  );
}
