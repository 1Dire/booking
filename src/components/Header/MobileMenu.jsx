import React from "react";
import { Link } from "react-router-dom";
const MobileMenu = ({ menu }) => (
  <div className="sm:hidden" id="mobile-menu">
    <div className="space-y-1 px-2 pt-2 pb-3">
      {menu.map((value, index) => (
        <Link
          key={index}
          to={value.path}
          className={`block rounded-md px-3 py-2 text-base font-medium ${
            value.text === "Dashboard"
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          {value.text}
        </Link>
      ))}
    </div>
  </div>
);

export default MobileMenu;
