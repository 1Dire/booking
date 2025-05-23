// src/components/layout/UserMenu.jsx

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MypageModal from "@/components/layout/modal/MypageModal";

const UserMenu = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMypageModalOpen, setIsMypageModalOpen] = useState(false);
  
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const userProfile = useRef(null);
  try {
    const profile = sessionStorage.getItem("userProfile");
    userProfile.current = profile ? JSON.parse(profile) : null;
  } catch (e) {
    userProfile.current = null;
  }

  const handleClickOutside = useCallback((event) => {
    if (
      menuButtonRef.current &&
      !menuButtonRef.current.contains(event.target) &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userProfile");
    onLogout?.();
    navigate("/");
  };

  return (
    <>
      <div className="relative ml-3">
        <button
          type="button"
          onClick={toggleMenu}
          className="relative flex items-center rounded-full bg-gray-800 text-sm focus:outline-none cursor-pointer"
          id="user-menu-button"
          aria-expanded={menuOpen}
          aria-haspopup="true"
          ref={menuButtonRef}
        >
          {userProfile.current?.properties?.profile_image && (
            <img
              className="rounded-full border-2 border-white"
              src={userProfile.current.properties.profile_image}
              alt="Profile"
              width={40}
              height={40}
            />
          )}
        </button>

        {menuOpen && (
          <div
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white py-3 shadow-lg ring-1 ring-black/5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            ref={menuRef}
          >
            {userProfile.current && (
              <div className="px-4 py-2 text-sm text-gray-800 flex items-center">
                <span className="mr-2 text-sm text-gray-900 font-semibold">
                  {userProfile.current.properties.nickname}
                </span>
                <span className="text-xs text-gray-500">님 안녕하세요!</span>
              </div>
            )}
            <button
              className="block w-full text-left px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={() => setIsMypageModalOpen(true)}
            >
              마이 페이지
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>

      {isMypageModalOpen && (
        <MypageModal onClose={() => setIsMypageModalOpen(false)} />
      )}
    </>
  );
};

export default UserMenu;
