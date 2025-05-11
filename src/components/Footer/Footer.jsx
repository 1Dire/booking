import Logo from "../Header/Logo";
import menuData from "@/data/menuData";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-yellow-800 text-gray-200 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* 로고 */}
        <div className="flex justify-start">
          <Logo />
        </div>

        {/* 정보 섹션 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
          {/* 메뉴 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Menu</h3>
            <ul className="space-y-2">
              {menuData.map((value, index) => {
                return (
                  <li key={index}>
                    <Link className="hover:underline" to={value.path}>
                      {value.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p>주소: 경상남도 통영시 한산면 하소리 28-9</p>
            <p>대표자: 백연희</p>
            <p>연락처: 010-4502-6342 / 010-3877-6342</p>
            <p>사업자등록번호: 272-18-00385</p>
          </div>

          {/* 은행 정보 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">BANK INFO</h3>
            <p>농협: 352-0412-0485-43</p>
            <p>예금주: 백연희</p>
          </div>
        </div>

        {/* 하단 카피라이트 */}
        <div className="text-left text-sm text-gray-400 mt-6">
          COPYRIGHT © 한산펜션. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
