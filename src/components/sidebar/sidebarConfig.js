// src/config/sidebarConfig.js
// Canonical sidebar config used by Sidebar, MobileSidebar and breadcrumb util.

const sidebarConfig = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "fa-solid fa-chart-line",
    path: "/dashboard"
  },
  {
    id: "studio",
    label: "Idea Studio",
    icon: "fa-solid fa-pen-nib",
    path: "/studio"
  },
  {
    id: "community",
    label: "Community",
    icon: "fa-solid fa-users",
    path: "/community"
  },
  {
    id: "collab",
    label: "Collaborations",
    icon: "fa-solid fa-user-group",
    path: "/collab"
  },
  {
    id: "profile",
    label: "Profile",
    icon: "fa-solid fa-id-badge",
    path: "/profile"
  },

  // Marketplace section (as you requested)
  {
    section: "marketplace",
    title: "Marketplace",
    children: [
      {
        id: "market-gallery",
        label: "Gallery",
        icon: "fa-solid fa-store",
        path: "/market/gallery"
      },
      {
        id: "market-for-you",
        label: "For You",
        icon: "fa-solid fa-wand-magic-sparkles",
        path: "/market/recommended"
      },
      {
        id: "market-trending",
        label: "Trending",
        icon: "fa-solid fa-fire",
        path: "/market/trending"
      }
    ]
  },

  // utilities / admin
  {
    section: "tools",
    title: "Tools",
    children: [
      { id: "tools-templates", label: "Templates", icon: "fa-solid fa-layer-group", path: "/templates" },
      { id: "tools-extensions", label: "Extensions", icon: "fa-solid fa-puzzle-piece", path: "/extensions" },
      { id: "tools-ai", label: "AI tools", icon: "fa-solid fa-robot", path: "/ai" }
    ]
  },

  // settings & auth area handled separately in footer
];

export default sidebarConfig;
