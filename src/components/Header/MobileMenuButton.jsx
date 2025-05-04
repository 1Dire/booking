import React from 'react';

const MobileMenuButton = ({ menuOpen, setMenuOpen }) => (
  <button
    type="button"
    onClick={() => setMenuOpen(!menuOpen)}
    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
    aria-controls="mobile-menu"
    aria-expanded={menuOpen}
  >
    <span className="absolute -inset-0.5"></span>
    <span className="sr-only">Open main menu</span>
    {menuOpen ? (
      <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    ) : (
      <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    )}
  </button>
);

export default MobileMenuButton;
