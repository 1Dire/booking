import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaShip } from "react-icons/fa";
import ClipBoard from "../../util/ClipBoard";

const MapNotice = () => {
  return (
    <div className="py-6 text-[15px] text-gray-800">
      <div className="flex flex-col p-6 border border-gray-200 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow">
        {/* 주소 */}
        <div className="flex items-start gap-4 mb-6">
          <HiOutlineLocationMarker className="w-7 h-7 text-blue-600 mt-1" />
          <div className="w-full">
            <h5 className="mb-2 text-xl font-bold text-gray-900 border-b border-blue-300 pb-1">
              주소
            </h5>
            <div className="flex items-center gap-2">
              <p className="font-medium text-blue-800">통영시 한산면 한산일주로 848</p>
              <ClipBoard value="통영시 한산면 한산일주로 848" />
            </div>
          </div>
        </div>

        {/* 오시는 길 */}
        <div className="flex items-start gap-4">
          <FaShip className="w-7 h-7 text-blue-600 mt-1" />
          <div className="w-full">
            <h5 className="mb-2 text-xl font-bold text-gray-900 border-b border-blue-300 pb-1">
              오시는 길
            </h5>

            {/* 통영 → 한산도 */}
            <div className="mb-4">
              <p className="font-semibold text-blue-800 mb-1">통영 → 한산도</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>통영항여객선터미널(서호동316번지)에서 승선 (약 30분 소요)</li>
                <li>오전 07:00~12:00까지 1시간 간격 운항</li>
                <li>오후 13:30~19:30까지 1시간 30분 간격 운항</li>
              </ul>
            </div>

            {/* 거제 → 한산도 */}
            <div>
              <p className="font-semibold text-blue-800 mb-1">거제 → 한산도</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>거제카페리선착장(둔덕면 어구리 65-1)에서 승선 (약 15분 소요)</li>
                <li>07:30부터 16:30까지 1시간 간격 운항</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapNotice;