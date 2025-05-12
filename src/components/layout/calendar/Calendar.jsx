"use client";

import { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { BsGearFill, BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import "@/styles/calendar.css";
import { getAllRooms } from "@/api/room";
import { getAllBook } from "@/api/books/index";
import { getRoleFromToken } from "@/utils/authUtils";
import { getPublicHolidays } from "@/utils/getPublicHolidays";
import SettingsModal from "@/components/layout/modal/SettingModal";

function Calendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [holidays, setHolidays] = useState([]);

  const calendarRef = useRef(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      setIsAdmin(getRoleFromToken(token));
    }
  }, []);

  useEffect(() => {
    getPublicHolidays(year, month)
      .then((data) => {
        setHolidays(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("공휴일 데이터 불러오기 실패:", err);
        setHolidays([]);
      });
  }, [year, month]);

  useEffect(() => {
    getAllRooms()
      .then(setRoomList)
      .catch((err) => console.error("방 정보 불러오기 실패:", err));
  }, []);

  useEffect(() => {
    getAllBook(year, month)
      .then(setBookList)
      .catch((err) => console.error("예약 정보 불러오기 실패:", err));
  }, [year, month]);

  const updateTitle = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const currentDate = calendarApi.getDate();
      setYear(currentDate.getFullYear());
      setMonth(currentDate.getMonth() + 1);
      setTitle(
        `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`
      );
    }
  };

  useEffect(() => {
    updateTitle();
  }, []);

  const handlePrev = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.prev();
      updateTitle();
    }
  };

  const handleNext = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.next();
      updateTitle();
    }
  };

  const handleToday = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.gotoDate(new Date());
      updateTitle();
    }
  };

  const generateEvents = () => {
    const events = [];
    let startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const currentDate = new Date();

    if (!isAdmin && startDate < currentDate) {
      startDate = new Date(currentDate);
      startDate.setHours(0, 0, 0, 0);
    }

    startDate.setDate(startDate.getDate() + 1);

    bookList.forEach((booking) => {
      events.push({
        id: `booking-${booking.id}`,
        title: booking.roomName,
        start: booking.checkIn,
        end: booking.checkOut,
        booking: true,
      });
    });

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = d.toISOString().slice(0, 10);
      roomList.forEach((room) => {
        const isBooked = bookList.some((booking) => {
          const inDate = new Date(booking.checkIn);
          const outDate = new Date(booking.checkOut);
          return booking.roomId === room.id && d >= inDate && d < outDate;
        });

        if (!isBooked) {
          events.push({
            id: `free-${room.id}-${dateStr}`,
            title: room.name,
            start: dateStr,
            booking: false,
          });
        }
      });
    }

    events.sort((a, b) => a.id.localeCompare(b.id));
    return events;
  };

  const events = generateEvents();

  useEffect(() => {
    generateEvents();
  }, [isAdmin]);

  return (
    <>
      <div className="calendar-header bg-white p-4 rounded-t-lg flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          <span className="calendar-title">{title}</span>
        </h2>
        <div className="toolbar flex gap-3">
          {isAdmin && (
            <button
              className="btn-settings p-3 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-600 hover:text-gray-800"
              onClick={() => setIsModalOpen(true)}
            >
              <BsGearFill className="text-xl" />
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              className="btn-prev p-3 rounded-full text-yellow-300 bg-yellow-700 hover:bg-yellow-800"
              onClick={handlePrev}
            >
              <BsCaretLeftFill className="text-xl" />
            </button>
            <button
              className="btn-today px-6 py-2 text-base font-medium text-center text-yellow-300 rounded-lg bg-yellow-700 hover:bg-yellow-800"
              onClick={handleToday}
            >
              Today
            </button>
            <button
              className="btn-next p-3 rounded-full text-yellow-300 bg-yellow-700 hover:bg-yellow-800"
              onClick={handleNext}
            >
              <BsCaretRightFill className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      <FullCalendar
        ref={calendarRef}
        headerToolbar={false}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        events={events}
        dayCellContent={(arg) => <span>{arg.date.getDate()}</span>}
        eventClassNames={(arg) => {
          return arg.event.extendedProps.booking ? ["reserved-room"] : [];
        }}
        dayCellClassNames={(arg) => {
          const dateStr = arg.date.toISOString().slice(0, 10);
          const holidayDates = holidays.map((h) => {
            const str = h.locdate.toString();
            return `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`;
          });

          const classes = [];

          if (holidayDates.includes(dateStr)) {
            classes.push("public-holiday");
          }

          if (["2025-05-20", "2025-05-21"].includes(dateStr))
            classes.push("peak-season");
          if (["2025-05-15", "2025-05-16"].includes(dateStr))
            classes.push("semi-peak");
          if (["2025-05-10", "2025-05-11"].includes(dateStr))
            classes.push("off-season");

          return classes;
        }}
      />
      {isModalOpen && (
        <SettingsModal
          onClose={() => setIsModalOpen(false)} // 모달 닫기
          onSave={(dates) => {
            console.log("Saved dates: ", dates); // 날짜 저장
            setIsModalOpen(false); // 저장 후 모달 닫기
          }}
        />
      )}
    </>
  );
}

export default Calendar;
