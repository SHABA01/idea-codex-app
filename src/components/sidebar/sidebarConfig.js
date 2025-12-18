const sidebarConfig = [
  /* ================= CORE ================= */

  {
    id: "dashboard",
    label: "Dashboard",
    icon: "fa-solid fa-chart-line",
    path: "/dashboard",
    feature: "dashboard",
    visibleFor: ["demo", "live", "pro", "enterprise"]
  },

  {
    id: "studio",
    label: "Idea Studio",
    icon: "fa-solid fa-pen-nib",
    path: "/studio",
    feature: "studio",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    badges: ["LIMITED"], // demo shows limited mode
    lockedBelow: "demo"
  },

  {
    id: "community",
    label: "Community",
    icon: "fa-solid fa-users",
    path: "/community",
    feature: "community",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "live"
  },

  {
    id: "collaborations",
    label: "Collaborations",
    icon: "fa-solid fa-user-group",
    path: "/collab",
    feature: "collaborations",
    visibleFor: ["live", "pro", "enterprise"],
    lockedBelow: "live"
  },

  {
    id: "profile",
    label: "Profile",
    icon: "fa-solid fa-id-badge",
    path: "/profile",
    feature: "profile",
    visibleFor: ["live", "pro", "enterprise"],
    lockedBelow: "live"
  },

  /* ================= MARKETPLACE ================= */

  {
    section: "marketplace",
    title: "Marketplace",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "live",
    dropdown: true,
    children: [
      {
        id: "market-gallery",
        label: "Gallery",
        icon: "fa-solid fa-store",
        path: "/market/gallery",
        feature: "marketplace.gallery",
        visibleFor: ["demo", "live", "pro", "enterprise"]
      },
      {
        id: "market-for-you",
        label: "For You",
        icon: "fa-solid fa-wand-magic-sparkles",
        path: "/market/recommended",
        feature: "marketplace.forYou",
        visibleFor: ["live", "pro", "enterprise"],
        lockedBelow: "live"
      },
      {
        id: "market-trending",
        label: "Trending",
        icon: "fa-solid fa-fire",
        path: "/market/trending",
        feature: "marketplace.trending",
        visibleFor: ["live", "pro", "enterprise"],
        lockedBelow: "live"
      }
    ]
  },

  /* ================= TOOLS HUB ================= */

  {
    section: "tools",
    title: "Tools Hub",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    dropdown: true,
    children: [
      {
        id: "tools-templates",
        label: "Templates",
        icon: "fa-solid fa-layer-group",
        path: "/tools/templates",
        feature: "tools.templates",
        visibleFor: ["live", "pro", "enterprise"],
        lockedBelow: "live"
      },
      {
        id: "tools-extensions",
        label: "Extensions",
        icon: "fa-solid fa-puzzle-piece",
        path: "/tools/extensions",
        feature: "tools.extensions",
        visibleFor: ["live", "pro", "enterprise"],
        lockedBelow: "live",
        badges: ["LIMITED"]
      },
      {
        id: "tools-ai",
        label: "AI Tools",
        icon: "fa-solid fa-robot",
        path: "/tools/ai_tools",
        feature: "tools.ai",
        visibleFor: ["live", "pro", "enterprise"],
        lockedBelow: "live"
      }
    ]
  }
];

export default sidebarConfig;
