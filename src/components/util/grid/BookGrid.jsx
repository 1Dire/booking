import React, { useEffect, useRef, useState } from "react";
import TuiGrid from "tui-grid";
import "tui-grid/dist/tui-grid.css";
import { toast } from "react-toastify";
import { getMyBooks } from "@/api/books";
import BookInfoModal from "@/components/layout/modal/BookInfoModal";

const BookGrid = () => {
  const gridRef = useRef(null);
  const gridInstance = useRef(null);
  const [data, setData] = useState([]);
  const [selectRow, setSelectRow] = useState(null);
  const [bookInfoModalOpen, setBookInfoModalOpen] = useState(false);
  // 금액을 통화 형식으로 포맷팅하는 함수
  const formatCurrency = (value) => {
    if (typeof value !== "number") return value;
    return `${value.toLocaleString()} 원`; // 원화 형식으로 변환
  };
  useEffect(() => {
    if (selectRow) {
      setBookInfoModalOpen(true);
    }
  }, [selectRow]);
  // 데이터 로딩 함수
  const loadData = async () => {
    try {
      const myBook = await getMyBooks();
      // 금액을 변환하고 데이터에 적용
      const formattedData = myBook.map((item) => ({
        ...item,
        totalPrice: formatCurrency(item.totalPrice), // 금액 변환
      }));

      setData(formattedData);
    } catch (error) {
      toast.error("데이터 로드 실패!");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!gridRef.current || gridInstance.current) return;

    // TuiGrid 인스턴스 생성
    gridInstance.current = new TuiGrid({
      el: gridRef.current,
      data,
      columns: [
        { header: "예약자명", name: "name", align: "center" },
        { header: "호실", name: "roomName", align: "center" },
        { header: "시작", name: "startDate", align: "center" },
        { header: "종료", name: "endDate", align: "center" },
        {
          header: "금액",
          name: "totalPrice",
          align: "center",
        },
      ],
      bodyHeight: 200,
    });

    // 행 클릭 이벤트 처리
    gridInstance.current.on("click", (ev) => {
      const rowKey = ev.rowKey;
      const rowData = gridInstance.current.getData()[rowKey]; // 클릭한 행의 데이터
      setSelectRow(rowData);
    });

    return () => {
      gridInstance.current?.destroy();
      gridInstance.current = null;
    };
  }, [data]);

  return (
    <>
      <div ref={gridRef} style={{ height: "auto" }} />

      {bookInfoModalOpen && (
        <BookInfoModal
          id={selectRow.id}
          onClose={() => setBookInfoModalOpen(false)}
        />
      )}
    </>
  );
};

export default BookGrid;
