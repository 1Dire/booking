import axios from "@/api/axiosInstance";

export const getAllBook = async (year, month) => {
  const res = await axios.get(`/books?year=${year}&month=${month}`);
  return res.data;
};

export const checkAvailability = async (roomId, startDate) => {
  const res = await axios.get(`/books/check-availability?roomId=${roomId}&startDate=${startDate}`);
  return res.data;
};
export const createBook = async (data) => {
  const res = await axios.post("/books", data);
  return res.data;
};

