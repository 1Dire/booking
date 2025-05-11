// src/pages/Directions.jsx
import React from "react";
import KaKaoMap from "../components/util/Kakao/KaKaoMap";
import MapNotice from "../components/layout/map/MapNotice";
import HeroBanner from "../components/layout/HeroBanner";
const Directions = () => {
  return (
    <section id="location" className="pt-[72px] bg-gray-50">
      <HeroBanner
        mainText={"오시는 길"}
        subText={"저희 숙소로 찾아오는 방법을 안내해드립니다."}
      />
      {/* 지도와 상세 정보 */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-xl border border-gray-200">
          {/* 지도 */}
          <KaKaoMap />

          {/* 정보 */}
          <div className="mt-8">
            <MapNotice />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Directions;
