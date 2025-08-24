import React from "react";

/**
 * A reusable, custom-styled tooltip component for a chart.
 * It is designed to be used with a library like Recharts, which automatically
 * passes the `active` and `payload` props when a user hovers over a chart element.
 *
 * @param {object} props - The component's props, passed by the charting library.
 * @param {boolean} props.active - A boolean that is true when the tooltip should be visible.
 * @param {Array<object>} props.payload - An array containing the data for the hovered chart element.
 */
const CustomToolTip = ({ active, payload }) => {
  // This check ensures the tooltip only renders when the user is actively
  // hovering over a chart element and there is data to display.
  if (active && payload && payload.length) {
    return (
      // The main container for the custom tooltip, with styling for the card-like appearance.
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className="text-xs font-semibold text-purple-800 mb-1">
          {/*
           * The `payload` is an array, and the data for the hovered element is typically in the first item.
           * `payload[0].name` displays the name of the data point (e.g., "Total Income", "Groceries").
           */}
          {payload[0].name}
        </p>
        <p className="text-sm text-gray-600">
          Amount:{" "}
          <span className="text-sm font-medium text-gray-900">
            {/* `payload[0].value` displays the numerical value of the data point. */}
            ₹{payload[0].value}
          </span>
        </p>
      </div>
    );
  }

  // If the tooltip is not active, render nothing.
  return null;
};

export default CustomToolTip;
