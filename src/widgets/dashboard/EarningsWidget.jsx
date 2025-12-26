import LineChart from "../../components/charts/LineChart";
import DonutChart from "../../components/charts/DonutChart";
import ChartContainer from "../../components/charts/ChartContainer";
import { dashboardData } from "../../utils/dashboardData";

const EarningsWidget = ({ mode }) => {
  if (mode === "limited") return <p>Upgrade to view earnings.</p>;

  return (
    <div className="chart-grid">
      <ChartContainer title="Monthly Earnings">
        <LineChart data={dashboardData.earnings.monthly} />
      </ChartContainer>
      {mode === "full" && (
        <ChartContainer title="Revenue Sources">
          <DonutChart data={dashboardData.earnings.sources} />
        </ChartContainer>
      )}
    </div>
  );
};

export default EarningsWidget;
