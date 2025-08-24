import React from "react";
import { getInitials } from "../../utils/helper";

/**
 * A reusable avatar component that displays the initials of a user's full name.
 * The size and style of the avatar are customizable via props.
 *
 * @param {object} props - The component's props.
 * @param {string} props.fullName - The full name of the user to generate initials from.
 * @param {string} [props.width="w-12"] - Optional Tailwind CSS class for the avatar's width. Defaults to "w-12".
 * @param {string} [props.height="h-12"] - Optional Tailwind CSS class for the avatar's height. Defaults to "h-12".
 * @param {string} [props.style=""] - Optional string for any additional custom CSS classes.
 */
const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    // The main container for the avatar.
    <div
      // The CSS classes are constructed dynamically.
      // It uses the provided props for width, height, and style, or applies default values if they are not provided.
      // The other classes center the content, make the avatar circular, and set its colors and font style.
      className={`${width || "w-12"} ${height || "h-12"} ${
        style || ""
      } flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}
    >
      {/*
       * The content of the avatar.
       * It calls the `getInitials` helper function to generate the initials from the `fullName` prop.
       * `fullName || ""` ensures that an empty string is passed if the prop is undefined, preventing errors.
       */}
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;
