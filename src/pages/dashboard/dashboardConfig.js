// src/pages/dashboard/dashboardConfig.js

export const dashboardConfig = [
  {
    section: "overview",
    title: "Overview",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    densityByTier: {
      demo: "compact",
      live: "comfortable",
      pro: "comfortable",
      enterprise: "spacious"
    },
    widgets: [
      {
        id: "stats",
        title: "Stats",
        component: "stats",
        visibleFor: ["demo", "live", "pro", "enterprise"],
        badgesByTier: {
          demo: "LIMITED",
          live: "BASIC",
          pro: null,
          enterprise: null
        }
      },
      {
        id: "activity",
        title: "Activity",
        component: "activity",
        visibleFor: ["live", "pro", "enterprise"],
        badgesByTier: {
          live: "LIMITED",
          pro: "BASIC",
          enterprise: null
        },
        lockedBelow: "live"
      }
    ]
  },
  {
    section: "creation",
    title: "Creation",
    visibleFor: ["live", "pro", "enterprise"],
    densityByTier: {
      live: "compact",
      pro: "comfortable",
      enterprise: "spacious"
    },
    widgets: [
      {
        id: "ideastudio",
        title: "Idea Studio",
        component: "ideastudio",
        visibleFor: ["live", "pro", "enterprise"],
        badgesByTier: {
          live: "LIMITED",
          pro: "BASIC",
          enterprise: null
        },
        lockedBelow: "live"
      }
    ]
  }
];
