import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    `${import.meta.env.VITE_API_BASE_URL}/api` || "http://localhost:8080/api", // 기본 API URL 설정
  headers: {
    "Content-Type": "application/json", // 기본 헤더 설정
  },
  withCredentials: true, // 쿠키 인증이 필요한 경우 true로 설정
});

// 요청 인터셉터 - 세션에서 accessToken 꺼내기
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("jwtToken"); // 세션 스토리지에서 토큰 가져오기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 토큰을 Authorization 헤더에 추가
  }
  return config;
});

// 응답 인터셉터 - 401 오류 처리
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      console.error("Unauthorized! Please log in again.");

      // 세션 스토리지에서 토큰 제거
      sessionStorage.removeItem("jwtToken");

      // 홈으로 이동하고 페이지 새로고침
      window.location.href = "/"; // 자동으로 새로고침됨
    }

    console.error("API 요청 실패:", err);
    return Promise.reject(err);
  }
);

export default axiosInstance;
