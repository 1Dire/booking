import React from "react";

const RoomInfo = ({data}) => {
  return (
    <>
      <div>
        <span className="font-medium text-gray-500">{data.size} 평</span>
      </div>
      <div>
        <span className="mt-2 text-3xl font-semibold text-gray-950">
          {data.name}
        </span>
      </div>
    </>
  );
};

export default RoomInfo;
