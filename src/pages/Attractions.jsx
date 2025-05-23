import React from "react";
import HeroBanner from "../components/layout/HeroBanner";
import spotData from "../data/spotData";
const Attractions = () => {
  

  return (
    <section id="attractions" className="min-h-screen pt-[72px] bg-gray-100">
      <HeroBanner mainText={"주변 관광"} subText={"자연이 어우러진 한산면의 관광 명소를 소개합니다."}/>
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-yellow-900 mb-8">
            한산면 관광 명소
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spotData.map((spot, index) => (
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

export default Attractions;
