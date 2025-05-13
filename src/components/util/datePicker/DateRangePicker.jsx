// components/DateRangePicker.jsx

import { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import DateInput from "./DateInput"; // Flowbite 기반 custom input

const DateRangePicker = ({ onChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(null);
    }

    onChange(
      format(date, "yyyy-MM-dd"),
      endDate ? format(endDate, "yyyy-MM-dd") : null
    );
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onChange(
      startDate ? format(startDate, "yyyy-MM-dd") : null,
      format(date, "yyyy-MM-dd")
    );
  };

  return (
    <div className="flex items-center space-x-2">
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="시작일을 선택하세요"
        dateFormat="yyyy-MM-dd"
        customInput={<DateInput placeholder="시작일을 선택하세요" name="startDate" />}
      />
      <span className="text-gray-500">~</span>
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="종료일을 선택하세요"
        dateFormat="yyyy-MM-dd"
        customInput={<DateInput placeholder="종료일을 선택하세요" name="endDate" />}
      />
    </div>
  );
};

export default DateRangePicker;
