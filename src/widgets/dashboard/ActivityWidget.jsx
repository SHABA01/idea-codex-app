import LineChart from "../../components/charts/LineChart";
import ChartContainer from "../../components/charts/ChartContainer";
import { dashboardData } from "../../utils/dashboardData";

const ActivityWidget = ({ mode }) => {
  if (mode === "limited") return <p>Upgrade for activity history.</p>;

  return (
    <ChartContainer title="Activity Timeline">
      <LineChart data={dashboardData.activity.timeline} />
    </ChartContainer>
  );
};

export default ActivityWidget;
