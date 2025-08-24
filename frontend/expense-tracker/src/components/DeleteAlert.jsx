import React from "react";

/**
 * A reusable alert component to confirm a delete action.
 * It displays a confirmation message and a "Delete" button.
 *
 * @param {object} props - The component's props.
 * @param {string} props.content - The confirmation message to display to the user (e.g., "Are you sure?").
 * @param {Function} props.onDelete - The callback function to be executed when the "Delete" button is clicked.
 */
const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      {/* Displays the confirmation message passed via the `content` prop. */}
      <p className="text-sm">{content}</p>

      {/* Container for the action button, aligned to the right. */}
      <div className="flex justify-end mt-6">
        {/* The "Delete" button triggers the action. */}
        <button
          className="add-btn add-btn-fill"
          type="button"
          // The `onClick` event is directly tied to the `onDelete` function
          // passed down from the parent component.
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
