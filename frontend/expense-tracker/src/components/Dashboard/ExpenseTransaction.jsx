import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

/**
 * A component to display a preview list of recent expense transactions.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.transactions - An array of expense transaction objects.
 * @param {Function} props.onSeeMore - A callback function to be triggered when the "See All" button is clicked, typically for navigation.
 */
const ExpenseTransaction = ({ transactions, onSeeMore }) => {
  return (
    // The main container for the component, styled as a "card".
    <div className="card">
      {/* Header section with the title and a "See All" button. */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expense</h5>

        <button className="card-btn cursor-pointer" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* Container for the list of transactions. */}
      <div className="mt-6">
        {/*
         * Conditionally render the list or a message.
         * First, check if the `transactions` array exists and has items.
         */}
        {transactions && transactions.length > 0 ? (
          // If there are transactions, create a preview by taking only the first 4 items.
          transactions
            ?.slice(0, 4)
            // Then, map over this shortened array to render a card for each transaction.
            ?.map((expense) => (
              <TransactionInfoCard
                key={expense._id}
                title={expense.category}
                icon={expense.icon}
                // Format the date for better readability.
                date={moment(expense.date).format("Do MMM YYYY")}
                amount={expense.amount}
                type={expense.type}
                // This prop tells the card component to hide its delete button,
                // as this is just a preview list.
                hideDeleteBtn
              />
            ))
        ) : (
          // If there are no transactions, display a fallback message.
          <p className="text-gray-500 text-sm">No recent expenses</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransaction;
