// src/components/access/AccessGate.jsx

import LockedOverlay from "./LockedOverlay";
import LimitedMask from "./LimitedMask";

const AccessGate = ({ state, label, children }) => {
  if (!state.visible) return null;

  if (state.locked) {
    return <LockedOverlay label={label} />;
  }

  if (state.badge === "LIMITED") {
    return <LimitedMask>{children}</LimitedMask>;
  }

  return children;
};

export default AccessGate;
