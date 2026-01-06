import BaseChart from "../../components/charts/BaseChart";
import {
  collaborationsSplit,
  collaborationsHeatmap
} from "../../utils/dashboardChartData";


const CollaborationsWidget = ({ mode }) => {
  if (mode === "limited") {
    return <p>Upgrade to manage collaborators.</p>;
  }

  return (
    <>
      <BaseChart
        type="bar"
        data={collaborationsSplit}
        options={{
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true }
          }
        }}
      />

      {mode === "full" && (
        <BaseChart
          type="bar"
          data={collaborationsHeatmap}
          options={{
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true }
            },
            scales: {
              x: { stacked: true },
              y: { stacked: true, display: false }
            }
          }}
        />
      )}
    </>
  );
};

export default CollaborationsWidget;
