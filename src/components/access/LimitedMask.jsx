// src/components/access/LimitedMask.jsx

import "../../styles/accessgate.css";

const LimitedMask = ({ children }) => {
  return (
    <div className="limited-mask">
      {children}
      <div className="fade-overlay" />
    </div>
  );
};

export default LimitedMask;
