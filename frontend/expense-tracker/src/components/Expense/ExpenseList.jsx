import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

/**
 * A component that displays a list of expense transactions.
 * It's a "presentational" component, meaning it receives all its data and
 * functions to handle actions via props.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.transactions - An array of expense transaction objects to display.
 * @param {Function} props.onDelete - A callback function to handle the deletion of a transaction. It receives the transaction ID.
 * @param {Function} props.onDownload - A callback function to handle the download action.
 */
const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    // The main container for the list, styled as a "card".
    <div className="card">
      {/* Header section with the title and a download button. */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg">All Expense</h5>

        {/* The download button triggers the `onDownload` function from the parent. */}
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      {/* Grid container for the list of transactions. */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/*
         * Map over the `transactions` array to render a card for each item.
         * The optional chaining (`?.`) prevents errors if `transactions` is null or undefined.
         */}
        {transactions?.map((expense) => (
          // Use a reusable card component to display individual transaction details.
          <TransactionInfoCard
            // The `key` prop is crucial for React's list rendering performance.
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            // Format the date for better readability using the moment.js library.
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            // The `type` prop can be used for conditional styling within the card (e.g., using red for expenses).
            type="expense"
            // Pass a function to the card's `onDelete` prop. When called,
            // it executes the parent's `onDelete` function with this specific expense's ID.
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
