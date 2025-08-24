import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomToolTip from "./CustomToolTip";
import CustomLegend from "./CustomLegend";

/**
 * A reusable, custom-styled donut chart component built with Recharts.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.data - The array of data for the chart. Each object represents a slice.
 * @param {string} props.label - A label to be displayed in the center of the donut.
 * @param {string | number} props.totalAmount - The main value to be displayed in the center.
 * @param {Array<string>} props.colors - An array of hex color codes for the pie slices.
 * @param {boolean} [props.showTextAnchor] - If true, the central text (label and amount) will be displayed.
 */
const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    // This wrapper makes the chart responsive to the size of its parent container.
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        {/* The Pie component defines the actual donut chart. */}
        <Pie
          data={data}
          dataKey="amount" // The 'amount' property determines the size of each slice.
          nameKey="name" // The 'name' property is used for tooltips and legends.
          cx="50%" // Center the chart horizontally.
          cy="50%" // Center the chart vertically.
          outerRadius={130} // The outer edge of the donut.
          innerRadius={100} // The inner edge of the donut, creating the hole in the middle.
          labelLine={false} // Hide the default lines that connect labels to slices.
        >
          {/* To give each slice a unique color, we map over our data and render a <Cell> for each one. */}
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              // The modulo operator (%) ensures the colors repeat if there are more data points than colors.
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>

        {/* Use our imported custom components to render the tooltip and legend. */}
        <Tooltip content={<CustomToolTip />} />
        <Legend content={<CustomLegend />} />

        {/* This block conditionally renders the text in the middle of the donut. */}
        {showTextAnchor && (
          <>
            {/* These are SVG <text> elements positioned in the center of the chart. */}
            <text
              x="50%"
              y="50%"
              dy={-25} // `dy` provides a vertical offset from the center.
              textAnchor="middle" // Horizontally centers the text.
              fill="#666"
              fontSize="14px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#333"
              fontSize="24px"
              fontWeight="semi-bold"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
