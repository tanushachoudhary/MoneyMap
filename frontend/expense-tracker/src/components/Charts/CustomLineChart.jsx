import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * A reusable, custom-styled area chart component built with Recharts.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.data - The array of data to be plotted. Each object represents a point on the chart.
 */
const CustomLineChart = ({ data }) => {
  /**
   * A custom component to render the tooltip when a user hovers over a data point.
   * Recharts automatically passes `active` and `payload` props to this component.
   */
  const CustomToolTip = ({ active, payload }) => {
    // `active` is true when the tooltip should be shown.
    // `payload` contains the data for the hovered point.
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {/* Access the category from the data point's payload. */}
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
        <AreaChart data={data}>
          {/*
           * Define a reusable SVG gradient. The <defs> element holds graphical objects that can be used later.
           * We give this gradient an ID so we can reference it to fill the area of our chart.
           */}
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              {/* The gradient starts at 40% opacity and fades to 0% opacity. */}
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* The grid behind the chart. `stroke="none"` hides the grid lines. */}
          <CartesianGrid stroke="none" />

          {/* The X-axis (horizontal). `dataKey` determines which property from the data is used for labels. */}
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />

          {/* The Y-axis (vertical). */}
          <YAxis tick={{ fontSize: 12, fill: "#555" }} />

          {/* Use our custom component for the tooltip. */}
          <Tooltip content={<CustomToolTip />} />

          {/* This component defines the actual line and the filled area beneath it. */}
          <Area
            type="monotone" // This creates a smooth, curved line.
            dataKey="amount" // The 'amount' property in our data determines the line's height.
            stroke="#875cf5" // The color of the line itself.
            fill="url(#incomeGradient)" // The fill for the area under the line, referencing our SVG gradient by its ID.
            strokeWidth={3} // The thickness of the line.
            dot={{ r: 3, fill: "ab8df8" }} // Style for the dots at each data point.
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
