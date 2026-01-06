import BaseChart from "../../components/charts/BaseChart";
import { performanceGrowth } from "../../utils/dashboardChartData";

const PerformanceWidget = () => {
  return (
    <BaseChart
      type="line"
      data={performanceGrowth}
      options={{
        plugins: { legend: { display: false } }
      }}
    />
  );
};

export default PerformanceWidget;

