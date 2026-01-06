// src/pages/dashboard/dashboardConfig.js

export const dashboardConfig = [
  /* ================= OVERVIEW ================= */

  {
    section: "overview",
    title: "Overview",
    visibleFor: ["demo", "live", "pro", "enterprise"],
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
        visibleFor: ["demo", "live", "pro", "enterprise"],
        badgesByTier: {
          live: "LIMITED",
          pro: "BASIC",
          enterprise: null
        },
        lockedBelow: "live"
      }
    ]
  },

  /* ================= CREATION ================= */

  {
    section: "creation",
    title: "Creation",
    visibleFor: ["demo","live", "pro", "enterprise"],
    widgets: [
      {
        id: "ideastudio",
        title: "Idea Studio",
        component: "ideastudio",
        visibleFor: ["demo", "live", "pro", "enterprise"],
        badgesByTier: {
          live: "LIMITED",
          pro: "BASIC",
          enterprise: null
        },
        lockedBelow: "live"
      }
    ]
  },

  /* ================= PERFORMANCE ================= */

  {
    section: "performance",
    title: "Performance",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    widgets: [
      {
        id: "performance",
        title: "Performance Trends",
        component: "performance",
        visibleFor: ["demo", "live", "pro", "enterprise"],
        badgesByTier: {
          live: "LIMITED",
          pro: "BASIC",
          enterprise: null
        },
        lockedBelow: "live"
      },
      {
        id: "earnings",
        title: "Earnings",
        component: "earnings",
        visibleFor: ["demo", "live", "pro", "enterprise"],
        badgesByTier: {
          live: "LIMITED",
          pro: "BASIC",
          enterprise: null
        },
        lockedBelow: "live"
      }
    ]
  },

  /* ================= COLLABORATION ================= */

  {
    section: "collaboration",
    title: "Collaboration",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    widgets: [
      {
        id: "collaborations",
        title: "Collaborations",
        component: "collaborations",
        visibleFor: ["demo", "live", "pro", "enterprise"],
        badgesByTier: {
          live: "LIMITED",
          pro: "BASIC",
          enterprise: null
        },
        lockedBelow: "live"
      }
    ]
  },

  /* ================= INSIGHTS ================= */

  {
    section: "insights",
    title: "Insights",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    widgets: [
      {
        id: "insights",
        title: "AI Insights",
        component: "insights",
        visibleFor: ["demo","live", "pro", "enterprise"],
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
