/**
 * Competitor Breakdown Schema
 *
 * Used for:
 * - Dashboard summaries
 * - Export (PDF / MD / Pitch)
 * - Market and positioning analysis
 */
export const competitorBreakdownSchema = {
  id: "competitor-breakdown",
  title: "Competitor Breakdown",

  description:
    "Analyzes direct and indirect competitors to identify positioning gaps and differentiation opportunities.",

  dashboard: {
    contributesTo: ["market", "strategy"],
    indicators: [
      "numberOfCompetitors",
      "directCompetitors",
      "differentiationSignals"
    ]
  },

  fields: [
    {
      key: "name",
      label: "Competitor Name",
      type: "text",
      required: true
    },
    {
      key: "type",
      label: "Competitor Type",
      type: "enum",
      values: ["direct", "indirect", "alternative"]
    },
    {
      key: "targetSegment",
      label: "Target Segment",
      type: "text"
    },
    {
      key: "strengths",
      label: "Strengths",
      type: "text"
    },
    {
      key: "weaknesses",
      label: "Weaknesses",
      type: "text"
    },
    {
      key: "differentiation",
      label: "Differentiation Angle",
      type: "text"
    }
  ],

  summarizer(data) {
    if (!Array.isArray(data) || data.length === 0) {
      return "No competitors documented.";
    }

    const direct = data.filter(d => d.type === "direct");
    const indirect = data.filter(d => d.type !== "direct");

    return `
Competitors identified: ${data.length}
Direct competitors: ${direct.length}
Indirect / alternatives: ${indirect.length}
Key differentiation themes: ${
      data
        .map(d => d.differentiation)
        .filter(Boolean)
        .slice(0, 3)
        .join("; ") || "Not defined"
    }
`.trim();
  }
};
