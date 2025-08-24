import React from "react";
import moment from "moment";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

/**
 * A component that displays a preview list of recent income transactions.
 * It is meant for a dashboard or overview page.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.transactions - An array of income transaction objects to display.
 * @param {Function} props.onSeeMore - A callback function to be triggered when the "See All" button is clicked.
 */
const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    // The main container for the component, styled as a "card".
    <div className="card">
      {/* Header section with the title and a "See All" button. */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income</h5>

        <button className="card-btn cursor-pointer" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* Container for the list of transactions. */}
      <div className="mt-6">
        {/*
         * Map over the `transactions` array to render a card for each item.
         * The optional chaining (`?.`) handles cases where transactions might be undefined.
         * The `.slice(0, 5)` method ensures that only the first 5 transactions are shown.
         */}
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            // The `key` prop is essential for React's list rendering performance.
            key={item._id}
            title={item.source}
            icon={item.icon}
            // Format the date for better readability using the moment.js library.
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            // The `type` prop is used for conditional styling, like text color or icons.
            type="income"
            // This prop is passed to the child component to hide its delete button, as it's just a preview.
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;
