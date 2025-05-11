import React from "react";

const HeroBanner = ({ mainText = "Null", subText = "Null" }) => {
  return (
    <div className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-gray-900">
      <img
        src="https://picsum.photos/id/1015/1200/600"
        alt="메인 배경"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold">{mainText}</h1>
        <p className="mt-4 text-lg md:text-2xl">{subText}</p>
      </div>
    </div>
  );
};

export default HeroBanner;
