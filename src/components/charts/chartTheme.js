export const chartTheme = {
  text: getComputedStyle(document.documentElement)
    .getPropertyValue("--text-secondary"),
  grid: getComputedStyle(document.documentElement)
    .getPropertyValue("--card-border"),
  accent: getComputedStyle(document.documentElement)
    .getPropertyValue("--accent-gold"),
  background: getComputedStyle(document.documentElement)
    .getPropertyValue("--card-bg")
};
