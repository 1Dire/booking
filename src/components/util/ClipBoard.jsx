import React from "react";
import { TiClipboard } from "react-icons/ti";
import { toast } from "react-toastify"; // React-Toastify를 임포트

const ClipBoard = ({ value }) => {
  // 클립보드 복사 처리
  const handleCopy = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        // 복사 성공 시 알림
        toast.success("복사 완료!", {
          position: "bottom-center", // 위치
          autoClose: 2000,
        });
      })
      .catch((err) => {
        console.error("복사 실패:", err);
        // 복사 실패 시 알림
        toast.error("복사 실패!", {
          position: "bottom-center", // 위치
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer hover:opacity-80"
        onClick={handleCopy}
        title="클립보드에 복사"
      >
        <TiClipboard className="me-2 h-6 w-6 text-blue-600" />
      </div>
    </div>
  );
};

export default ClipBoard;
