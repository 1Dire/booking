import { useEffect, useState } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
  Select,
} from "flowbite-react";
import { HiCalendar, HiOfficeBuilding } from "react-icons/hi";
import {
  MdFamilyRestroom,
  MdDriveFileRenameOutline,
  MdOutlinePhoneIphone,
} from "react-icons/md";
import { getRoleFromToken } from "@/utils/authUtils";
import { CiMemoPad } from "react-icons/ci";
import { GiCampfire } from "react-icons/gi";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { getBookInfo, deleteBook, updateBook } from "@/api/books";
import ConfirmModal from "@/components/layout/modal/ConfirmModal";
import { toast } from "react-toastify";

const BookingModal = ({ onClose, id }) => {
  const [bookInfo, setBookInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    if (token) setIsAdmin(getRoleFromToken(token));
  }, []);

  const [options] = useState([
    {
      id: 1,
      name: "승인",
      value: "승인",
    },
    {
      id: 2,
      name: "대기중",
      value: "대기중",
    },
  ]);
  useEffect(() => {
    if (bookInfo) {
      setSelectedStatus(bookInfo.status || "");
    }
  }, [bookInfo]);
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  useEffect(() => {
    getBookInfo(id)
      .then(setBookInfo)
      .catch(() => toast.error("예약 데이터 로드 실패!"));
  }, []);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(bookInfo.id);
      toast.success("예약이 삭제되었습니다.");
    } catch (error) {
      console.error("예약 삭제 실패:", error);
      toast.error("예약 삭제에 실패했습니다.");
    } finally {
      onClose();
    }
  };
  const handleUpdateBook = async () => {
    try {
      await updateBook(id, {
        ...bookInfo,
        status: selectedStatus,
      });
      toast.success("예약 상태가 변경되었습니다.");
    } catch (error) {
      console.error("예약 정보 변경 실패:", error);
      toast.error("예약 정보 변경 실패했습니다.");
    } finally {
      onClose();
    }
  };
  return (
    <>
      {bookInfo && (
        <Modal show={true} onClose={onClose}>
          <ModalHeader>예약 정보 - {bookInfo.id}</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <HiOfficeBuilding className="text-blue-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">호실</p>
                  <p className="text-lg font-semibold">
                    {bookInfo.roomName || "방 정보 없음"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MdDriveFileRenameOutline className="text-orange-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">이름</p>
                  <p className="text-lg font-semibold">
                    {!bookInfo.name ? "이름정보가 없습니다." : bookInfo.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MdOutlinePhoneIphone className="text-orange-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">전화번호</p>
                  <p className="text-lg font-semibold">
                    {!bookInfo.phoneNumber
                      ? "전화번호가 없습니다."
                      : bookInfo.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <HiCalendar className="text-green-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">기간</p>
                  <div className="text-lg font-semibold flex items-center">
                    <div>
                      {bookInfo.startDate
                        ? format(bookInfo.startDate, "yyyy-MM-dd")
                        : "정보 없음"}
                    </div>
                    <div className="mx-2">~</div>
                    <div>
                      {bookInfo.startDate
                        ? format(bookInfo.startDate, "yyyy-MM-dd")
                        : "정보 없음"}
                    </div>
                    <div className="text-sm text-gray-500 mx-2"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MdFamilyRestroom className="text-orange-600 text-xl" />
                <div className="w-full">
                  <p className="text-sm text-gray-500">추가 인원</p>
                  <div className="text-lg font-semibold flex items-center space-x-4">
                    <span className="px-4 py-2 border rounded-lg bg-gray-100 text-center min-w-[90px]">
                      {!bookInfo.numPeople ? 0 : bookInfo.numPeople} 명
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <GiCampfire className="text-red-600 text-xl" />
                <input
                  type="checkbox"
                  id="charcoal"
                  className="h-5 w-5 text-blue-600"
                  checked={bookInfo.isCharcoalIncluded === "Y"}
                  readOnly
                />
                <label htmlFor="charcoal" className="text-sm text-gray-500">
                  숯 이용 여부
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <CiMemoPad className="text-blue-600 text-xl" />
                <div className="w-full">
                  <p className="text-sm text-gray-500">메모</p>
                  <Textarea
                    id="comment"
                    placeholder="메모를 남겨주세요"
                    required
                    value={bookInfo.memo || ""}
                    readOnly
                    rows={4}
                  />
                </div>
              </div>
              <div className="space-y-4 border-t py-3">
                <div className="flex justify-between items-center text-xl font-semibold text-yellow-700">
                  <span>총 가격</span>
                  <span>
                    {bookInfo.totalPrice
                      ? bookInfo.totalPrice.toLocaleString()
                      : 0}
                    원
                  </span>
                </div>
              </div>
            </div>
          </ModalBody>
          {isAdmin ? (
            <>
              <ModalFooter className="flex justify-between gap-3">
                <div className="flex gap-3">
                  <Button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    삭제
                  </Button>
                  <Select
                    id="status"
                    name="status"
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className="w-30"
                  >
                    {options.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    onClick={onClose}
                  >
                    닫기
                  </Button>

                  <Button
                    className="px-4 py-2 bg-yellow-700 text-yellow-300 rounded hover:bg-yellow-800"
                    onClick={() => {
                      handleUpdateBook();
                    }}
                  >
                    저장
                  </Button>
                </div>
              </ModalFooter>
            </>
          ) : (
            <>
              <ModalFooter className="flex justify-end gap-3">
                <Button
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  onClick={onClose}
                >
                  닫기
                </Button>
              </ModalFooter>
            </>
          )}
        </Modal>
      )}
      {isModalOpen && isAdmin && (
        <ConfirmModal
          title="예약을 삭제하시겠습니까?"
          onConfirm={handleDeleteBook}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default BookingModal;
