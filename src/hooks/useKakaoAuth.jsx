import { useEffect } from "react";

const useKakaoAuth = (onSuccess, onFailure) => {
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

  const login = () => {
    if (!window.Kakao) return;

    window.Kakao.Auth.login({
      success: function (authObj) {
        const accessToken = authObj.access_token;

        fetch("http://localhost:8080/auth/kakao", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken }),
        })
          .then((res) => res.json())
          .then((data) => {
            sessionStorage.setItem("jwtToken", data.accessToken);
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
