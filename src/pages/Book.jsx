import { useEffect, useState } from "react";
import RoomList from "@/components/layout/room/RoomList";
import RoomNotice from "@/components/layout/room/RoomNotice";
import HeroBanner from "@/components/layout/HeroBanner";
import { getAllRooms } from "@/api/room";
import { useLoading } from "@/context/LoadingContext"; // 로딩 컨텍스트 임포트
import { Loder } from "@/components/util/Loder"; // 로딩 컴포넌트 임포트

const Book = () => {
  const [rooms, setRooms] = useState([]);
  const { setIsLoading } = useLoading(); // 로딩 상태를 설정하는 함수

  useEffect(() => {
    setIsLoading(true); // API 호출 시작 전 로딩 시작
    getAllRooms()
      .then((rooms) => {
        setRooms(rooms); // 방 정보 설정
        setIsLoading(false); // 로딩 끝
      })
      .catch((err) => {
        console.error("방 정보 불러오기 실패:", err);
        setIsLoading(false); // 로딩 끝
      });
  }, [setIsLoading]); // 컴포넌트 렌더링 시 useEffect 실행

  return (
    <section id="book" className="pt-[72px]">
      <HeroBanner
        mainText={"예약 안내"}
        subText={"편안한 휴식, 지금 예약하세요."}
      />

      <div
        className={`py-6 px-4 sm:px-6 lg:px-8 ${
          rooms.length === 0 ? "opacity-0" : ""
        }`}
      >
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
