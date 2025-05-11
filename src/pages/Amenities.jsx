import React from "react";
import amenitiesData from "../data/amenitiesData";
import HeroBanner from "../components/layout/HeroBanner";
const Amenities = () => {
  return (
    <section id="amenities" className="min-h-screen pt-[72px] bg-gray-100">
      <HeroBanner
        mainText={"시설 소개"}
        subText={"자연과 함께하는 편안한 공간, 한산펜션의 시설을 소개합니다."}
      />
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-yellow-900 mb-8">
            시설 소개
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenitiesData.map((spot, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300 hover:shadow-xl"
              >
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-yellow-800">
                    {spot.name}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm leading-relaxed whitespace-pre-line">
                    {spot.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
