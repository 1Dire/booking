
import axios from "@/api/axiosInstance";

export const getAllRooms = async () => {
  const res = await axios.get("/rooms");
  return res.data;
};

export const getRoomById = async (id) => {
  const res = await axios.get(`/rooms/${id}`);
  return res.data;
};
