import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { BsGearFill, BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import "@/styles/calendar.css";
import { getAllRooms } from "@/api/room";
import { getAllBook } from "@/api/books/index";
import { getRoleFromToken } from "@/utils/authUtils";
import { getPublicHolidays } from "@/utils/getPublicHolidays";
import SettingsModal from "@/components/layout/modal/SettingModal";
import { getAllSeason } from "@/api/seasons";
import { toast } from "react-toastify";
import BookingModal from "@/components/layout/modal/BookingModal";
import BookInfoModal from "@/components/layout/modal/BookInfoModal";
function Calendar() {
  const calendarRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [bookInfoModalOpen, setBookInfoModalOpen] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [seasonList, setSeasonList] = useState([]);
  const [roomData, setRoomData] = useState(null);
  const [bookId, setBookId] = useState(null);
  useEffect(() => {
    Promise.all([getAllSeason(), getAllRooms()])
      .then(([seasons, rooms]) => {
        setSeasonList(seasons);
        setRoomList(rooms);
      })
      .catch(() => toast.error("초기 데이터 로드 실패!"));
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    if (token) setIsAdmin(getRoleFromToken(token));
  }, []);

  useEffect(() => {
    getPublicHolidays(year, month)
      .then((data) => setHolidays(Array.isArray(data) ? data : []))
      .catch(() => toast.error("공휴일 데이터 로드 실패!"));
  }, [year, month]);

  useEffect(() => {
    if (!isModalOpen || !bookInfoModalOpen) {
      getAllBook(year, month)
        .then(setBookList)
        .catch(() => toast.error("예약 데이터 로드 실패!"));
    }
  }, [isModalOpen, bookModalOpen, year, month, bookInfoModalOpen]);

  const updateTitle = useCallback(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const currentDate = calendarApi.getDate();
      const y = currentDate.getFullYear();
      const m = currentDate.getMonth() + 1;
      setYear(y);
      setMonth(m);
      setTitle(`${y}년 ${m}월`);
    }
  }, []);

  useEffect(() => {
    updateTitle();
  }, [updateTitle]);

  const handleNav = (action) => {
    const api = calendarRef.current?.getApi();
    if (!api) return;
    if (action === "prev") api.prev();
    else if (action === "next") api.next();
    else api.gotoDate(new Date());
    updateTitle();
  };

  const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    d.setHours(d.getHours() + 9);
    return d.toISOString().split("T")[0];
  };

  const getSeasonType = (dateStr) => {
    return (
      seasonList.find(
        (season) => dateStr >= season.startDate && dateStr <= season.endDate
      )?.seasonTypeName || null
    );
  };

  const dayCellClassNames = useCallback(
    (arg) => {
      const dateStr = formatDateToYYYYMMDD(arg.date);
      const todayStr = formatDateToYYYYMMDD(new Date());
      const holidayDates = holidays.map((h) =>
        formatDateToYYYYMMDD(
          h.locdate.toString().replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
        )
      );
      const classes = [];
      if (new Date(arg.date).getMonth() + 1 === month + 1)
        classes.push("next-month");
      if (!isAdmin && dateStr < todayStr) classes.push("hidden-date");
      if (holidayDates.includes(dateStr)) classes.push("public-holiday-bg");
      const season = getSeasonType(dateStr);
      if (season === "성수기") classes.push("peak-season-bg");
      else if (season === "준성수기") classes.push("semi-peak-bg");
      else if (season === "비수기") classes.push("off-season-bg");
      return classes;
    },
    [holidays, seasonList, isAdmin, month]
  );

  const events = useMemo(() => {
    const todayStr = formatDateToYYYYMMDD(new Date());
    const dateSet = new Set();
    const events = [];

    for (const booking of bookList) {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      end.setDate(end.getDate() + 1);

      const startStr = formatDateToYYYYMMDD(start);
      const endStr = formatDateToYYYYMMDD(end);
      const includeToday = startStr <= todayStr && todayStr < endStr;

      const bookingEvent = {
        id: `booking-${booking.id}`,
        title: booking.roomName,
        start: includeToday ? todayStr : booking.startDate,
        end: endStr,
        booking: true,
        roomId: booking.roomId,
        bookId: booking.id,
        allDay: true,
      };

      if (!isAdmin) {
        if (startStr > todayStr || includeToday) {
          events.push(bookingEvent);
        }
      } else {
        // 관리자일 경우 전체 예약 표시
        events.push(bookingEvent);
      }

      // 날짜-방 중복 방지
      let d = new Date(start);
      while (d < end) {
        dateSet.add(`${booking.roomId}-${formatDateToYYYYMMDD(d)}`);
        d.setDate(d.getDate() + 1);
      }
    }

    // 가능한 날짜 생성
    const daysInMonth = new Date(year, month, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
        d
      ).padStart(2, "0")}`;
      for (const room of roomList) {
        const key = `${room.id}-${dateStr}`;
        if (!dateSet.has(key) && (isAdmin || dateStr >= todayStr)) {
          events.push({
            id: `available-${room.id}-${dateStr}`,
            title: room.name,
            start: dateStr,
            end: dateStr,
            booking: false,
            roomId: room.id,
            allDay: true,
          });
        }
      }
    }

    return events;
  }, [bookList, isAdmin, roomList, year, month]);

  const isPrevDisabled = useMemo(() => {
    const today = new Date();
    return (
      !isAdmin &&
      (year < today.getFullYear() ||
        (year === today.getFullYear() && month <= today.getMonth() + 1))
    );
  }, [year, month, isAdmin]);

  const handleEventClick = ({ event }) => {
    if (event.extendedProps.booking) {
      if (!isAdmin) return toast.error("이미 예약된 방입니다.");
      setBookId(event.extendedProps.bookId);
      setBookInfoModalOpen(true);
    } else {
      const room = roomList.find((r) => r.id === event.extendedProps.roomId);
      const dateStr = event.start ? formatDateToYYYYMMDD(event.start) : "N/A";

      setRoomData({ ...room, startDate: dateStr });
      setBookModalOpen(true);
    }
  };

  return (
    <>
      <div className="calendar-header bg-white p-4 rounded-t-lg flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <div className="toolbar flex gap-3">
          {isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-settings p-3 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-600 hover:text-gray-800"
            >
              <BsGearFill className="text-xl" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNav("prev")}
              disabled={isPrevDisabled}
              className="btn-prev p-3 rounded-full text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-50"
            >
              <BsCaretLeftFill className="text-xl" />
            </button>
            <button
              onClick={() => handleNav("today")}
              className="btn-today px-6 py-2 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
            >
              Today
            </button>
            <button
              onClick={() => handleNav("next")}
              className="btn-next p-3 rounded-full text-white bg-blue-700 hover:bg-blue-800"
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
        dayCellClassNames={dayCellClassNames}
        dayCellContent={({ date }) => {
          const dateStr = formatDateToYYYYMMDD(date);
          const badgeInfo =
            holidays.find(
              (h) =>
                formatDateToYYYYMMDD(
                  `${h.locdate}`.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
                ) === dateStr
            ) || {};
          const badgeText = badgeInfo.dateName || getSeasonType(dateStr);
          const badgeColor = badgeInfo.dateName
            ? "bg-purple-600 text-white" // 공휴일
            : badgeText === "성수기"
            ? "bg-red-500 text-white"
            : badgeText === "준성수기"
            ? "bg-yellow-500 text-black"
            : badgeText === "비수기"
            ? "bg-gray-400 text-white"
            : "";

          return (
            <div className="flex justify-between px-1">
              <span
                className={`text-xs text-white px-1.5 py-0.5 rounded ${badgeColor} truncate`}
              >
                {badgeText}
              </span>
              <span className="text-sm font-medium">{date.getDate()}</span>
            </div>
          );
        }}
        eventClassNames={({ event }) =>
          event.extendedProps.booking ? ["reserved-room"] : []
        }
        eventMouseEnter={(info) => (info.el.style.cursor = "pointer")}
        eventMouseLeave={(info) => (info.el.style.cursor = "default")}
        eventClick={handleEventClick}
      />

      {isModalOpen && (
        <SettingsModal
          onClose={() => setIsModalOpen(false)}
          onSave={() => setIsModalOpen(false)}
        />
      )}
      {bookModalOpen && (
        <BookingModal data={roomData} onClose={() => setBookModalOpen(false)} />
      )}
      {bookInfoModalOpen && (
        <BookInfoModal
          id={bookId}
          onClose={() => setBookInfoModalOpen(false)}
        />
      )}
    </>
  );
}

export default Calendar;
