import React, { useEffect, useState } from "react";
import { prepareIncomeBarChartData } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";

/**
 * A component that displays an overview of income, including a bar chart.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.transactions - The raw array of income transaction data.
 * @param {Function} props.onAddIncome - A callback function to be triggered when the "Add Income" button is clicked.
 */
const IncomeOverview = ({ transactions, onAddIncome }) => {
  // State to hold the data that has been processed and formatted for the chart.
  const [chartData, setChartData] = useState([]);

  // The useEffect hook processes the transaction data whenever it changes.
  useEffect(() => {
    // Call a helper function to transform the raw transaction data into a chart-friendly format.
    const result = prepareIncomeBarChartData(transactions);
    // Update the state with the formatted data, which will cause the chart to re-render.
    setChartData(result);

    // Cleanup function (not needed here, but good practice to include).
    return () => {};
    // The dependency array `[transactions]` ensures this effect only runs when the transactions prop changes.
  }, [transactions]);

  return (
    // The main container for the overview, styled as a "card".
    <div className="card">
      {/* Header section containing the title and the "Add Income" button. */}
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs md:text-sm text-gray-400 mt-0.5">
            Track your earning over time and analyze your income trends.
          </p>
        </div>

        {/* The button to add a new income record. Its action is handled by the parent component. */}
        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      {/* Container for the chart. */}
      <div className="mt-10">
        {/* A reusable bar chart component. */}
        <CustomBarChart
          // Pass the processed chart data to the component for visualization.
          data={chartData}
          // This prop likely tells the chart which property to use for the category labels (e.g., on the x-axis).
          dataKey={"source"}
        />
      </div>
    </div>
  );
};

export default IncomeOverview;
