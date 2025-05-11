import { useEffect, useState } from "react";
import kakaoLoginSmall from "@/assets/kakao_login_small.png";

const KaKaoLogin = ({ onLoginStatusChange }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init("4c4e15ed05c93e3f60bf9bbe997d1e1a");
      }
    };
    document.body.appendChild(script);
  }, []);

  const loginWithKakao = () => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        const accessToken = authObj.access_token;

        fetch("http://localhost:8080/auth/kakao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken }),
        })
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("jwtToken", data.token);
            onLoginStatusChange(true);
            fetchUserProfile(accessToken);
          })
          .catch((error) => {
            console.error("서버 요청 오류:", error);
            alert("로그인에 실패했습니다.");
          });
      },
      fail: function (error) {
        console.error("Kakao 로그인 실패:", error);
        alert("로그인에 실패했습니다.");
      },
    });
  };

  const fetchUserProfile = (accessToken) => {
    fetch("https://kapi.kakao.com/v2/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data.properties);
      })
      .catch((error) => {
        console.error("사용자 정보 가져오기 실패:", error);
      });
  };

  return (
    <img
      src={kakaoLoginSmall}
      alt="Kakao Login"
      onClick={loginWithKakao}
      style={{ cursor: "pointer", height: "40px" }}
    />
  );
};

export default KaKaoLogin;
