// src/pages/dashboard/dashboardRules.js

import { TIER_ORDER } from "../../utils/tierOrder";

export const resolveDashboardWidgetState = (widget, tier) => {
  const visible =
    !widget.visibleFor || widget.visibleFor.includes(tier);

  if (!visible) {
    return { visible: false };
  }

  const locked =
    widget.lockedBelow &&
    TIER_ORDER.indexOf(tier) <
      TIER_ORDER.indexOf(widget.lockedBelow);

  const badge = widget.badgesByTier
    ? widget.badgesByTier[tier] ?? null
    : null;

  return {
    visible: true,
    locked,
    badge
  };
};
