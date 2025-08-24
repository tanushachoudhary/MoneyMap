import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

/**
 * A component that displays a bar chart of expenses from the last 30 days.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.data - The raw array of expense transaction data for the last 30 days.
 */
const Last30DaysExpenses = ({ data }) => {
  // State to hold the data after it has been processed into a chart-friendly format.
  const [chartData, setChartData] = useState([]);

  // This useEffect hook runs whenever the `data` prop changes.
  useEffect(() => {
    // Call a helper function to transform the raw transaction data.
    const result = prepareExpenseBarChartData(data);
    // Update the state with the formatted data, which will cause the chart to re-render.
    setChartData(result);

    // Cleanup function (not needed here, but good practice).
    return () => {};
    // The dependency array `[data]` ensures this effect only runs when the `data` prop changes.
  }, [data]);

  return (
    // The main container for the component, styled as a "card".
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expense</h5>
      </div>

      {/* A reusable bar chart component. */}
      <CustomBarChart
        // Pass the processed chart data for visualization.
        data={chartData}
        // This prop tells the chart which property to use for the category labels (e.g., on the x-axis).
        dataKey={"category"}
      />
    </div>
  );
};

export default Last30DaysExpenses;
