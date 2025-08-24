import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

// A constant array of colors to be used for the pie chart segments.
// This ensures a consistent color scheme for Total Balance, Income, and Expense.
const COLORS = ["#875cf5", "#22C55E", "#FA2C37"];

/**
 * A component that displays a high-level financial overview using a pie chart.
 *
 * @param {object} props - The component's props.
 * @param {number} props.totalBalance - The user's total balance.
 * @param {number} props.totalIncome - The user's total income.
 * @param {number} props.totalExpense - The user's total expenses.
 */
const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  // Transform the incoming props into an array of objects.
  // This is the specific data structure required by the `CustomPieChart` component.
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expense", amount: totalExpense },
  ];

  return (
    // The main container for the component, styled as a "card".
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Finance Overview</h5>
      </div>

      {/* A reusable pie chart component for visualization. */}
      <CustomPieChart
        // Pass the formatted data array.
        data={balanceData}
        // A label to be displayed, likely in the center of the chart.
        label="Total Balance"
        // The main figure to display, formatted as a currency string.
        totalAmount={`₹${totalBalance}`}
        // Pass the predefined colors for the chart segments.
        colors={COLORS}
        // A boolean prop that likely controls the visibility of a text element in the chart.
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
