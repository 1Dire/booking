import React from "react";

const RoomList = () => {
  return (
    <>
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="grid grid-cols-4 gap-2">
          <div className="rounded-lg flex items-center justify-center h-32 col-span-2">
            {/* 첫 번째 이미지 */}
            <img
              src="https://picsum.photos/600/400"
              alt="랜덤 이미지 1"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="rounded-lg flex items-center justify-center h-32">
            {/* 두 번째 이미지 */}
            <img
              src="https://picsum.photos/600/401"
              alt="랜덤 이미지 2"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="rounded-lg flex items-center justify-center h-32">
            {/* 세 번째 이미지 */}
            <img
              src="https://picsum.photos/600/402"
              alt="랜덤 이미지 3"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        <div>
          <span className="font-medium text-gray-500">
            Entire house
          </span>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <span className="mt-2 text-3xl font-semibold text-gray-950">
                Beach House on Lake Huron
              </span>
              <span className="mt-2 flex gap-2">
                <span className="flex items-center gap-1 text-yellow-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                    className="size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-sm/6 font-medium">2.66</span>
                </span>
                <span className="text-sm/6 text-gray-500">(128 reviews)</span>
                <span className="text-yellow-300">·</span>
                <span className="text-sm/6 font-medium text-yellow-600">
                  Bayfield, ON
                </span>
              </span>
            </div>
            <div>
              <button
                type="button"
                className="w-full rounded-lg bg-yellow-700 px-3 py-2 text-sm/6 font-bold text-white"
              >
                Check availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomList;
