import React from "react";
import RoomList from "@/components/layout/room/RoomList";
import RoomNotice from "@/components/layout/room/RoomNotice";
import roomData from "@/data/roomData";

const Book = () => {
  return (
    <section id="book" className="pt-[72px]">
      {/* 헤더 이미지 영역 */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-gray-900">
        <img
          src="https://picsum.photos/id/1015/1200/600"
          alt="메인 배경"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold">예약 안내</h1>
          <p className="mt-4 text-lg md:text-2xl">편안한 휴식, 지금 예약하세요.</p>
        </div>
      </div>

      {/* 방 목록 영역 */}
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-xl border border-gray-200">
          <RoomNotice />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roomData.map((room) => (
              <RoomList key={room.id ?? room.name} data={room} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
