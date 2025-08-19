import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const imageList = [
  { src: "https://picsum.photos/600/400", alt: "랜덤 이미지 1" },
  { src: "https://picsum.photos/600/401", alt: "랜덤 이미지 2" },
  { src: "https://picsum.photos/600/402", alt: "랜덤 이미지 3" },
];

const RoomImages = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (src) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {imageList.map((img, index) => (
        <div
          key={index}
          className={`rounded-lg flex items-center justify-center h-32 ${
            index === 0 ? "col-span-2" : ""
          } cursor-pointer`}
          onClick={() => openModal(img.src)}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover rounded-lg hover:opacity-90 transition"
          />
        </div>
      ))}

      {/* ✅ 모달 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-full max-h-[90vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="선택된 이미지"
                className="rounded-xl shadow-xl max-h-[90vh] max-w-full"
              />
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
              >
                <IoClose className="w-6 h-6 text-gray-700" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RoomImages;