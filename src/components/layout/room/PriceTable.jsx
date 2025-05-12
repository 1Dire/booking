import React, { useEffect } from "react";
import { HiOutlineCash } from "react-icons/hi";
const PriceTable = ({ data }) => {
  return (
    <>
      <span className="flex items-center gap-1 text-yellow-600">
        <HiOutlineCash className="w-6 h-6" />
        <span className="text-sm/6 font-medium">가격</span>
      </span>
      <div className="grid grid-cols-4 text-sm text-gray-700 font-semibold mt-2">
        <span className="bg-yellow-900 text-yellow-300  text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm  text-center">
          비성수기
        </span>
        <span className="bg-yellow-900 text-yellow-300  text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm text-center">
          주말
        </span>
        <span className="bg-yellow-900 text-yellow-300  text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm text-center">
          성수기
        </span>
        <span className="bg-yellow-900 text-yellow-300  text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm text-center">
          준성수기
        </span>
      </div>
      <div className="grid grid-cols-4 text-sm text-gray-900 mt-1">
        <div className="text-center">
          {data?.priceOffPeak?.toLocaleString() ?? "-"} 원
        </div>
        <div className="text-center">
          {data?.priceWeekend?.toLocaleString() ?? "-"} 원
        </div>
        <div className="text-center">
          {data?.pricePeak?.toLocaleString() ?? "-"} 원
        </div>
        <div className="text-center">
          {data?.priceShoulder?.toLocaleString() ?? "-"} 원
        </div>
      </div>
    </>
  );
};

export default PriceTable;
