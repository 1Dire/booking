import React from "react";
import PriceTable from "@/components/layout/room/PriceTable";
import RoomImages from "@/components/layout/room/RoomImages";
import RoomInfo from "@/components/layout/room/RoomInfo";

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
          <PriceTable price={data.price} />
        </div>

        <div className="mt-5">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-yellow-700 px-3 py-2 text-sm font-bold text-white"
          >
            <span>예약</span>
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default RoomList;
