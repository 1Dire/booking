import React from "react";
import { HiOutlineCash } from "react-icons/hi";

const PriceTable = ({ data }) => {
  const priceList = [
    {
      label: "비성수기",
      value: data?.priceOffPeak,
      color: "text-sky-700",
      bg: "bg-sky-50",
    },
    {
      label: "주말",
      value: data?.priceWeekend,
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      label: "성수기",
      value: data?.pricePeak,
      color: "text-indigo-700",
      bg: "bg-indigo-50",
    },
    {
      label: "준성수기",
      value: data?.priceShoulder,
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="mt-3">
      <div className="flex items-center gap-1 text-blue-600 mb-2">
        <HiOutlineCash className="w-5 h-5" />
        <span className="text-sm font-medium">가격 정보</span>
      </div>

      <div className="divide-y divide-gray-200 border border-gray-400 rounded-md overflow-hidden text-sm">
        {priceList.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-4 py-2"
          >
            <span
              className={`px-2 py-0.5 rounded-md text-xs font-medium ${item.bg} ${item.color}`}
            >
              {item.label}
            </span>
            <span className="font-semibold text-gray-800">
              {item.value ? `${item.value.toLocaleString()} 원` : "-"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTable;