// src/components/sidebar/sidebarConfig.js

const sidebarConfig = [
  // ================= CORE =================
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "fa-solid fa-chart-line",
    path: "/dashboard",
    access: ["demo", "live"],
    premium: false
  },
  {
    id: "studio",
    label: "Idea Studio",
    icon: "fa-solid fa-pen-nib",
    path: "/studio",
    access: ["demo", "live"],
    premium: false
  },
  {
    id: "community",
    label: "Community",
    icon: "fa-solid fa-users",
    path: "/community",
    access: ["live"],
    premium: true
  },
  {
    id: "collab",
    label: "Collaborations",
    icon: "fa-solid fa-user-group",
    path: "/collab",
    access: ["live"],
    premium: true
  },
  {
    id: "profile",
    label: "Profile",
    icon: "fa-solid fa-id-badge",
    path: "/profile",
    access: ["demo", "live"],
    premium: false
  },

  // ================= MARKETPLACE =================
  {
    section: "marketplace",
    title: "Marketplace",
    access: ["live"],
    premium: true,
    dropdown: true,
    children: [
      {
        id: "market-gallery",
        label: "Gallery",
        icon: "fa-solid fa-store",
        path: "/market/gallery",
        access: ["live"],
        premium: true
      },
      {
        id: "market-for-you",
        label: "For You",
        icon: "fa-solid fa-wand-magic-sparkles",
        path: "/market/recommended",
        access: ["live"],
        premium: true
      },
      {
        id: "market-trending",
        label: "Trending",
        icon: "fa-solid fa-fire",
        path: "/market/trending",
        access: ["live"],
        premium: true
      }
    ]
  },

  // ================= TOOLS =================
  {
    section: "tools",
    title: "Tools Hub",
    access: ["demo", "live"],
    premium: false,
    dropdown: true,
    children: [
      {
        id: "tools-templates",
        label: "Templates",
        icon: "fa-solid fa-layer-group",
        path: "/tools/templates",
        access: ["demo", "live"],
        premium: false
      },
      {
        id: "tools-extensions",
        label: "Extensions",
        icon: "fa-solid fa-puzzle-piece",
        path: "/tools/extensions",
        access: ["live"],
        premium: true
      },
      {
        id: "tools-ai",
        label: "AI Tools",
        icon: "fa-solid fa-robot",
        path: "/tools/ai_tools",
        access: ["live"],
        premium: true
      }
    ]
  }
];

export default sidebarConfig;
