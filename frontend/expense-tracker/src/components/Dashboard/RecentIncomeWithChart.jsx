import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

// A constant array of colors to be used for the different segments of the pie chart.
const COLORS = ["#875cf5", "#22C55E", "#FF6900", "#4f39f6", "#29c9f6"];

/**
 * A component that displays a pie chart of income from the last 60 days.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.data - The raw array of income transaction data.
 * @param {number} props.totalIncome - The total income amount to be displayed in the center of the chart.
 */
const RecentIncomeWithChart = ({ data, totalIncome }) => {
  // State to hold the data after it has been formatted for the pie chart.
  const [chartData, setChartData] = useState([]);

  /**
   * Transforms the raw `data` prop into the structure required by the `CustomPieChart` component.
   */
  const prepareChartData = () => {
    // Map over the input data to create a new array of objects with `name` and `amount` keys.
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  };

  // The useEffect hook runs `prepareChartData` whenever the `data` prop changes.
  useEffect(() => {
    prepareChartData();
    // Cleanup function (not needed here, but good practice).
    return () => {};
    // The dependency array `[data]` ensures this effect only runs when the `data` prop is updated.
  }, [data]);

  return (
    // The main container for the component, styled as a "card".
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      {/* A reusable pie chart component. */}
      <CustomPieChart
        // Pass the processed chart data for visualization.
        data={chartData}
        // A label to be displayed, likely in the center of the chart.
        label="Total Income"
        // The main figure to display, formatted as a currency string.
        totalAmount={`₹${totalIncome}`}
        // A boolean prop that likely controls a text element's visibility.
        showTextAnchor
        // Pass the predefined colors for the chart segments.
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
