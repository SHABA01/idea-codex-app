// src/components/dashboard/DashboardPanel.jsx

import "../../styles/dashboardpanel.css";

const DashboardPanel = ({ title, badge, children }) => {
  return (
    <section className="dashboard-panel">
      <header className="dashboard-panel-header">
        <h3>{title}</h3>

        {badge && (
          <span
            className={`badge badge-${badge.toLowerCase()}`}
          >
            {badge}
          </span>
        )}
      </header>

      <div className="dashboard-panel-body">
        {children}
      </div>
    </section>
  );
};

export default DashboardPanel;
