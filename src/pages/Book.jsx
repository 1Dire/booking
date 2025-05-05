import React from "react";
import RoomList from "@/components/layout/room/RoomList";
import roomData from "@/data/roomData";
import RoomNotice from "@/components/layout/room/RoomNotice";

const Book = () => {
  return (
    <section id="book" className="h-screen pt-[72px]">
      {/* Hero Section (상단 배경 이미지) */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://picsum.photos/1200/600')", // 랜덤 배경 이미지 URL
        }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
        <div className="relative text-center text-white py-24">
          <h1 className="text-4xl font-extrabold">예약 안내</h1>
          <p className="mt-4 text-xl">편안한 휴식, 지금 예약하세요.</p>
        </div>
      </div>

      {/* 방 예약 섹션 */}
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RoomNotice />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roomData.map((data, index) => (
              <RoomList key={index} data={data} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
