import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * A reusable, custom-styled bar chart component built with Recharts.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.data - The array of data to be plotted. Each object represents a bar.
 * @param {string} props.dataKey - The key in the data objects to be used for the X-axis labels (e.g., 'category', 'month').
 */
const CustomBarChart = ({ data, dataKey }) => {
  /**
   * A helper function to create an alternating color pattern for the bars.
   * @param {number} index - The index of the data point.
   * @returns {string} - A hex color code.
   */
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  /**
   * A custom component to render the tooltip when a user hovers over a bar.
   * Recharts passes `active` and `payload` props to this component automatically.
   */
  const CustomToolTip = ({ active, payload }) => {
    // `active` is a boolean that is true when the tooltip should be shown.
    // `payload` is an array containing the data for the hovered bar.
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {/* Access the category from the bar's data payload. */}
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-600">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-900">
              {/* Access and format the amount. */}₹{payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
    return null; // Render nothing if the tooltip isn't active.
  };

  return (
    <div className="bg-white mt-6">
      {/* This wrapper makes the chart responsive to the size of its parent container. */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          {/* The grid behind the chart. `stroke="none"` hides the grid lines. */}
          <CartesianGrid stroke="none" />

          {/* The X-axis (horizontal). `dataKey` determines which property from the data is used for labels. */}
          <XAxis
            dataKey={dataKey}
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />

          {/* The Y-axis (vertical). */}
          <YAxis tick={{ fontSize: 12, fill: "#555" }} />

          {/* Use our custom component for the tooltip. */}
          <Tooltip content={<CustomToolTip />} />

          {/* This component defines the bars. `dataKey="amount"` means the bar height is based on the 'amount' property. */}
          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {/* To give each bar a unique color, we map over our data and render a <Cell> component for each bar.
              The `fill` of each Cell is determined by our `getBarColor` function.
            */}
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
