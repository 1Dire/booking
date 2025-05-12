import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import DateRangePicker from "@/components/util/datePicker/DateRangePicker";
import { SelectInput } from "@/components/util/input/SelectInput";
import { getAllSeason } from "@/api/seasons";
import { FaPlus } from "react-icons/fa";
import Grid from "@/components/util/grid/grid";
import ConfirmModal from "@/components/layout/modal/ConfirmModal";
import { createSeason } from "@/api/seasons";
import { toast } from "react-toastify";

const SettingsModal = ({ onClose, onSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedSeasonTypeId, setSelectedSeasonTypeId] = useState("");
  const [openModal, setOpenModal] = useState(true);

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleSelectChange = (e) => {
    setSelectedSeasonTypeId(e.target.value);
  };

  useEffect(() => {
    getAllSeason().then(setOptions);
  }, []);

  const handleModalClose = () => {
    setOpenModal(false);
    onClose();
  };

  const seasonsSave = async () => {
    const seasonData = {
      seasonTypeId: selectedSeasonTypeId,
      startDate,
      endDate,
    };
    try {
      const response = await createSeason(seasonData);

      toast.success("시즌이 성공적으로 추가되었습니다!", {
        position: "bottom-center",
        autoClose: 2000,
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("저장 중 오류 발생:", error);

      // 실패 알림
      toast.error("시즌 추가 중 오류가 발생했습니다. 다시 시도해주세요.", {
        position: "bottom-center",
        autoClose: 2000,
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  const isAddDisabled =
    !startDate ||
    !endDate ||
    new Date(endDate) < new Date(startDate) ||
    !selectedSeasonTypeId;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(endDate) < new Date(startDate)) {
      alert("종료일이 시작일보다 이전일 수 없습니다.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <Modal dismissible show={openModal} onClose={handleModalClose}>
        <ModalHeader>설정</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                <DateRangePicker onChange={handleDateChange} />
                <div className="w-full sm:w-35">
                  <SelectInput
                    options={options}
                    name="seasonTypeId"
                    onChange={handleSelectChange}
                    value={selectedSeasonTypeId}
                  />
                </div>
              </div>

              <Button
                className="w-full mt-4 px-4 py-2 bg-yellow-700 text-yellow-300 rounded hover:bg-yellow-800 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isAddDisabled}
              >
                추가
                <FaPlus />
              </Button>
            </form>

            <div>
              <Grid openModal={openModal} />
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="flex justify-end gap-4">
          <Button
            className="px-4 py-2 bg-yellow-700 text-yellow-300 rounded hover:bg-yellow-800"
            onClick={handleModalClose}
          >
            취소
          </Button>
        </ModalFooter>
      </Modal>
      {isModalOpen && (
        <ConfirmModal
          title="시즌 추가하시겠습니까?"
          onConfirm={seasonsSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default SettingsModal;
