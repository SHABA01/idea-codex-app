import BaseChart from "./BaseChart";
import { chartTheme } from "./chartTheme";

const DonutChart = ({ data }) => {
  return (
    <BaseChart
      type="doughnut"
      data={{
        labels: data.labels,
        datasets: [
          {
            data: data.values,
            backgroundColor: [
              chartTheme.accent,
              chartTheme.text,
              chartTheme.grid
            ]
          }
        ]
      }}
      options={{ responsive: true }}
    />
  );
};

export default DonutChart;
