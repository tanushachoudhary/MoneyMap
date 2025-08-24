import React from "react";

/**
 * A reusable card component for displaying a single piece of information or statistic.
 * It includes an icon, a label, and a value.
 *
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.icon - The icon to be displayed, typically a React component.
 * @param {string} props.label - The descriptive label for the value (e.g., "Total Income").
 * @param {string | number} props.value - The value to be displayed.
 * @param {string} props.color - A Tailwind CSS class for the background color of the icon container (e.g., "bg-primary").
 */
const InfoCard = ({ icon, label, value, color }) => {
  return (
    // The main container for the card, with flexbox, padding, and styling for the card appearance.
    <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      {/* The circular container for the icon. */}
      <div
        // The background color is set dynamically using the `color` prop.
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {/* The icon passed via props is rendered here. */}
        {icon}
      </div>

      {/* The container for the text content. */}
      <div>
        {/* The label for the data point. */}
        <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
        {/* The value, prefixed with the Indian Rupee symbol. */}
        <span className="text-xl">₹ {value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
