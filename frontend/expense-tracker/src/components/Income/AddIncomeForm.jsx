import React, { useState } from "react";
import EmojiPickerPopUp from "../EmojiPickerPopUp.jsx";
import Input from "../Inputs/Input.jsx";

/**
 * A form component for adding a new income entry.
 * It captures the source, amount, date, and an optional icon for the income.
 *
 * @param {object} props - The component's props.
 * @param {Function} props.onAddIncome - A callback function that is executed when the form is submitted.
 * It receives the complete income state object as its argument.
 */
const AddIncomeForm = ({ onAddIncome }) => {
  // A single state object to hold all the form's data.
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  /**
   * A generic handler function to update the `income` state.
   * It uses a key to dynamically update the corresponding property in the state object.
   * @param {string} key - The property of the income state to update (e.g., 'source', 'amount').
   * @param {*} value - The new value for the property.
   */
  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div>
      {/* Component for selecting an emoji as an icon. */}
      <EmojiPickerPopUp
        icon={income.icon} // Pass the current icon for display.
        // When an icon is selected, update the 'icon' property in the state.
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      {/* Reusable input component for the income source. */}
      <Input
        value={income.source} // The input's value is controlled by the state.
        // On change, update the 'source' property in the state.
        onChange={({ target }) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, Bonds, etc."
        type="text"
      />

      {/* Input for the amount. */}
      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="2000"
        type="number"
      />

      {/* Input for the date. */}
      <Input
        value={income.date}
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
          // When clicked, call the `onAddIncome` function passed from the parent,
          // sending the entire current `income` state object.
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;