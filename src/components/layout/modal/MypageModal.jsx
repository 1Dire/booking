import { useEffect, useState } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import BookGrid from "@/components/util/grid/BookGrid";

const MypageModal = ({ onClose }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    try {
      const storedProfile = sessionStorage.getItem("userProfile");
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        setUserProfile(parsedProfile);
      }
    } catch (error) {
      console.error("Failed to parse userProfile from sessionStorage:", error);
    }
  }, []);

  const handleUnlinkKakao = async () => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      alert("카카오 access token이 없습니다.");
      return;
    }

    try {
      const response = await fetch("https://kapi.kakao.com/v1/user/unlink", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.ok) {
        toast.success("카오 연결이 해제되었습니다");

        sessionStorage.clear();
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        console.error("카카오 탈퇴 실패:", errorData);
        toast.error("카카오 탈퇴 실패:");
        alert("탈퇴 실패: " + (errorData.msg || "알 수 없는 에러"));
      }
    } catch (err) {
      console.error("카카오 unlink 요청 중 오류:", err.message);
      toast.error("카카오 탈퇴 실패:");
    }
  };

  return (
    <Modal show={true} onClose={onClose}>
      <ModalHeader>마이 페이지</ModalHeader>
      <ModalBody className="px-4 py-6">
        <div>
          {userProfile ? (
            <div className="space-y-2">
              <div>
                <span className="font-semibold">닉네임: </span>
                <span>{userProfile.properties.nickname}</span>
              </div>
            </div>
          ) : (
            <p>사용자 정보를 불러오는 중...</p>
          )}
        </div>

        <p className="mt-4 mb-2 text-lg font-semibold">나의 예약</p>
        <BookGrid />

        <p className="mt-4 text-sm text-red-600 text-right">
          ※ 취소 및 기타 문의는 전화나 문자 상담 부탁드립니다.
        </p>
      </ModalBody>
      <ModalFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <Button
          style={{ backgroundColor: "#ffeb02" }}
          className="px-4 py-2 text-black-800 rounded w-full sm:w-auto"
          onClick={handleUnlinkKakao}
        >
          카카오 탈퇴
        </Button>
        <div className="flex justify-between gap-4 w-full sm:w-auto">
          <Button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 w-full sm:w-auto"
            onClick={onClose}
          >
            닫기
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default MypageModal;
