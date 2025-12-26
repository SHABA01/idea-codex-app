import LineChart from "../../components/charts/LineChart";
import BarChart from "../../components/charts/BarChart";
import ChartContainer from "../../components/charts/ChartContainer";
import { dashboardData } from "../../utils/dashboardData";

const StatsWidget = ({ mode }) => {
  if (mode === "limited") return <p>Upgrade to unlock analytics.</p>;

  return (
    <div className="chart-grid">
      <ChartContainer title="Weekly Growth">
        <LineChart data={dashboardData.stats.growth} />
      </ChartContainer>
      <ChartContainer title="Usage Distribution">
        <BarChart data={dashboardData.stats.distribution} />
      </ChartContainer>
    </div>
  );
};

export default StatsWidget;
