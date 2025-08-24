import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

/**
 * A component that displays an icon and opens an emoji picker pop-up when clicked.
 *
 * @param {object} props - The component's props.
 * @param {string} props.icon - The URL of the currently selected icon/emoji to display.
 * @param {Function} props.onSelect - A callback function that is triggered with the selected emoji's image URL.
 */
const EmojiPickerPopUp = ({ icon, onSelect }) => {
  // State to control the visibility of the emoji picker pop-up.
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      {/* 1. The Trigger Area */}
      {/* This section is always visible and acts as the button to open the picker. */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        // When clicked, it sets the `isOpen` state to true, revealing the picker.
        onClick={() => setIsOpen(true)}
      >
        {/* This div displays either the selected icon or a default placeholder. */}
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg">
          {icon ? (
            // If an `icon` URL is provided, display it as an image.
            <img src={icon} alt="Icon" className="w-12 h-12" />
          ) : (
            // Otherwise, show a default placeholder icon from react-icons.
            <LuImage />
          )}
        </div>
        {/* The text changes based on whether an icon is already selected. */}
        <p>{icon ? "Change Icon" : "Pick Icon"}</p>
      </div>

      {/* 2. The Emoji Picker Pop-up */}
      {/* This entire block is conditionally rendered. It only appears in the DOM if `isOpen` is true. */}
      {isOpen && (
        <div className="relative">
          {/* This button is intended to close the picker. Note: an onClick handler should be added. */}
          <button
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
            onClick={() => setIsOpen(false)} // Added onClick to close the picker
          >
            <LuX />
          </button>
          
          {/* The EmojiPicker component from the third-party library. */}
          <EmojiPicker
            open={isOpen}
            // The `onEmojiClick` prop is a callback that runs when a user selects an emoji.
            // It then calls the `onSelect` function passed into this component,
            // providing the `imageUrl` of the chosen emoji.
            onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopUp;