import axios from "@/api/axiosInstance";

export const getAllSeason = async () => {
  const res = await axios.get("/seasons/season-types");
  return res.data;
};

export const createSeason = async (data) => {
  const res = await axios.post("/seasons", data);
  return res.data;
};
