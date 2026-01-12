/* =====================================================
   ACTIVITY WIDGET
   ===================================================== */

export const activityTimeline = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Activity",
      data: [12, 19, 7, 15, 22, 9, 14],
      borderColor: "rgba(0, 0, 0, 1)",
      backgroundColor: "#facc15cc",
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
      borderColor: "rgba(0, 0, 0, 1)",
      backgroundColor: "#facc15cc",
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
      backgroundColor: "#facc15cc"
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
      backgroundColor: "#facc15cc"
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
      backgroundColor: "#facc15cc"
    },
    {
      label: "Afternoon",
      data: [2, 4, 3, 5, 4],
      backgroundColor: "#facc15cc"
    },
    {
      label: "Evening",
      data: [1, 2, 1, 3, 2],
      backgroundColor: "#facc15cc"
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
      borderColor: "rgba(0, 0, 0, 1)",
      backgroundColor: "#facc15cc",
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
      borderColor: "rgba(0, 0, 0, 1)",
      backgroundColor: "#facc15cc",
      tension: 0.35,
      fill: true
    }
  ]
};
