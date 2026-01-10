/**
 * Assumption Stress Test Schema
 *
 * Used for:
 * - Validation
 * - Export (PDF / MD)
 * - Dashboard summarization
 * - AI reasoning later
 */
export const assumptionTestSchema = {
  id: "assumption-test",
  title: "Assumption Stress Test",

  description:
    "Identifies critical assumptions underlying an idea and evaluates their risk and validation paths.",

  dashboard: {
    contributesTo: ["risks", "mvp"],
    weight: {
      low: 0.25,
      medium: 0.5,
      high: 0.75,
      critical: 1
    }
  },

  fields: [
    {
      key: "assumption",
      label: "Assumption",
      type: "text",
      required: true
    },
    {
      key: "category",
      label: "Category",
      type: "enum",
      values: ["market", "user", "technical", "financial", "operational"]
    },
    {
      key: "riskLevel",
      label: "Risk Level",
      type: "enum",
      values: ["low", "medium", "high", "critical"]
    },
    {
      key: "validationPlan",
      label: "Validation Plan",
      type: "text"
    }
  ],

  summarizer(data) {
    if (!Array.isArray(data)) return "";

    const critical = data.filter(
      (a) => a.riskLevel === "critical"
    );

    if (critical.length === 0) {
      return "No critical assumptions identified.";
    }

    return `Critical assumptions identified: ${critical
      .map((a) => a.assumption)
      .join("; ")}`;
  }
};
