import React from "react";

const RoomImages = () => {
  return (
    <>
      <div className="rounded-lg flex items-center justify-center h-32 col-span-2">
        {/* 첫 번째 이미지 */}
        <img
          src="https://picsum.photos/600/400"
          alt="랜덤 이미지 1"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="rounded-lg flex items-center justify-center h-32">
        {/* 두 번째 이미지 */}
        <img
          src="https://picsum.photos/600/401"
          alt="랜덤 이미지 2"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="rounded-lg flex items-center justify-center h-32">
        {/* 세 번째 이미지 */}
        <img
          src="https://picsum.photos/600/402"
          alt="랜덤 이미지 3"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </>
  );
};

export default RoomImages;
