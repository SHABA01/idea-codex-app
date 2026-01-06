import { useEffect, useRef, useState } from "react";
import { useAppAccess } from "../../contexts/AppAccessContext";
import { dashboardConfig } from "./dashboardConfig";
import { resolveDashboardWidgetState } from "./dashboardRules";

import DashboardPanel from "./DashboardPanel";
import AccessGate from "../../components/access/AccessGate";

import StatsWidget from "../../widgets/dashboard/StatsWidget";
import ActivityWidget from "../../widgets/dashboard/ActivityWidget";
import IdeaStudioWidget from "../../widgets/dashboard/IdeaStudioWidget";
import CollaborationsWidget from "../../widgets/dashboard/CollaborationsWidget";
import EarningsWidget from "../../widgets/dashboard/EarningsWidget";
import InsightsWidget from "../../widgets/dashboard/InsightsWidget";
import PerformanceWidget from "../../widgets/dashboard/PerformanceWidget";

import "../../styles/dashboard.css";

const widgetRegistry = {
  stats: StatsWidget,
  activity: ActivityWidget,
  ideastudio: IdeaStudioWidget,
  collaborations: CollaborationsWidget,
  earnings: EarningsWidget,
  insights: InsightsWidget,
  performance: PerformanceWidget
};

const Dashboard = () => {
  const { tier } = useAppAccess();
  const scrollRefs = useRef({});
  const [overflow, setOverflow] = useState({});

  useEffect(() => {
    const map = {};
    Object.entries(scrollRefs.current).forEach(([key, el]) => {
      if (!el) return;
      map[key] = el.scrollWidth > el.clientWidth;
    });
    setOverflow(map);
  }, [tier]);

  const scrollBy = (key, dir) => {
    scrollRefs.current[key]?.scrollBy({
      left: dir * 320,
      behavior: "smooth"
    });
  };

  return (
    <div className="dashboard-root">
      {dashboardConfig.map((section) => {
        if (!section.visibleFor.includes(tier)) return null;

        return (
          <section key={section.section} className="dashboard-section">
            <h2>{section.title}</h2>

            <div className="dashboard-carousel">
              {overflow[section.section] && (
                <button
                  className="carousel-btn left"
                  onClick={() => scrollBy(section.section, -1)}
                >
                  ‹
                </button>
              )}

              <div
                className="dashboard-scroll"
                ref={(el) =>
                  (scrollRefs.current[section.section] = el)
                }
              >
                <div className="dashboard-row">
                  {section.widgets.map((widget) => {
                    const state =
                      resolveDashboardWidgetState(widget, tier);
                    if (!state.visible) return null;

                    const Widget =
                      widgetRegistry[widget.component];
                    if (!Widget) return null;

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
                          <Widget />
                        </DashboardPanel>
                      </AccessGate>
                    );
                  })}
                </div>
              </div>

              {overflow[section.section] && (
                <button
                  className="carousel-btn right"
                  onClick={() => scrollBy(section.section, 1)}
                >
                  ›
                </button>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Dashboard;
