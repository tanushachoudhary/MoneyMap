import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard.jsx";

/**
 * A component to display a preview list of recent transactions (both income and expense).
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.transactions - An array of transaction objects. Each object should have a 'type' property.
 * @param {Function} props.onSeeMore - A callback function triggered when the "See All" button is clicked.
 */
const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    // The main container for the component, styled as a "card".
    <div className="card">
      {/* Header section with the title and a "See All" navigation button. */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>

        <button className="card-btn cursor-pointer" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* Container for the list of transactions. */}
      <div className="mt-6">
        {/*
         * First, check if the `transactions` array exists and has items.
         * This prevents errors and allows for a fallback UI.
         */}
        {transactions && transactions.length > 0 ? (
          // If transactions exist, create a preview by taking only the first 5 items.
          transactions
            ?.slice(0, 5)
            // Then, map over this shortened array to render a card for each transaction.
            ?.map((item) => (
              <TransactionInfoCard
                key={item._id}
                // This is the key logic: It dynamically sets the title based on the transaction type.
                // If it's an 'expense', the title is the category. If it's 'income', the title is the source.
                title={item.type === "expense" ? item.category : item.source}
                icon={item.icon}
                // Format the date for better readability.
                date={moment(item.date).format("Do MMM YYYY")}
                amount={item.amount}
                type={item.type}
                // This prop hides the delete button on the card, as this is just a preview list.
                hideDeleteBtn
              />
            ))
        ) : (
          // If there are no transactions, display a user-friendly message.
          <p className="text-gray-500 text-sm">No recent transactions</p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
