
import React from 'react';
import { HiBars3, HiXMark } from 'react-icons/hi2'; // Heroicons from react-icons

const MobileMenuButton = ({ menuOpen, setMenuOpen }) => (
  <button
    type="button"
    onClick={() => setMenuOpen(!menuOpen)}
    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-yellow-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
    aria-controls="mobile-menu"
    aria-expanded={menuOpen}
  >
    <span className="absolute -inset-0.5"></span>
    <span className="sr-only">Open main menu</span>
    {menuOpen ? (
      <HiXMark className="block size-6" />
    ) : (
      <HiBars3 className="block size-6" />
    )}
  </button>
);

export default MobileMenuButton;
