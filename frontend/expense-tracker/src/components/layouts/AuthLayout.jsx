import React from "react";
import CARD_2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

/**
 * A responsive two-column layout for authentication pages.
 *
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.children - The content to be rendered in the main area (e.g., a login or signup form).
 */
const AuthLayout = ({ children }) => {
  return (
    // The main flex container that creates the two-column structure.
    <div className="flex">
      {/* 1. Left Column (Main Content Area) */}
      {/* This column is full-width on small screens and 60% width on medium screens and up. */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        {/* The app logo */}
        <span className="flex">
          <h2 className="text-2xl font-semibold text-black">Money</h2>
          <h2 className="text-2xl font-semibold text-purple-700">Map</h2>
        </span>

        {/* This is where the specific page content (e.g., the Login form) will be rendered. */}
        {children}
      </div>

      {/* 2. Right Column (Decorative Sidebar) */}
      {/* This column is hidden on small screens (`hidden`) and visible on medium screens and up (`md:block`). */}
      <div className="hidden md:block w-[40vw] h-screen bg-violet-100 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        {/* These are abstract decorative shapes positioned absolutely. */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5" />

        {/* This grid holds the content that appears on top of the background and shapes. */}
        <div className="grid grid-cols-1 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income and Expenses"
            value="4,30,000"
            color="bg-primary"
          />
        </div>

        {/* A decorative image positioned at the bottom. */}
        <img
          src={CARD_2}
          className="rounded-[18px] w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15"
          alt="Decorative card"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

/**
 * A reusable card component for displaying a single statistic.
 *
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.icon - The icon to be displayed.
 * @param {string} props.label - The descriptive label for the value.
 * @param {string | number} props.value - The value to be displayed.
 * @param {string} props.color - A Tailwind CSS class for the icon's background color.
 */
const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    // The main container for the card. `z-10` ensures it sits above the background but below other elements if needed.
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shaodw-purple-400/10 border border-gray-200/50 z-10">
      {/* The circular container for the icon. */}
      <div
        // The background color is set dynamically using the `color` prop.
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>

      {/* The container for the text content. */}
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">₹{value}</span>
      </div>
    </div>
  );
};
