import React from "react";
import RoomList from "@/components/layout/room/RoomList";
import roomData from "@/data/roomData";
import RoomNotice from "@/components/layout/room/RoomNotice";
const Book = () => {
  return (
    <section id="book" className="h-screen pt-20">
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RoomNotice />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roomData.map((data, index) => (
              <RoomList key={index} data={data} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
