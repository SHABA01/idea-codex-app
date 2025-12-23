import { useAppAccess } from "../../contexts/AppAccessContext";
import { dashboardConfig } from "./dashboardConfig";
import { resolveDashboardWidgetState } from "./dashboardRules";

import DashboardPanel from "../../pages/dashboard/DashboardPanel";
import AccessGate from "../../components/access/AccessGate";

import StatsWidget from "../../widgets/dashboard/StatsWidget";
import ActivityWidget from "../../widgets/dashboard/ActivityWidget";
import IdeaStudioWidget from "../../widgets/dashboard/IdeaStudioWidget";

import "../../styles/dashboard.css";

const widgetRegistry = {
  stats: StatsWidget,
  activity: ActivityWidget,
  ideastudio: IdeaStudioWidget
};

const badgeToMode = {
  LIMITED: "limited",
  BASIC: "basic",
  null: "full"
};

const Dashboard = () => {
  const { tier } = useAppAccess();

  return (
    <div className="dashboard-root">
      {dashboardConfig.map((section) => {
        if (!section.visibleFor.includes(tier)) return null;

        const density =
          section.densityByTier?.[tier] || "comfortable";

        return (
          <section
            key={section.section}
            className={`dashboard-section density-${density}`}
          >
            <header className="dashboard-section-header">
              <h2>{section.title}</h2>
            </header>

            <div className="dashboard-grid">
              {section.widgets.map((widget) => {
                const state =
                  resolveDashboardWidgetState(widget, tier);

                if (!state.visible) return null;

                const WidgetComponent =
                  widgetRegistry[widget.component];

                if (!WidgetComponent) return null;

                const mode = badgeToMode[state.badge];

                return (
                  <AccessGate
                    key={widget.id}
                    state={state}
                    label={widget.title}
                  >
                    <DashboardPanel
                      title={widget.title}
                      badge={state.badge}
                    >
                      <WidgetComponent mode={mode} />
                    </DashboardPanel>
                  </AccessGate>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Dashboard;
