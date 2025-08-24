import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data.js";
import CharAvatar from "../Cards/CharAvatar.jsx";

/**
 * The sidebar navigation menu for the dashboard.
 *
 * @param {object} props - The component's props.
 * @param {string} props.activeMenu - The label of the currently active menu item, used for styling.
 */
const SideMenu = ({ activeMenu }) => {
  // Access the global user state and the `clearUser` function from the context.
  const { user, clearUser } = useContext(UserContext);
  // Hook from React Router for programmatic navigation.
  const navigate = useNavigate();

  /**
   * Handles clicks on any menu item.
   * @param {string} route - The path to navigate to, or "logout".
   */
  const handleClick = (route) => {
    // If the route is "logout", call the specific logout handler.
    if (route === "logout") {
      handleLogout();
      return;
    }
    // Otherwise, navigate to the specified route.
    navigate(route);
  };

  /**
   * Handles the complete logout process.
   */
  const handleLogout = () => {
    // 1. Clear all data from local storage (including the auth token).
    localStorage.clear();
    // 2. Clear the user data from the global context.
    clearUser();
    // 3. Redirect the user to the login page.
    navigate("/login");
  };

  return (
    // The main container for the side menu. `sticky top-[61px]` makes it stay in place during scroll, below the navbar.
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      {/* --- User Profile Section --- */}
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {/* Conditionally render the user's avatar. */}
        {user?.profileImageUrl ? (
          // If a profile image URL exists, display the image.
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile"
            className="w-20 h-20 bg-slate-400 rounded-full object-cover"
          />
        ) : (
          // Otherwise, fall back to the CharAvatar component which shows initials.
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="text-gray-950 text-xl font-semibold leading-6">
          {user?.fullName || ""}
        </h5>
      </div>

      {/* --- Navigation Links --- */}
      {/* Map over a data array to dynamically generate the menu items. */}
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          // The styling of the button is determined dynamically.
          className={`w-full flex items-center gap-4 text-[15px] ${
            // If `activeMenu` matches the item's label, apply active styles.
            activeMenu === item.label ? "text-white bg-primary" : "text-black"
          } py-3 px-6 rounded-lg mb-3 cursor-pointer active:opacity-70 ${
            // Conditionally apply a hover effect only for inactive items.
            activeMenu === item.label ? "" : "hover:bg-purple-100"
          }`}
          onClick={() => handleClick(item.path)}
        >
          {/* Render the icon component stored in the data array. */}
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
