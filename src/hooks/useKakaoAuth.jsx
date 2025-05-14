// src/hooks/useKakaoAuth.js

import { useEffect } from "react";

const useKakaoAuth = (onSuccess, onFailure) => {
  useEffect(() => {
    const apiKey = import.meta.env.VITE_KAKAO_API_KEY;
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(apiKey);
      }
    };
    document.body.appendChild(script);
  }, []);

  const login = () => {
    if (!window.Kakao) return;

    window.Kakao.Auth.login({
      success: function (authObj) {
        const accessToken = authObj.access_token;

        sessionStorage.setItem("accessToken", accessToken);

        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            sessionStorage.setItem("userProfile", JSON.stringify(res));
          },
          fail: function (err) {
            console.error("카카오 사용자 정보 가져오기 실패:", err);
          },
        });

        // 서버로 전달
        fetch("http://localhost:8080/auth/kakao", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken }),
        })
          .then((res) => res.json())
          .then((data) => {
            sessionStorage.setItem("jwtToken", data.accessToken); // 백엔드 JWT도 저장
            onSuccess(accessToken);
          })
          .catch(onFailure);
      },
      fail: onFailure,
    });
  };

  return { login };
};

export default useKakaoAuth;
