import { useEffect, useState } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "flowbite-react";
import {
  HiCalendar,
  HiOfficeBuilding,
  HiChevronUp,
  HiChevronDown,
} from "react-icons/hi";
import {
  MdFamilyRestroom,
  MdDriveFileRenameOutline,
  MdOutlinePhoneIphone,
} from "react-icons/md";

import { CiMemoPad } from "react-icons/ci";
import { GiCampfire } from "react-icons/gi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { checkAvailability, createBook } from "@/api/books";
import { getAllSeason } from "@/api/seasons";
import { getPublicHolidays } from "@/utils/getPublicHolidays";
import { toast } from "react-toastify";

const BookingModal = ({ onClose, data }) => {
  const [id, setId] = useState(data.id);
  const [roomName] = useState(data.name);
  const [startDate, setStartDate] = useState(new Date(data.startDate));
  const [endDate, setEndDate] = useState(new Date(data.startDate));
  const [maxAvailableDays, setMaxAvailableDays] = useState();
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [seasonList, setSeasonList] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isCharcoalIncluded, setIsCharcoalIncluded] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [memo, setMemo] = useState("");
  const priceOffPeak = data.priceOffPeak;
  const pricePeak = data.pricePeak;
  const priceShoulder = data.priceShoulder;
  const priceWeekend = data.priceWeekend;
  const additionalPersonFee = data.additionalFeePerPerson;
  const charcoalFee = 20000;

  useEffect(() => {
    if (startDate) {
      const year = startDate.getFullYear().toString();
      const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
      getPublicHolidays(year, month)
        .then((data) => setHolidays(Array.isArray(data) ? data : []))
        .catch(() => {
          toast.error("공휴일 데이터 로드 실패!");
          setHolidays([]);
        });
    }
  }, [startDate]);
  const isHoliday = (date) => {
    const formatted = Number(format(date, "yyyyMMdd"));
    return holidays.some((h) => h.locdate === formatted);
  };
  const isPeakSeason = (date) => {
    return seasonList.some(
      (season) =>
        season.seasonTypeId === 1 &&
        new Date(season.startDate) <= date &&
        new Date(season.endDate) >= date
    );
  };

  const isShoulderSeason = (date) => {
    return seasonList.some(
      (season) =>
        season.seasonTypeId === 3 &&
        new Date(season.startDate) <= date &&
        new Date(season.endDate) >= date
    );
  };
  const isWeekend = (date) => {
    const day = date.getDay();
    const holiday = isHoliday(date);

    // 공휴일 하루 다음날에만 주말 요금을 적용
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1); // 다음날 날짜 계산
    const isHolidayAfter = isHoliday(nextDay); // 다음날이 공휴일인지 체크

    // 주말 요금 적용: 금요일(5), 토요일(6), 일요일(0) 또는 공휴일 다음날
    const isWeekendDay = day === 5 || day === 6 || isHolidayAfter;

    return isWeekendDay;
  };
  const calculateTotalPrice = () => {
    if (!startDate || !endDate || numberOfPeople < 0) return 0;

    // 날짜 차이 계산
    const dayCount =
      Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 2; // 총 일수
    const nightsCount = dayCount - 1; // 박수 계산 (총 일수에서 1일을 빼야 하므로)

    if (nightsCount <= 0) return 0; // 0박 이상이어야 가격을 계산함

    let finalPricePerNight = priceOffPeak;

    // 날짜마다 요금 계산
    for (let i = 0; i < nightsCount; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i); // 날짜마다 증가

      // 성수기, 준성수기, 주말, 기본 요금 체크
      if (isPeakSeason(currentDate)) {
        finalPricePerNight = Math.max(finalPricePerNight, pricePeak);
      } else if (isShoulderSeason(currentDate)) {
        finalPricePerNight = Math.max(finalPricePerNight, priceShoulder);
      } else if (isWeekend(currentDate)) {
        finalPricePerNight = Math.max(finalPricePerNight, priceWeekend);
      }
    }

    // 가격 계산
    const basePrice = nightsCount * finalPricePerNight;
    const additionalPeoplePrice = numberOfPeople * additionalPersonFee;
    const charcoalPrice = isCharcoalIncluded ? charcoalFee : 0;

    // 총 가격
    return basePrice + additionalPeoplePrice + charcoalPrice;
  };
  const calculateNights = (startDate, endDate) => {
    if (startDate && endDate) {
      const timeDifference = endDate - startDate;
      const days = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 2;
      const nights = days - 1;
      return { days, nights };
    }
    return { days: 0, nights: 0 };
  };

  useEffect(() => {
    const userProfile = sessionStorage.getItem("userProfile");
    if (userProfile) {
      const user = JSON.parse(userProfile);
      setName(user?.properties?.nickname || "");
    }
  }, []);

  useEffect(() => {
    getAllSeason().then(setSeasonList);
  }, []);

  useEffect(() => {
    checkAvailability(id, data.startDate).then((value) => {
      setMaxAvailableDays(value?.maxAvailableDays);
    });
  }, [id, data.startDate]);

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const calculateMaxDate = () => {
    if (maxAvailableDays) {
      return new Date(startDate.getTime() + (maxAvailableDays - 1) * 86400000);
    }
    return null;
  };

  const incrementPeople = () => setNumberOfPeople((prev) => prev + 1);
  const decrementPeople = () =>
    setNumberOfPeople((prev) => (prev > 0 ? prev - 1 : 0));

  const { days, nights } = calculateNights(startDate, endDate);
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 동작 막기

    if (!name.trim()) {
      toast.error("이름을 입력해주세요.");
      return;
    }

    if (!phone.trim()) {
      toast.error("전화번호를 입력해주세요.");
      return;
    }

    try {
      const totalPrice = calculateTotalPrice();
      const charcoalFeeApplied = isCharcoalIncluded ? charcoalFee : 0;
      const extraPersonFee = numberOfPeople * additionalPersonFee;

      const formData = {
        roomId: id,
        roomName,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
        nights,
        days,
        name,
        phoneNumber: phone,
        memo,
        numPeople: numberOfPeople,
        status: "대기중",
        isCharcoalIncluded: isCharcoalIncluded ? "Y" : "N",
        charcoalFee: charcoalFeeApplied,
        additionalPeopleFee: extraPersonFee,
        totalPrice,
      };

      await createBook(formData);
      toast.success("예약이 완료되었습니다!");
    } catch (error) {
      console.error("예약 실패:", error);
      toast.error("예약에 실패했습니다. 다시 시도해주세요.");
    } finally {
      onClose(); // 모달 닫기
    }
  };

  return (
    <Modal dismissible show={true} onClose={onClose}>
      <ModalHeader>예약 하기</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <HiOfficeBuilding className="text-blue-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500">호실</p>
                <p className="text-lg font-semibold">
                  {roomName || "방 정보 없음"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MdDriveFileRenameOutline className="text-orange-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500">이름</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MdOutlinePhoneIphone className="text-orange-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500">전화번호</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="전화번호를 입력하세요"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <HiCalendar className="text-green-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500">기간</p>
                <div className="text-lg font-semibold flex items-center">
                  <div>
                    {startDate ? format(startDate, "yyyy-MM-dd") : "정보 없음"}
                  </div>
                  <div className="mx-2">~</div>
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="border border-gray-300 rounded-lg px-3 py-2 w-35 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholderText="종료일을 선택하세요"
                    minDate={startDate}
                    maxDate={calculateMaxDate()}
                  />
                  <div className="text-sm text-gray-500 mx-2">
                    {days > 0
                      ? `${nights}박 ${days}일`
                      : "유효하지 않은 날짜 범위"}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MdFamilyRestroom className="text-orange-600 text-xl" />
              <div className="w-full">
                <p className="text-sm text-gray-500">인원 수</p>
                <div className="text-lg font-semibold flex items-center space-x-4">
                  <span className="px-4 py-2 border rounded-lg bg-gray-100 text-center min-w-[90px]">
                    {data.capacity}명
                  </span>
                  <div className="flex items-center space-x-2 w-full">
                    <span className="text-sm text-gray-500">추가 인원</span>
                    <button
                      onClick={decrementPeople}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <HiChevronDown className="text-gray-600" />
                    </button>
                    <span className="text-lg font-semibold">
                      {numberOfPeople}명
                    </span>
                    <button
                      onClick={incrementPeople}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <HiChevronUp className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <GiCampfire className="text-red-600 text-xl" />
              <input
                type="checkbox"
                id="charcoal"
                className="h-5 w-5 text-blue-600"
                checked={isCharcoalIncluded}
                onChange={() => setIsCharcoalIncluded(!isCharcoalIncluded)}
              />
              <label htmlFor="charcoal" className="text-sm text-gray-500">
                숯 이용 여부 (+{charcoalFee.toLocaleString()}원)
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <CiMemoPad className="text-blue-600 text-xl" />
              <div className="w-full">
                <p className="text-sm text-gray-500">메모</p>
                <Textarea
                  id="comment"
                  placeholder="메모를 남겨주세요"
                  required
                  onChange={(e) => setMemo(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <div className="space-y-4 border-t py-3">
              <div className="text-lg font-semibold text-gray-700">
                가격 상세
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {isPeakSeason(startDate) || isPeakSeason(endDate)
                    ? "성수기 요금"
                    : isShoulderSeason(startDate) || isShoulderSeason(endDate)
                    ? "준성수기 요금"
                    : isWeekend(startDate) || isWeekend(endDate)
                    ? "주말 요금"
                    : "기본 요금"}{" "}
                  (하루{" "}
                  {(isPeakSeason(startDate) || isPeakSeason(endDate)
                    ? pricePeak
                    : isShoulderSeason(startDate) || isShoulderSeason(endDate)
                    ? priceShoulder
                    : isWeekend(startDate) || isWeekend(endDate)
                    ? priceWeekend
                    : priceOffPeak
                  ).toLocaleString()}
                  원)
                </span>
                <span className="font-semibold text-gray-800">
                  <span className="text-sm text-gray-500">
                    ({nights}박 ×{" "}
                    {(isPeakSeason(startDate) || isPeakSeason(endDate)
                      ? pricePeak
                      : isShoulderSeason(startDate) || isShoulderSeason(endDate)
                      ? priceShoulder
                      : isWeekend(startDate) || isWeekend(endDate)
                      ? priceWeekend
                      : priceOffPeak
                    ).toLocaleString()}
                    원)
                  </span>{" "}
                  {(
                    nights *
                    (isPeakSeason(startDate) || isPeakSeason(endDate)
                      ? pricePeak
                      : isShoulderSeason(startDate) || isShoulderSeason(endDate)
                      ? priceShoulder
                      : isWeekend(startDate) || isWeekend(endDate)
                      ? priceWeekend
                      : priceOffPeak)
                  ).toLocaleString()}
                  원
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">추가 인원 요금</span>
                <span className="font-semibold text-gray-800">
                  {additionalPersonFee.toLocaleString()}원 × {numberOfPeople}명
                  = {(additionalPersonFee * numberOfPeople).toLocaleString()}원
                </span>
              </div>

              {isCharcoalIncluded && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">숯 이용 요금</span>
                  <span className="font-semibold text-gray-800">
                    {charcoalFee.toLocaleString()}원
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center text-xl font-semibold text-yellow-700">
                <span>총 가격</span>
                <span>{calculateTotalPrice().toLocaleString()}원</span>
              </div>
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter className="flex justify-end gap-3">
        <Button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          onClick={onClose}
        >
          닫기
        </Button>
        <Button
          className="px-4 py-2 bg-yellow-700 text-yellow-300 rounded hover:bg-yellow-800"
          onClick={handleSubmit}
        >
          확인
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BookingModal;
