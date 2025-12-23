// src/components/access/LockedOverlay.jsx

import "../../styles/accessgate.css";

const LockedOverlay = ({ label }) => {
  return (
    <div className="locked-overlay">
      <i className="fa-solid fa-lock" />
      <h4>{label}</h4>
      <p>Upgrade your plan to unlock this feature.</p>
      <button className="upgrade-btn">Upgrade</button>
    </div>
  );
};

export default LockedOverlay;
