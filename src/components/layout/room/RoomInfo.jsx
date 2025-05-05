import React from "react";

const RoomInfo = ({ data }) => {
  return (
    <div className="mb-3 space-y-1">
      <div className="text-sm text-gray-500">
        <span className="font-medium">{data.size}평</span>{" "}
        <span className="text-xs text-gray-400">({data.capacity}명)</span>
      </div>
      <div className="text-2xl font-bold text-gray-900 tracking-tight">
        {data.name}
      </div>
    </div>
  );
};

export default RoomInfo;
