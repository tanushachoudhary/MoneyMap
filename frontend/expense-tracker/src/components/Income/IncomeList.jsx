import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

/**
 * A component that displays a list of income transactions.
 * It is a "presentational" component that receives data and functions via props.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.transactions - An array of income transaction objects to display.
 * @param {Function} props.onDelete - A callback function to handle the deletion of a transaction. It receives the transaction ID.
 * @param {Function} props.onDownload - A callback function to handle the download action.
 */
const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    // The main container for the list, styled as a "card".
    <div className="card">
      {/* Header section with the title and a download button. */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Sources</h5>

        {/* The download button triggers the `onDownload` function passed from the parent. */}
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
        {transactions?.map((income) => (
          // Use a reusable card component to display individual transaction details.
          <TransactionInfoCard
            // The `key` prop is essential for React's list rendering optimization.
            key={income._id}
            title={income.source}
            icon={income.icon}
            // Format the date for better readability using moment.js.
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            // The `type` prop can be used for conditional styling within the card.
            type="income"
            // Pass a function to the card's `onDelete` prop. When called,
            // it executes the parent's `onDelete` function with this specific income's ID.
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
