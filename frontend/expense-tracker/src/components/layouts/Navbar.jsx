import React, { useState } from "react";
import { HiOutlineX, HiOutlineMenu } from "react-icons/hi";
import SideMenu from "./SideMenu";

/**
 * The main top navigation bar for the application.
 * It is responsive and includes a toggle for a mobile-friendly side menu.
 *
 * @param {object} props - The component's props.
 * @param {string} props.activeMenu - The name of the currently active menu item, used to highlight it in the side menu.
 */
const Navbar = ({ activeMenu }) => {
  // State to control the visibility of the side menu on smaller screens.
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    // The main navbar container. `sticky top-0 z-30` makes it stick to the top during scroll.
    <div className="flex gap-6 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      {/* --- Hamburger Menu Button (Mobile/Tablet View) --- */}
      {/* This button is visible by default (`block`) but hidden on large screens and up (`lg:hidden`). */}
      <button
        className="text-2xl text-slate-800 block lg:hidden cursor-pointer"
        // Clicking the button toggles the side menu's visibility.
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {/* Conditionally render a "close" (X) or "open" (hamburger) icon based on the state. */}
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      {/* The application logo. */}
      <span className="flex lg:ml-12">
        <h2 className="text-2xl font-semibold text-black">Money</h2>
        <h2 className="text-2xl font-semibold text-purple-700">Map</h2>
      </span>

      {/* --- Mobile Side Menu --- */}
      {/* This block is conditionally rendered. It only appears in the DOM if `openSideMenu` is true. */}
      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          {/* Render the SideMenu component. */}
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
