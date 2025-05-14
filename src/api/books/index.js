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
export const getBookInfo = async (bookId) => {
  const res = await axios.get(`/books/${bookId}`);
  return res.data;
};

export const deleteBook = async (bookId) => {
  const res = await axios.delete(`/books/${bookId}`);
  return res.data;
};

export const updateBook = async (bookId, data) => {
  const res = await axios.put(`/books/${bookId}`, data); 
  return res.data;
};

export const getMyBooks = async () => {
  const token = sessionStorage.getItem("jwtToken"); // 저장된 JWT 토큰
  const res = await axios.get("/books/my-bookings", {
    headers: {
      Authorization: `Bearer ${token}`, // 여기에 토큰을 실어 보냄
    },
  });
  return res.data;
};
