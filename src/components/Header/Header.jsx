import React from "react";
import logo from "../../assets/logo3.png";
import { NavLink, Link } from "react-router";

export default function Header() {
    const linkClass = ({ isActive }) =>
    `block py-2 pr-4 text-xl pl-3 duration-200 border-b border-gray-100 hover:underline lg:hover:bg-transparent lg:border-0 lg:p-0 ${
      isActive ? "underline" : ""
    }`;
  return (
    <>
      <div className="fixed bg-[#212121] top-0 left-0 w-full flex  items-center justify-between border-b-2 border-amber-50 pb-2">
        <div className="flex text-white font-bold text-3xl mt-3 gap-2">
          <img src={logo} className="w-11 ml-10 " alt="logo" />
          <h1>RESUME BANALE</h1>
        </div>
        <div className="text-white">
          <ul className="flex gap-20 mr-10 ">
            <li>
              <NavLink
                to="/"
                className={linkClass}
                
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/builder"
                className= {linkClass}
              >
                Builder
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pricing"
                className= {linkClass}
              >
                Pricing
              </NavLink>
            </li>
            
          </ul>
        </div>
      </div>
    </>
  );
}
