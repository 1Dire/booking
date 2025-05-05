import React from "react";
import ClipBoard from "@/components/util/ClipBoard";
import { HiOutlineCash } from "react-icons/hi";
import { HiCalendarDays } from "react-icons/hi2";

const RoomNotice = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 py-6 text-sm text-gray-800 gap-4">
        {/* 요금 안내 */}
        <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-sm">
          <HiOutlineCash className="w-7 h-7 text-yellow-600" />
          <div className="w-full">
            <h5 className="mb-2 text-2xl font-semibold text-gray-900">
              요금안내
            </h5>
            <ul className="list-disc pl-5 text-gray-600 space-y-1 ">
              <li>
                <span>
                  기준인원 초과 시 1인당
                  <span className="font-medium text-yellow-700">20,000원</span>
                  추가요금 발생합니다.
                </span>
              </li>
              <li>
                <span>
                  바베큐 이용 시 (숯, 그릴 제공)
                  <span className="font-medium text-yellow-700">20,000원</span>
                  입니다.
                </span>
              </li>
            </ul>
            <div className="grid grid-cols-2 gap-2 pt-5">
              <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded text-center">
                결제안내
              </div>
              <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded text-center">
                문의전화
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-xs font-medium px-2.5 py-1 rounded text-center flex items-center justify-center gap-1">
                <span>농협 352-0412-0485-43 백연희</span>

                <ClipBoard value="352-0412-0485-43" />
              </div>
              <div className="text-xs font-medium px-2.5 py-1 rounded text-center space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <a href="tel:01045026342" className="hover:underline">
                    010-4502-6342
                  </a>
                  <ClipBoard value="010-4502-6342" />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <a href="tel:01038776342" className="hover:underline">
                    010-3877-6342
                  </a>
                  <ClipBoard value="010-3877-6342" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 시즌 안내 */}
        <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-sm">
          <HiCalendarDays className="w-7 h-7 text-yellow-600" />

          <div className="w-full">
            <h5 className="mb-2 text-2xl font-semibold text-gray-900">
              시즌 기간 안내
            </h5>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded text-center">
                준성수기
              </div>
              <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded text-center">
                성수기
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-xs font-medium px-2.5 py-1 rounded text-center">
                7월14일 ~ 7월 24일
              </div>
              <div className="text-xs font-medium px-2.5 py-1 rounded text-center">
                7월25일 ~ 8월 15일
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomNotice;
