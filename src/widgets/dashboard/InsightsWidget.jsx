import RadarChart from "../../components/charts/RadarChart";
import ChartContainer from "../../components/charts/ChartContainer";
import { dashboardData } from "../../utils/dashboardData";

const InsightsWidget = ({ mode }) => {
  if (mode === "limited") return <p>Upgrade for insights.</p>;

  return (
    <ChartContainer title="Idea Strength Radar">
      <RadarChart data={dashboardData.insights.radar} />
    </ChartContainer>
  );
};

export default InsightsWidget;
