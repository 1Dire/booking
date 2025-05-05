import React from "react";

const PriceTable = ({ price }) => {
  return (
    <>
      <span className="flex items-center gap-1 text-yellow-600">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
          />
        </svg>
        <span className="text-sm/6 font-medium">가격</span>
      </span>
      <div className="grid grid-cols-4 text-sm text-gray-700 font-semibold mt-2">
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300 text-center">
          비성수기
        </span>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300 text-center">
          주말
        </span>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300 text-center">
          성수기
        </span>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300 text-center">
          준성수기
        </span>
      </div>
      <div className="grid grid-cols-4 text-sm text-gray-900 mt-1">
        <div className="text-center">
          {price?.offPeak?.toLocaleString() ?? "-"} 원
        </div>
        <div className="text-center">
          {price?.weekend?.toLocaleString() ?? "-"} 원
        </div>
        <div className="text-center">
          {price?.peak?.toLocaleString() ?? "-"} 원
        </div>
        <div className="text-center">
          {price?.shoulder?.toLocaleString() ?? "-"} 원
        </div>
      </div>
    </>
  );
};

export default PriceTable;
