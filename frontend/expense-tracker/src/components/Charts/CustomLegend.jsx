import React from "react";

/**
 * A reusable, custom-styled legend component for a chart.
 * It iterates over a payload of data to display colored swatches and labels.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.payload - An array of objects passed by the charting library (e.g., Recharts).
 * Each object typically contains information about a chart series, including its `value` (name) and `color`.
 */
const CustomLegend = ({ payload }) => {
  return (
    // The main container for the legend items, using flexbox for layout.
    <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
      {/* Map over the `payload` array to create a legend item for each entry. */}
      {payload.map((entry, index) => (
        // Each legend item is a container with a key for React's rendering.
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          {/* This div serves as the colored swatch (the small dot). */}
          <div
            className="w-2.5 h-2.5 rounded-full"
            // The background color is set dynamically from the `color` property of the payload entry.
            style={{ backgroundColor: entry.color }}
          ></div>
          {/* This span displays the name of the chart series. */}
          <span className="text-sm text-gray-700 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
