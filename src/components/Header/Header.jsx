import React, { useState } from "react";
import MobileMenuButton from "./MobileMenuButton";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import menuData from "@/data/menuData"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-18 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <MobileMenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Logo />
            </div>
            <div className="hidden sm:ml-6 sm:flex justify-center">
              <NavLinks menu={menuData} />
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <UserMenu />
          </div>
        </div>
      </div>

      {menuOpen && <MobileMenu menu={menuData} />}
    </nav>
  );
};

export default Header;
