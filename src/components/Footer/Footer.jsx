import Logo from "../Header/Logo";
const Footer = () => {
  return (
    <footer className="bg-yellow-800 text-gray-200 py-10 px-4">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
      {/* 로고 */}
      <div className="mb-4 md:mb-0 mr-8">
        <Logo />
      </div>

      <div className="flex space-x-8 mb-4 md:mb-0 text-center md:text-left w-full justify-between">
        {/* 메뉴 */}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-2">Menu</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">예약안내</a></li>
            <li><a href="#" className="hover:underline">오시는길</a></li>
            <li><a href="#" className="hover:underline">주변관광</a></li>
          </ul>
        </div>

        {/* 연락처 */}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p>주소: 경상남도 통영시 한산면 하소리 28-9</p>
          <p>대표자: 백연희</p>
          <p>연락처: 010-4502-6342 / 010-3877-6342</p>
          <p>사업자등록번호: 272-18-00385</p>
        </div>

        {/* 은행 정보 */}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-2">BANK INFO</h3>
          <p>농협: 352-0412-0485-43</p>
          <p>예금주: 백연희</p>
        </div>
      </div>
    </div>

    {/* 하단 카피라이트 */}
    <div className="mt-10 text-center text-sm text-gray-400">
      COPYRIGHT © 한산펜션. ALL RIGHTS RESERVED.
    </div>
  </footer>
  );
};

export default Footer;
