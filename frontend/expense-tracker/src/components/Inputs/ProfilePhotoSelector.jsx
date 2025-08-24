import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

/**
 * A component for selecting and previewing a profile photo.
 *
 * @param {object} props - The component's props.
 * @param {File | null} props.image - The currently selected image file object, managed by the parent component.
 * @param {Function} props.setImage - A function to update the image state in the parent component.
 */
const ProfilePhotoSelector = ({ image, setImage }) => {
  // `useRef` creates a direct reference to the hidden file input DOM element.
  // This allows us to programmatically trigger its `click` event.
  const inputRef = useRef(null);
  // State to store a temporary URL for the selected image, used for the preview.
  const [previewUrl, setPreviewUrl] = useState(null);

  /**
   * Handles the file selection event from the hidden input.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
   */
  const handleImageChange = (event) => {
    // Get the first file selected by the user.
    const file = event.target.files[0];
    if (file) {
      // 1. Lift the file object up to the parent component's state.
      setImage(file);

      // 2. Create a temporary local URL for the file to generate a preview.
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  /**
   * Clears the selected image and its preview.
   */
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  /**
   * Programmatically clicks the hidden file input to open the file selection dialog.
   */
  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      {/* This is the actual file input, but it's hidden from the user. Its functionality is triggered by our custom button. */}
      <input
        type="file"
        accept="image/*" // Restrict file selection to images only.
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Conditionally render the UI based on whether an image has been selected. */}
      {!image ? (
        // --- UI for when NO image is selected ---
        <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full cursor-pointer relative">
          <LuUser className="text-4xl text-primary" />
          {/* This button triggers the hidden file input. */}
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute cursor-pointer -bottom-1 -right-1"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        // --- UI for when an image IS selected ---
        <div className="relative">
          {/* Display the image preview using the temporary URL. */}
          <img
            src={previewUrl}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />
          {/* This button removes the selected image. */}
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer text-xl"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
