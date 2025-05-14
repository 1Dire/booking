import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

export default function useKakaoLoader() {
      const apiKey = import.meta.env.VITE_KAKAO_API_KEY;
  useKakaoLoaderOrigin({
    
    appkey: apiKey,
    libraries: ["clusterer", "services", "drawing"],
  });
}
