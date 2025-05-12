import { useState } from "react";
import { Datepicker } from "flowbite-react";
import { format } from "date-fns"; // date-fns의 format 함수 임포트

const DateRangePicker = ({ onChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onChange(
      format(date, "yyyy-MM-dd"),
      endDate ? format(endDate, "yyyy-MM-dd") : null
    ); // 포맷팅 후 부모 컴포넌트로 전달
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onChange(
      startDate ? format(startDate, "yyyy-MM-dd") : null,
      format(date, "yyyy-MM-dd")
    ); // 포맷팅 후 부모 컴포넌트로 전달
  };

  return (
    <div className="flex items-center">
      {/* 시작일 선택 */}
      <div className="relative">
        <Datepicker
          selected={startDate}
          onChange={handleStartDateChange}
          name="startDate"
          placeholder="시작일을 선택하세요"
          language="ko"
        />
      </div>
      <span className="mx-2 text-gray-500">~</span>

      {/* 종료일 선택 */}
      <div className="relative">
        <Datepicker
          selected={endDate}
          onChange={handleEndDateChange}
          name="endDate"
          placeholder="종료일을 선택하세요"
          minDate={startDate} // 종료일은 시작일 이후만 선택 가능
          language="ko"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
