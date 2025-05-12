// JWT에서 role을 추출하는 함수
export const getRoleFromToken = (token) => {
  try {
    // 토큰에서 payload 디코딩 (JWT의 두 번째 부분)
    const payload = JSON.parse(atob(token.split(".")[1]));
    // payload에서 role이 "ADMIN"인지 확인
    return payload.role === "ADMIN";
  } catch (error) {
    console.error("JWT 디코딩 실패:", error);
    return false; // 에러가 발생하면 false 반환
  }
};
