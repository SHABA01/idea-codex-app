import BaseChart from "../../components/charts/BaseChart";
import { earningsTrend } from "../../utils/dashboardChartData";

const EarningsWidget = () => {
  return (
    <BaseChart
      type="bar"
      data={earningsTrend}
      options={{
        plugins: { legend: { display: false } }
      }}
    />
  );
};

export default EarningsWidget;
