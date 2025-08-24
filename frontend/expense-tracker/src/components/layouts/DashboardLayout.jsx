import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

/**
 * A layout component that wraps dashboard pages, providing a consistent
 * Navbar and SideMenu structure.
 *
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.children - The main content of the page to be rendered inside the layout.
 * @param {string} props.activeMenu - The name of the currently active menu, passed down to navigation components.
 */
const DashboardLayout = ({ children, activeMenu }) => {
  // Access the current user's data from the global context.
  const { user } = useContext(UserContext);

  return (
    <div className="">
      {/* The top navigation bar is always visible. */}
      <Navbar activeMenu={activeMenu} />

      {/*
       * The main content of the dashboard (sidebar and page content) is only rendered
       * if a user object exists. This prevents the dashboard from flashing on screen
       * before the user's authentication status is confirmed.
       */}
      {user && (
        <div className="flex">
          {/* --- Desktop Sidebar --- */}
          {/* This container for the SideMenu is hidden on screens narrower than 1080px.
            On smaller screens, the sidebar is toggled via the Navbar's hamburger menu.
          */}
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* --- Main Page Content Area --- */}
          {/* The `grow` class makes this div expand to fill the remaining horizontal space. */}
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
