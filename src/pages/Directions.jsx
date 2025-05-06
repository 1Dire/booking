// src/pages/Directions.jsx
import React from "react";
import KaKaoMap from "../components/util/Kakao/KaKaoMap";
import MapNotice from "../components/layout/map/MapNotice";

const Directions = () => {
  return (
    <section id="location" className="pt-[72px] bg-gray-50">
      {/* 배경 이미지 영역 */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <img
          src="https://picsum.photos/id/1015/1200/600"
          alt="지도 배경"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black opacity-40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 py-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-shadow-md">
            오시는 길
          </h1>
          <p className="mt-4 text-lg md:text-2xl font-medium text-shadow-md">
            저희 숙소로 찾아오는 방법을 안내해드립니다.
          </p>
        </div>
      </div>

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
