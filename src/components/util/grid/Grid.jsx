import React, { useEffect, useRef, useState } from "react";
import TuiGrid from "tui-grid";
import "tui-grid/dist/tui-grid.css";
import ConfirmModal from "@/components/layout/modal/ConfirmModal";
import { deleteSeason, getAllSeason } from "@/api/seasons";
import { toast } from "react-toastify";

const Grid = () => {
  const gridRef = useRef(null);
  const gridInstance = useRef(null);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDeleteData, setPendingDeleteData] = useState(null);

  // 그리드 초기화 및 설정
  useEffect(() => {
    if (!gridRef.current || gridInstance.current) return;

    gridInstance.current = new TuiGrid({
      el: gridRef.current,
      data,
      columns: [
        { header: "종류", name: "name", align: "center" },
        { header: "시작", name: "startDate", align: "center" },
        { header: "종료", name: "endDate", align: "center" },
        {
          header: "삭제",
          name: "delete",
          align: "center",
          renderer: {
            type: DeleteButtonRenderer,
          },
        },
      ],
      bodyHeight: 200,
    });

    return () => {
      gridInstance.current?.destroy();
      gridInstance.current = null;
    };
  }, [data]);

  // 데이터 로딩 함수
  const loadData = async () => {
    try {
      const seasonData = await getAllSeason();
      setData(seasonData);
    } catch (error) {
      toast.error("데이터 로드 실패!");
    }
  };

  // 삭제 버튼 렌더러 클래스
  class DeleteButtonRenderer {
    constructor(props) {
      const el = document.createElement("button");
      el.textContent = "삭제";
      el.className =
        "bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded shadow";
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const rowData = props.grid.getData()[props.rowKey];
        setPendingDeleteData(rowData);
        setIsModalOpen(true);
      });
      this.el = el;
    }

    getElement() {
      return this.el;
    }
  }

  // 컴포넌트가 처음 렌더링될 때 데이터 로드
  useEffect(() => {
    loadData();
  }, []);

  // 삭제 확정 시 데이터 삭제 요청
  const handleConfirmDelete = async () => {
    if (pendingDeleteData) {
      try {
        await deleteSeason(pendingDeleteData.id);
        await loadData();  // 삭제 후 새로운 데이터 로드
        toast.success("삭제가 완료되었습니다!");
      } catch (error) {
        toast.error("삭제 실패!");
      }
    }

    setIsModalOpen(false);
    setPendingDeleteData(null);
  };

  return (
    <>
      <div ref={gridRef} style={{ height: "auto" }} />

      {isModalOpen && (
        <ConfirmModal
          title="정말로 이 항목을 삭제하시겠습니까?"
          onConfirm={handleConfirmDelete}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Grid;
