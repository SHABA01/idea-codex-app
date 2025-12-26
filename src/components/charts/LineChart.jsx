import BaseChart from "./BaseChart";
import { chartTheme } from "./chartTheme";

const LineChart = ({ data }) => {
  return (
    <BaseChart
      type="line"
      data={{
        labels: data.labels,
        datasets: [
          {
            data: data.values,
            borderColor: chartTheme.accent,
            backgroundColor: "transparent",
            tension: 0.4
          }
        ]
      }}
      options={{
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: chartTheme.grid } },
          y: { grid: { color: chartTheme.grid } }
        }
      }}
    />
  );
};

export default LineChart;
