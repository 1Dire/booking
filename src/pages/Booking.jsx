import React from "react";
import HeroBanner from "../components/layout/HeroBanner";
import Calendar from "../components/layout/calendar/Calendar";
const Booking = () => {

  return (
    <section id="calendar" className="pt-[72px]">
      <HeroBanner
        mainText={"예약 안내"}
        subText={"편안한 휴식, 지금 예약하세요."}
      />
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-xl border border-gray-200">
          <Calendar />
        </div>
      </div>
    </section>
  );
};

export default Booking;
