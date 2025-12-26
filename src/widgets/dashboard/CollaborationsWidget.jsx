import BarChart from "../../components/charts/BarChart";
import HeatmapChart from "../../components/charts/HeatmapChart";
import ChartContainer from "../../components/charts/ChartContainer";
import { dashboardData } from "../../utils/dashboardData";

const CollaborationsWidget = ({ mode }) => {
  if (mode === "limited") return <p>Upgrade to manage collaborators.</p>;

  return (
    <div className="chart-grid">
      <ChartContainer title="Roles Distribution">
        <BarChart data={dashboardData.collaborations.split} />
      </ChartContainer>
      {mode === "full" && (
        <ChartContainer title="Collaboration Intensity">
          <HeatmapChart data={dashboardData.collaborations.heatmap} />
        </ChartContainer>
      )}
    </div>
  );
};

export default CollaborationsWidget;
