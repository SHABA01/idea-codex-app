import BaseChart from "../../components/charts/BaseChart";
import { activityTimeline } from "../../utils/dashboardChartData";

const ActivityWidget = ({ mode }) => {
  if (mode === "limited") {
    return <p>Upgrade for activity history.</p>;
  }

  return (
    <BaseChart
      type="line"
      data={activityTimeline}
      options={{
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { ticks: { precision: 0 } }
        }
      }}
    />
  );
};

export default ActivityWidget;
