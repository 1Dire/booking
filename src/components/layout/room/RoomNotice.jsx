import React from "react";

const RoomNotice = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-sm text-gray-800 space-y-6">
      {/* 요금 안내 */}
      <div className="flex items-center gap-4 p-6 border border-gray-200 rounded-lg shadow-sm">
        <svg
          className="w-7 h-7 text-yellow-600"
          xmlns="http://www.w3.org/2000/svg"
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
        <div>
          <h5 className="mb-2 text-2xl font-semibold text-gray-900">
            요금안내
          </h5>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>
              <span>
                기준인원 초과 시 1인당
                <span className="font-medium text-yellow-700">20,000원</span>
                추가요금 발생합니다.
              </span>
            </li>
            <li>
              <span>
                바베큐 이용 시 (숯, 그릴 제공){" "}
                <span className="font-medium text-yellow-700">20,000원</span>
                입니다.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* 시즌 안내 */}
      <div className="flex items-center  gap-4 p-6 border border-gray-200 rounded-lg shadow-sm">
        <svg
          className="w-7 h-7 text-yellow-600"
          xmlns="http://www.w3.org/2000/svg"
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
        <div>
          <h5 className="mb-2 text-2xl font-semibold text-gray-900">
            시즌 기간 안내
          </h5>
     
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded text-center">
              준성수기: 7월14일 ~ 7월24일 / 8월16일 ~ 8월26일
            </div>
            <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded text-center">
              성수기: 7월25일 ~ 8월15일
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomNotice;
