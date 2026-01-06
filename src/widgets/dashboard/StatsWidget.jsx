import BaseChart from "../../components/charts/BaseChart";
import {
  statsGrowth,
  statsDistribution
} from "../../utils/dashboardChartData";


const StatsWidget = ({ mode }) => {
  if (mode === "limited") {
    return <p>Upgrade to unlock analytics.</p>;
  }

  return (
    <>
      <BaseChart
        type="line"
        data={statsGrowth}
        options={{
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { ticks: { precision: 0 } }
          }
        }}
      />

      <BaseChart
        type="bar"
        data={statsDistribution}
        options={{
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true }
          }
        }}
      />
    </>
  );
};

export default StatsWidget;
