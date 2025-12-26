import BaseChart from "./BaseChart";
import { chartTheme } from "./chartTheme";

const BarChart = ({ data }) => {
  return (
    <BaseChart
      type="bar"
      data={{
        labels: data.labels,
        datasets: [
          {
            data: data.values,
            backgroundColor: chartTheme.accent
          }
        ]
      }}
      options={{
        responsive: true,
        plugins: { legend: { display: false } }
      }}
    />
  );
};

export default BarChart;
