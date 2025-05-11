import React, { useState, useEffect } from "react";
import MobileMenuButton from "./MobileMenuButton";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import menuData from "@/data/menuData";
import { Link } from "react-router-dom";
import KaKaoLoginButton from "../util/Kakao/KaKaoLoginButton";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-yellow-800 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-18 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <MobileMenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex justify-center">
              <NavLinks menu={menuData} />
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLoggedIn ? (
              <UserMenu onLogout={() => {
                localStorage.removeItem("jwtToken");
                setIsLoggedIn(false);
              }} />
            ) : (
               <KaKaoLoginButton onLoginStatusChange={setIsLoggedIn} />
            )}
          </div>
        </div>
      </div>

      {menuOpen && <MobileMenu menu={menuData} />}
    </nav>
  );
};

export default Header;
