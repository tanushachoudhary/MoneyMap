import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

/**
 * A reusable, controlled input component with a special feature for password visibility.
 *
 * @param {object} props - The component's props.
 * @param {string} props.value - The current value of the input, controlled by the parent.
 * @param {Function} props.onChange - A callback function that is called when the input's value changes.
 * @param {string} props.label - The text for the input's label.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {string} props.type - The type of the input (e.g., "text", "password", "number").
 */
const Input = ({ value, onChange, label, placeholder, type }) => {
  // Local state to track whether the password should be visible.
  // This state is only relevant if the input `type` is "password".
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Toggles the `showPassword` state between true and false.
   */
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {/* The label for the input field. */}
      <label className="text-[13px] dark:text-white text-slate-800">
        {label}
      </label>

      {/* A wrapper for the input and the optional visibility toggle icon. */}
      <div className="input-box">
        <input
          // This is the core logic for the password toggle.
          // If the prop `type` is "password", we then check our local `showPassword` state.
          // If `showPassword` is true, we render the input as `type="text"` (visible).
          // Otherwise, we render it as `type="password"` (masked).
          // For any other prop `type`, we just use it directly.
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {/* --- Password Visibility Toggle Icon --- */}
        {/* This entire block is only rendered if the input `type` is "password". */}
        {type === "password" && (
          <>
            {/* We conditionally render either the "open eye" or "slashed eye" icon based on the `showPassword` state. */}
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={toggleShowPassword} // Call the toggle function on click.
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={toggleShowPassword} // Call the toggle function on click.
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
