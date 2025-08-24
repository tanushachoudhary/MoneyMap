import React from "react";
import {
  LuTrash2,
  LuTrendingDown,
  LuTrendingUp,
  LuUtensils,
} from "react-icons/lu";

/**
 * A reusable card component to display details of a single transaction (income or expense).
 *
 * @param {object} props - The component's props.
 * @param {string} props.title - The title of the transaction (e.g., category or source).
 * @param {string} [props.icon] - Optional URL for a custom icon.
 * @param {string} props.date - The formatted date of the transaction.
 * @param {number | string} props.amount - The amount of the transaction.
 * @param {'income' | 'expense'} props.type - The type of transaction, which controls the styling.
 * @param {boolean} [props.hideDeleteBtn] - If true, the delete button will be hidden.
 * @param {Function} [props.onDelete] - A callback function to be executed when the delete button is clicked.
 */
const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  /**
   * A helper function to determine the CSS classes for the amount display based on the transaction type.
   * @returns {string} - The Tailwind CSS classes for styling.
   */
  const getAmountStyles = () =>
    type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

  return (
    // The main container. The "group" class from Tailwind CSS allows child elements
    // to change their style when this parent div is hovered.
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/50">
      {/* Icon section */}
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {/* If a custom `icon` URL is provided, display it. Otherwise, show a default placeholder icon. */}
        {icon ? <img className="w-6 h-6" src={icon} /> : <LuUtensils />}
      </div>

      {/* Main content section */}
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-500 mt-1">{date}</p>
        </div>

        {/* Actions and Amount section */}
        <div className="flex items-center gap-2">
          {/* The delete button is only rendered if `hideDeleteBtn` is not true. */}
          {!hideDeleteBtn && (
            <button
              // This button is invisible by default (`opacity-0`) and becomes visible (`group-hover:opacity-100`)
              // only when the parent "group" container is hovered over.
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          {/* Amount display, styled dynamically based on the transaction type. */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {/* Prepend "+" for income and "-" for expenses. */}
              {type === "income" ? "+" : "-"} ₹ {amount}
            </h6>
            {/* Show a trending-up icon for income and trending-down for expenses. */}
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
