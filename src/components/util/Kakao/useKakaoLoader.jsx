import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: "4c4e15ed05c93e3f60bf9bbe997d1e1a",
    libraries: ["clusterer", "services", "drawing"],
  });
}
