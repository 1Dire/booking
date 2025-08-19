import { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const ConfirmModal = ({ onConfirm, onClose, title }) => {
  const [openModal, setOpenModal] = useState(true);

  const handleConfirm = () => {
    onConfirm();
    setOpenModal(false); // 모달 닫기
  };
  onConfirm;
  return (
    <Modal
      show={openModal}
      size="md"
      onClose={() => setOpenModal(false)} // 모달 닫기
      popup
    >
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              className="px-4 py-2 bg-blue-700 text-blue-300 rounded hover:bg-blue-800"
              onClick={handleConfirm}
            >
              Yes
            </Button>

            <Button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setOpenModal(false)}
            >
              No
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ConfirmModal;
