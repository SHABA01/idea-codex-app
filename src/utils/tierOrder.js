// src/utils/tierOrder.js

/**
 * Authoritative tier hierarchy for the application.
 * Lower index = lower privilege
 */
export const TIER_ORDER = [
  "demo",
  "live",
  "pro",
  "enterprise"
];

/**
 * Optional helpers (future-safe)
 */

export const isTierAtLeast = (tier, minimumTier) => {
  return (
    TIER_ORDER.indexOf(tier) >=
    TIER_ORDER.indexOf(minimumTier)
  );
};

export const isTierBelow = (tier, maximumTier) => {
  return (
    TIER_ORDER.indexOf(tier) <
    TIER_ORDER.indexOf(maximumTier)
  );
};
