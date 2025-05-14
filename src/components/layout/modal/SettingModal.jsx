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
import { getAllSeasonType, createSeason } from "@/api/seasons";
import { FaPlus } from "react-icons/fa";
import Grid from "@/components/util/grid/Grid";
import ConfirmModal from "@/components/layout/modal/ConfirmModal";
import { toast } from "react-toastify";

const SettingsModal = ({ onClose }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedSeasonTypeId, setSelectedSeasonTypeId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const seasonsSave = async () => {
    const seasonData = {
      seasonTypeId: selectedSeasonTypeId,
      startDate,
      endDate,
    };

    try {
      await createSeason(seasonData);
      toast.success("시즌이 성공적으로 추가되었습니다!");
      onClose();
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      toast.error("시즌 추가 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleSelectChange = (e) => {
    setSelectedSeasonTypeId(e.target.value);
  };

  useEffect(() => {
    getAllSeasonType().then(setOptions);
  }, []);

  const isAddDisabled =
    !startDate ||
    !endDate ||
    new Date(endDate) < new Date(startDate) ||
    !selectedSeasonTypeId;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(endDate) < new Date(startDate)) {
      toast.error("종료일이 시작일보다 이전일 수 없습니다.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <Modal dismissible show={true} onClose={onClose}>
        <ModalHeader>설정</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
              <div className="w-full sm:w-3/4">
                <DateRangePicker onChange={handleDateChange} />
              </div>
              <div className="w-full sm:w-1/4">
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

          <div className="mt-6">
            <Grid />
          </div>
        </ModalBody>

        <ModalFooter className="flex justify-end gap-4">
          <Button
            className="px-4 py-2 bg-yellow-700 text-yellow-300 rounded hover:bg-yellow-800"
            onClick={onClose}
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
