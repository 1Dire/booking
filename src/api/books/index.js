import axios from "@/api/axiosInstance";


export const getAllBook = async (year,month) => {
  const res = await axios.get(`/books?year=${year}&month=${month}`);
  return res.data;
};

