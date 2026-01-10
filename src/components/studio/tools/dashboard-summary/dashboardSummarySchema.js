/**
 * Dashboard Summary Schema
 *
 * This schema defines what the Dashboard expects
 * from a curated Studio → Dashboard summary.
 */
export const dashboardSummarySchema = {
  id: "dashboard-summary",
  title: "Dashboard Summary",

  description:
    "Curated executive signals surfaced from Studio to Dashboard.",

  dashboard: {
    section: "overview",
    priority: "high"
  },

  fields: [
    {
      key: "idea",
      label: "Core Idea",
      type: "text",
      required: true
    },
    {
      key: "market",
      label: "Market Signal",
      type: "text"
    },
    {
      key: "traction",
      label: "Traction / Evidence",
      type: "text"
    },
    {
      key: "risks",
      label: "Key Risks",
      type: "text"
    },
    {
      key: "nextSteps",
      label: "Next Steps",
      type: "text"
    }
  ],

  summarizer(content) {
    if (!content) return "No dashboard summary created.";

    return `
Idea: ${content.idea || "—"}
Market: ${content.market || "—"}
Traction: ${content.traction || "—"}
Risks: ${content.risks || "—"}
Next Steps: ${content.nextSteps || "—"}
`.trim();
  }
};
