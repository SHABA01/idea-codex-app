// src/utils/breadcrumbs.js
import sidebarConfig from "../components/sidebar/sidebarConfig";

/**
 * buildBreadcrumbs(pathname)
 * - Returns breadcrumb array [{ label, path }]
 * - Matches top-level and nested items in sidebarConfig
 *
 * Example: "/market/gallery" -> [{label: "Marketplace", path:"/market"}, {label:"Gallery", path:"/market/gallery"}]
 */
const flattenRoutes = (config) => {
  const list = [];
  config.forEach((item) => {
    if (item.path) list.push({ label: item.label, path: item.path });
    if (item.children) {
      item.children.forEach((c) => list.push({ label: c.label, path: c.path, parentTitle: item.title }));
    }
  });
  return list;
};

const routes = flattenRoutes(sidebarConfig);

export const buildBreadcrumbs = (pathname) => {
  // Naive split-building: attempt to match longest route segments
  const crumbs = [];
  // Try exact match first
  const exact = routes.find((r) => r.path === pathname);
  if (exact) {
    crumbs.push({ label: exact.label, path: exact.path });
    // If it's nested (has parentTitle) add parent crumb
    if (exact.parentTitle) {
      crumbs.unshift({ label: exact.parentTitle, path: exact.path.split("/").slice(0,2).join("/") || "/" });
    }
    return crumbs;
  }

  // Otherwise, build incrementally from path segments
  const parts = pathname.split("/").filter(Boolean);
  let acc = "";
  parts.forEach((p) => {
    acc = acc + "/" + p;
    const match = routes.find((r) => r.path === acc);
    if (match) crumbs.push({ label: match.label, path: match.path });
  });

  // Fallback: last segment
  if (crumbs.length === 0 && parts.length > 0) {
    const last = parts[parts.length - 1];
    crumbs.push({ label: last.replace(/[-_]/g, " "), path: pathname });
  }

  return crumbs;
};
