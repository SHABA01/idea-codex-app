import BaseChart from "./BaseChart";
import { chartTheme } from "./chartTheme";

const RadarChart = ({ data }) => {
  return (
    <BaseChart
      type="radar"
      data={{
        labels: data.labels,
        datasets: [
          {
            data: data.values,
            borderColor: chartTheme.accent,
            backgroundColor: "rgba(255,213,45,0.2)",
            pointBackgroundColor: chartTheme.accent
          }
        ]
      }}
      options={{
        responsive: true,
        scales: {
          r: {
            grid: { color: chartTheme.grid },
            angleLines: { color: chartTheme.grid }
          }
        }
      }}
    />
  );
};

export default RadarChart;
