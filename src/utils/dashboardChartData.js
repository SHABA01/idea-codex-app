/* =====================================================
   ACTIVITY WIDGET
   ===================================================== */

export const activityTimeline = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Activity",
      data: [12, 19, 7, 15, 22, 9, 14],
      borderColor: "var(--accent-gold)",
      backgroundColor: "rgba(255, 213, 45, 0.15)",
      tension: 0.4,
      fill: true
    }
  ]
};

/* =====================================================
   STATS WIDGET
   ===================================================== */

export const statsGrowth = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      label: "Growth",
      data: [18, 26, 39, 52],
      borderColor: "var(--accent-gold)",
      backgroundColor: "rgba(255, 213, 45, 0.12)",
      tension: 0.35,
      fill: true
    }
  ]
};

export const statsDistribution = {
  labels: ["Ideas", "Collaborations", "Revenue"],
  datasets: [
    {
      data: [45, 30, 25],
      backgroundColor: [
        "rgba(255, 213, 45, 0.9)",
        "rgba(255, 213, 45, 0.6)",
        "rgba(255, 213, 45, 0.35)"
      ]
    }
  ]
};

/* =====================================================
   COLLABORATIONS WIDGET
   ===================================================== */

export const collaborationsSplit = {
  labels: ["Design", "Engineering", "Marketing"],
  datasets: [
    {
      data: [8, 14, 5],
      backgroundColor: "rgba(255, 213, 45, 0.8)"
    }
  ]
};

/*
  Heatmap-style density (stacked bar fallback)
  This avoids plugins and canvas hacks
*/
export const collaborationsHeatmap = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      label: "Morning",
      data: [1, 3, 2, 4, 3],
      backgroundColor: "rgba(255, 213, 45, 0.9)"
    },
    {
      label: "Afternoon",
      data: [2, 4, 3, 5, 4],
      backgroundColor: "rgba(255, 213, 45, 0.6)"
    },
    {
      label: "Evening",
      data: [1, 2, 1, 3, 2],
      backgroundColor: "rgba(255, 213, 45, 0.35)"
    }
  ]
};

/* =====================================================
   PERFORMANCE WIDGET
   ===================================================== */

export const performanceGrowth = {
  labels: ["Jan", "Feb", "Mar"],
  datasets: [
    {
      label: "Performance Index",
      data: [10, 18, 28],
      borderColor: "var(--accent-gold)",
      backgroundColor: "rgba(255, 213, 45, 0.15)",
      tension: 0.4,
      fill: true
    }
  ]
};

/* =====================================================
   EARNINGS WIDGET
   ===================================================== */

export const earningsTrend = {
  labels: ["Jan", "Feb", "Mar"],
  datasets: [
    {
      label: "Earnings",
      data: [12000, 18000, 42000],
      borderColor: "var(--accent-gold)",
      backgroundColor: "rgba(255, 213, 45, 0.2)",
      tension: 0.35,
      fill: true
    }
  ]
};
