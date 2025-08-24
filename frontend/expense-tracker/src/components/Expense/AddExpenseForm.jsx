import React, { useState } from "react";
import EmojiPickerPopUp from "../EmojiPickerPopUp";
import Input from "../Inputs/Input";

/**
 * A form component for adding a new expense entry.
 * It captures the category, amount, date, and an optional icon for the expense.
 *
 * @param {object} props - The component's props.
 * @param {Function} props.onAddExpense - A callback function that is executed when the form is submitted.
 * It receives the complete expense state object as its argument.
 */
const AddExpenseForm = ({ onAddExpense }) => {
  // A single state object to hold all the form's data.
  // Note: The state is named 'income', but 'expense' would be more descriptive for clarity.
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  /**
   * A generic handler function to update the expense state.
   * It uses a key to dynamically update the corresponding property in the state object.
   * @param {string} key - The property of the expense state to update (e.g., 'category', 'amount').
   * @param {*} value - The new value for the property.
   */
  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  return (
    <div>
      {/* Component for selecting an emoji as an icon. */}
      <EmojiPickerPopUp
        icon={expense.icon} // Pass the current icon for display.
        // When an icon is selected, update the 'icon' property in the state.
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      {/* Reusable input component for the expense category. */}
      <Input
        value={expense.category} // The input's value is controlled by the state.
        // On change, update the 'category' property in the state.
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder="Rent, Groceries, etc."
        type="text"
      />

      {/* Input for the amount. */}
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="1200"
        type="number"
      />

      {/* Input for the date. */}
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      {/* Container for the submit button. */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          // When clicked, call the `onAddExpense` function passed from the parent,
          // sending the entire current expense state object.
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
