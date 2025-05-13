import React from "react";
import { TextInput } from "flowbite-react";
import { HiCalendar } from "react-icons/hi"; // 히어로 아이콘 사용

const DateInput = React.forwardRef(({ value, onClick, placeholder, name }, ref) => (
  <div onClick={onClick} className="w-full">
    <TextInput
      icon={HiCalendar}
      name={name}
      placeholder={placeholder}
      value={value}
      readOnly
      ref={ref}
      className="cursor-pointer"
    />
  </div>
));

export default DateInput;
