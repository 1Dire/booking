import { HiOutlineInformationCircle, HiOutlinePhone } from "react-icons/hi";
import { LuCalendarClock } from "react-icons/lu";
import ClipBoard from "@/components/util/ClipBoard";

const RoomNoticeCard = () => {
  return (
 <div className="mt-8 p-6 rounded-xl border border-gray-200 bg-white shadow-sm mb-5 text-[15px]">
  {/* 헤더 */}
  <div className="flex items-center gap-2 mb-4">
    <HiOutlineInformationCircle className="text-blue-600 w-6 h-6" />
    <h3 className="text-2xl font-bold text-gray-800">요금 및 시즌 안내</h3>
  </div>

  {/* 요금 설명 */}
  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6 leading-relaxed">
    <li>
      기준인원 초과 시 1인당{" "}
      <span className="font-bold text-blue-700">20,000원</span> 추가요금 발생
    </li>
    <li>
      바베큐 이용 시 (숯, 그릴 제공){" "}
      <span className="font-bold text-blue-700">20,000원</span>
    </li>
  </ul>

  {/* 시즌 기간 */}
  <div className="mt-6">
    <div className="flex items-center gap-2 mb-2">
      <LuCalendarClock className="text-blue-600 w-5 h-5" />
      <h4 className="font-semibold text-gray-800 text-base">시즌 기간</h4>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div className="bg-blue-50 text-blue-900 px-4 py-2 rounded-md font-semibold flex items-center justify-between">
        준성수기
        <span className="text-gray-600 font-normal text-sm">
          7월 14일 ~ 7월 24일
        </span>
      </div>
      <div className="bg-blue-50 text-blue-900 px-4 py-2 rounded-md font-semibold flex items-center justify-between">
        성수기
        <span className="text-gray-600 font-normal text-sm">
          7월 25일 ~ 8월 15일
        </span>
      </div>
    </div>
  </div>

  {/* 연락처 */}
  <div className="mt-6">
    <div className="flex items-center gap-2 mb-2">
      <HiOutlinePhone className="text-blue-600 w-5 h-5" />
      <h4 className="font-semibold text-gray-800 text-base">결제 및 문의</h4>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div className="flex items-center justify-between bg-blue-50 text-blue-900 px-4 py-3 rounded-md">
        <span>
          농협 352-0412-0485-43
          <br />
          <span className="text-gray-600 text-sm">예금주: 백연희</span>
        </span>
        <ClipBoard value="352-0412-0485-43" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between bg-blue-50 text-blue-900 px-4 py-3 rounded-md">
          <span>010-4502-6342</span>
          <ClipBoard value="010-4502-6342" />
        </div>
        <div className="flex items-center justify-between bg-blue-50 text-blue-900 px-4 py-3 rounded-md">
          <span>010-3877-6342</span>
          <ClipBoard value="010-3877-6342" />
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default RoomNoticeCard;