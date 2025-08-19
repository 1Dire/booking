  import { Link } from "react-router-dom";
  import PriceTable from "@/components/layout/room/PriceTable";
  import RoomImages from "@/components/layout/room/RoomImages";
  import RoomInfo from "@/components/layout/room/RoomInfo";
  import { FaArrowRight } from "react-icons/fa";

  const RoomList = ({ data }) => {
    return (
      <>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="grid grid-cols-4 gap-2">
            <RoomImages />
          </div>

          <div className="mt-2">
            <RoomInfo data={data} />
          </div>

          <div className="mt-2">
            <PriceTable data={data} />
          </div>

          <div className="mt-5">
            <Link
              to={`/book/booking`} // Link로 이동할 URL 설정
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-bold text-white cursor-pointer hover:bg-blue-700 transition"
            >
              <span>이방 예약하기</span>
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </>
    );
  };

  export default RoomList;
