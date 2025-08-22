import React, { useState } from "react";
import { HiOutlineX, HiOutlineMenu } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="flex gap-6 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button
        className="text-2xl text-slate-800 block lg:hidden cursor-pointer"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
      <span className="flex lg:ml-12">
        <h2 className="text-2xl font-semibold text-black">Money</h2>
        <h2 className="text-2xl font-semibold text-purple-700">Map</h2>
      </span>
      {/* <h2 className="">Expense Tracker</h2> */}
      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
