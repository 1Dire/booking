import { useEffect, useState } from "react";
import RoomList from "@/components/layout/room/RoomList";
import RoomNotice from "@/components/layout/room/RoomNotice";
import HeroBanner from "@/components/layout/HeroBanner";
import { getAllRooms } from "@/api/room";
const Book = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getAllRooms()
      .then(setRooms)
      .catch((err) => console.error("방 정보 불러오기 실패:", err));
  }, []);
  return (
    <section id="book" className="pt-[72px]">
      <HeroBanner
        mainText={"예약 안내"}
        subText={"편안한 휴식, 지금 예약하세요."}
      />
      {/* 방 목록 영역 */}
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-xl border border-gray-200">
          <RoomNotice />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rooms.map((room) => (
              <RoomList key={room.id ?? room.name} data={room} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
