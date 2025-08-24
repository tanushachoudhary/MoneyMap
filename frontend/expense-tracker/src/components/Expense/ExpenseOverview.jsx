import React, { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "../Charts/CustomLineChart";

/**
 * A component that displays an overview of expenses, including a line chart.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.transactions - The raw array of expense transaction data.
 * @param {Function} props.onExpenseIncome - A callback function to be triggered when the "Add Expense" button is clicked.
 */
const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  // State to hold the data after it has been processed and formatted for the line chart.
  const [chartData, setChartData] = useState([]);

  // This useEffect hook runs whenever the `transactions` prop changes.
  useEffect(() => {
    // Call a helper function to transform the raw transaction data into a chart-friendly format.
    const result = prepareExpenseLineChartData(transactions);
    // Update the state with the formatted data, which will cause the chart to re-render.
    setChartData(result);

    // Cleanup function (not needed here, but good practice to include).
    return () => {};
    // The dependency array `[transactions]` ensures this effect only runs when the transactions prop changes.
  }, [transactions]);

  return (
    // The main container for the overview, styled as a "card".
    <div className="card">
      {/* Header section containing the title and the "Add Expense" button. */}
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs md:text-sm text-gray-400 mt-0.5">
            Track your spending trends over time and gain insights where your
            money goes.
          </p>
        </div>

        {/* The button to add a new expense. Its click action is handled by the parent component. */}
        <button className="add-btn" onClick={onExpenseIncome}>
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      {/* Container for the chart. */}
      <div className="mt-10">
        {/* A reusable line chart component. */}
        <CustomLineChart
          // Pass the processed chart data to the component for visualization.
          data={chartData}
        />
      </div>
    </div>
  );
};

export default ExpenseOverview;