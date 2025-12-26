import LineChart from "../../components/charts/LineChart";
import BarChart from "../../components/charts/BarChart";
import ChartContainer from "../../components/charts/ChartContainer";
import { dashboardData } from "../../utils/dashboardData";

const PerformanceWidget = ({ mode }) => {
  if (mode === "limited") return <p>Upgrade for insights.</p>;

  return (
    <div className="chart-grid">
      <ChartContainer title="Performance Growth">
        <LineChart data={dashboardData.performance.growth} />
      </ChartContainer>
      <ChartContainer title="Engagement">
        <BarChart data={dashboardData.performance.engagement} />
      </ChartContainer>
    </div>
  );
};

export default PerformanceWidget;
