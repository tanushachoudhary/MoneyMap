import React from "react";
import { LuX } from "react-icons/lu";

/**
 * A reusable, general-purpose modal component.
 * It provides a consistent structure with a header, title, close button, and content area.
 * The visibility and content of the modal are controlled by props.
 *
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal's body.
 * @param {boolean} props.isOpen - A boolean that determines if the modal is visible or not.
 * @param {Function} props.onClose - A callback function that is triggered when the close button is clicked.
 * @param {string} props.title - The text to be displayed in the modal's header.
 */
const Modal = ({ children, isOpen, onClose, title }) => {
  // If the `isOpen` prop is false, the component renders nothing (it returns null).
  // This is the primary mechanism for showing and hiding the modal.
  if (!isOpen) return null;

  return (
    // 1. Modal Overlay/Backdrop
    // This is the semi-transparent background that covers the entire screen.
    // `fixed` positioning and a high `z-index` (z-50) ensure it sits on top of all other content.
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50">
      
      {/* 2. Modal Container */}
      {/* This div centers the modal content and sets a maximum width and height. */}
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        
        {/* 3. Modal Content Wrapper */}
        {/* This is the actual visible "card" of the modal with the background, border-radius, and shadow. */}
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          
          {/* 4. Modal Header */}
          {/* This section contains the title and the close button, separated by a bottom border. */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            {/* The title is rendered from the `title` prop. */}
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>

            {/* The close button. */}
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              // Its `onClick` event is wired to the `onClose` function passed in via props.
              onClick={onClose}
            >
              <LuX size={16} strokeWidth={3} />
            </button>
          </div>
          
          {/* 5. Modal Body */}
          {/* This is where the content passed as `children` is rendered. */}
          <div className="p-4 md:p-5 space-y-4 dark:text-gray-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;