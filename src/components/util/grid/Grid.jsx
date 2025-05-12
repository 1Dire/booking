import React, { useEffect, useRef, useState } from "react";
import TuiGrid from "tui-grid";
import "tui-grid/dist/tui-grid.css";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import ConfirmModal from "@/components/layout/modal/ConfirmModal";
const Grid = () => {
  const gridRef = useRef(null);
  const gridInstance = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // ⚔️ Tailwind + Flowbite 스타일의 삭제 버튼 렌더러
  class DeleteButtonRenderer {
    constructor(props) {
      const el = document.createElement("button");
      el.textContent = "삭제";
      el.className =
        "bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded shadow ";
      el.setAttribute("data-id", props.rowKey);

      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const id = Number(ev.target.getAttribute("data-id"));
        setPendingDeleteId(id);
        setIsModalOpen(true);
      });

      this.el = el;
    }

    getElement() {
      return this.el;
    }

    render() {}
  }

  useEffect(() => {
    if (gridRef.current && !gridInstance.current) {
      gridInstance.current = new TuiGrid({
        el: gridRef.current,
        data: [
          { id: 1, name: "성수기", start: "2025-05-02", end: "2025-05-02" },
          { id: 2, name: "성수기", start: "2025-05-03", end: "2025-05-04" },
          { id: 3, name: "준성수기", start: "2025-06-01", end: "2025-06-02" },
        ],
        columns: [
          { header: "종류", name: "name", align: "center" },
          { header: "시작", name: "start", align: "center" },
          { header: "종료", name: "end", align: "center" },
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
    }

    return () => {
      if (gridInstance.current) {
        gridInstance.current.destroy();
      }
    };
  }, []);

  const handleConfirmDelete = () => {
    const grid = gridInstance.current;
    const rowIndex = grid.getIndexOfRow(pendingDeleteId);
    if (rowIndex !== -1) {
      grid.removeRow(rowIndex);
    }
    setIsModalOpen(false);
    setPendingDeleteId(null);
  };

  return (
    <>
      <div ref={gridRef} style={{ height: "500px" }} />

      {/* Flowbite 모달 */}
      {isModalOpen && (
        <ConfirmModal
          title="정말로 이 항목을 삭제하시겠습니까?" // 동적으로 제목 설정
          onConfirm={handleConfirmDelete} // 삭제 함수
          onClose={() => setIsModalOpen(false)} // 모달 닫기 함수
        />
      )}
    </>
  );
};

export default Grid;
