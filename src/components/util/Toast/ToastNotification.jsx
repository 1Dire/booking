import React from "react";
import { toast } from "react-toastify"; // toast 함수를 사용하여 알림 표시

const ToastNotification = () => {
  const notify = () => {
    toast.success("성공적으로 작업이 완료되었습니다!", {
      position: "bottom-center", // 위치 설정
      autoClose: 5000, // 5초 후 자동으로 사라짐
      hideProgressBar: false, // 진행률 표시줄을 숨기지 않음
      closeOnClick: true, // 클릭 시 알림 닫기
      pauseOnHover: true, // 호버 시 알림 멈춤
      draggable: true, // 알림을 드래그할 수 있도록 설정
      progress: undefined, // 진행바 설정
    });
  };

  return (
    <div>
      <button onClick={notify}>토스트 알림 보기</button>
    </div>
  );
};

export default ToastNotification;
