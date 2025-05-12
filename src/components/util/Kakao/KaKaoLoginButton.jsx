import { useState } from "react";
import kakaoLoginSmall from "@/assets/kakao_login_small.png";
import useKakaoAuth from "@/hooks/useKakaoAuth";

const KaKaoLoginButton = ({ onLoginStatusChange }) => {
  const onSuccess = (accessToken) => {
    fetch("https://kapi.kakao.com/v2/user/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        // 사용자 정보를 세션 스토리지에 저장
        sessionStorage.setItem("userProfile", JSON.stringify(data)); 
        onLoginStatusChange(true);
        
        // 로그인 후 '/'로 리다이렉트
        window.location.href = "/";
      })
      .catch((err) => {
        console.error("사용자 정보 실패:", err);
      });
  };

  const onFailure = (err) => {
    console.error("카카오 로그인 실패:", err);
    alert("로그인에 실패했습니다.");
  };

  const { login } = useKakaoAuth(onSuccess, onFailure);

  return (
    <img
      src={kakaoLoginSmall}
      alt="카카오 로그인"
      onClick={login}
      style={{ cursor: "pointer", height: "40px" }}
    />
  );
};

export default KaKaoLoginButton;
