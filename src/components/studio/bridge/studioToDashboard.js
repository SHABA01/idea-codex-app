/**
 * Studio → Dashboard Bridge
 *
 * Purpose:
 * - Extract only executive-level, decision-ready outputs from Studio projects
 * - Prevent analysis noise from leaking into the Dashboard
 * - Provide a deterministic, rule-based export model
 */

/**
 * RULE SET:
 * Each rule declares:
 * - toolId        → originating Studio tool
 * - dashboardKey → where it lands on the Dashboard summary
 * - transform    → optional content shaping
 */
const DASHBOARD_EXPORT_RULES = [
  {
    toolId: "idea-builder",
    dashboardKey: "idea",
  },
  {
    toolId: "market-snapshot",
    dashboardKey: "market",
  },
  {
    toolId: "risk-register",
    dashboardKey: "risks",
  },
  {
    toolId: "mvp-scope",
    dashboardKey: "mvp",
  },
  {
    toolId: "monetization",
    dashboardKey: "monetization",
  },
  {
    toolId: "executive-summary",
    dashboardKey: "executiveSummary",
  },
  {
    toolId: "dashboard-summary",
    dashboardKey: "customSummary",
  },
];

/**
 * Initialize a stable Dashboard summary shape
 * This guarantees widget safety even if data is missing
 */
function createEmptySummary() {
  return {
    idea: null,
    market: null,
    risks: null,
    mvp: null,
    monetization: null,
    executiveSummary: null,
    customSummary: null,
    meta: {
      generatedAt: new Date().toISOString(),
      source: "studio",
    },
  };
}

/**
 * Main export function
 */
export function generateDashboardSummary(project) {
  if (!project || !Array.isArray(project.blocks)) {
    return null;
  }

  const summary = createEmptySummary();

  DASHBOARD_EXPORT_RULES.forEach((rule) => {
    const block = project.blocks.find(
      (b) => b.tool === rule.toolId && b.content
    );

    if (!block) return;

    summary[rule.dashboardKey] = rule.transform
      ? rule.transform(block.content, project)
      : block.content;
  });

  return summary;
}

/**
 * Utility: check if a tool is dashboard-eligible
 * Useful for UI hints, badges, or future automation
 */
export function isDashboardExportable(toolId) {
  return DASHBOARD_EXPORT_RULES.some((r) => r.toolId === toolId);
}
