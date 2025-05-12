import axios from "@/api/axiosInstance";

export const getAllSeasonType = async () => {
  const res = await axios.get("/seasons/season-types");
  return res.data;
};

export const getAllSeason = async () => {
  const res = await axios.get("/seasons");
  return res.data;
};
export const createSeason = async (data) => {
  const res = await axios.post("/seasons", data);
  return res.data;
};
export const deleteSeason = async (id) => {
  const res = await axios.delete(`/seasons/${id}`);
  return res.data;
};
