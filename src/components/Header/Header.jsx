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
  const [userProfile, setUserProfile] = useState(null);

  // 컴포넌트 마운트 시, 세션 스토리지에서 jwtToken 확인
  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    const profile = sessionStorage.getItem("userProfile");
    if (token) {
      setIsLoggedIn(true);
      setUserProfile(JSON.parse(profile)); // 프로필 정보도 세션에서 불러옴
    }
  }, []);

  // 로그아웃 처리
  const handleLogout = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("userProfile");
    setIsLoggedIn(false);
    setUserProfile(null); // 프로필 정보도 초기화
  };

  // 로그인 상태 변경
  const handleLoginStatusChange = (status) => {
    setIsLoggedIn(status);
  };

  // userProfile 설정 함수 (KaKaoLoginButton에서 호출)
  const setUserProfileInfo = (profile) => {
    setUserProfile(profile);
    sessionStorage.setItem("userProfile", JSON.stringify(profile)); // 세션 스토리지에 프로필 저장
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-yellow-800 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-18 items-center justify-between">
          {/* 모바일 메뉴 버튼 */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <MobileMenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>

          {/* 로고와 메뉴 링크 */}
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

          {/* 로그인 상태에 따른 메뉴 렌더링 */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLoggedIn ? (
              <UserMenu
                onLogout={handleLogout} // 로그아웃 처리 함수 전달
                userProfile={userProfile}
              />
            ) : (
              <KaKaoLoginButton
                onLoginStatusChange={handleLoginStatusChange}
                setUserProfile={setUserProfileInfo} // 로그인 후 프로필 설정
              />
            )}
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 표시 */}
      {menuOpen && <MobileMenu menu={menuData} setMenuOpen={setMenuOpen} />}
    </nav>
  );
};

export default Header;
