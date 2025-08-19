import React from "react";
import { Link } from "react-router-dom";

const NavLinks = ({ menu }) => (
  <div className="flex space-x-4">
    {menu.map((value, index) => {
      return (
        <Link
          key={index}
          to={value.path}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            value.text === ""
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-blue-700 hover:text-white"
          }`}
        >
          {value.text}
        </Link>
      );
    })}
  </div>
);

export default NavLinks;
