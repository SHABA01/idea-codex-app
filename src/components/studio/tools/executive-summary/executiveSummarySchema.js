export const executiveSummarySchema = {
  id: "executive-summary",
  title: "Executive Summary",
  description:
    "A concise, decision-ready overview of the venture for executives, investors, or partners.",
  dashboardSlot: "executiveSummary",
  version: "1.0",

  fields: {
    overview: {
      label: "Venture Overview",
      type: "text",
      required: true,
      hint: "What is this venture, in one short paragraph?"
    },
    problem: {
      label: "Problem Statement",
      type: "text",
      required: true,
      hint: "What critical problem is being solved and for whom?"
    },
    solution: {
      label: "Proposed Solution",
      type: "text",
      required: true,
      hint: "How does the solution uniquely address the problem?"
    },
    market: {
      label: "Market Opportunity",
      type: "text",
      required: true,
      hint: "Market size, urgency, and target segment"
    },
    traction: {
      label: "Traction & Validation",
      type: "text",
      required: false,
      hint: "Evidence: interviews, pilots, revenue, or signals"
    },
    businessModel: {
      label: "Business Model",
      type: "text",
      required: false,
      hint: "How the venture makes or will make money"
    },
    risks: {
      label: "Key Risks",
      type: "text",
      required: false,
      hint: "Major risks that could prevent success"
    },
    nextSteps: {
      label: "Next Steps",
      type: "text",
      required: true,
      hint: "Immediate actions following this summary"
    }
  }
};
