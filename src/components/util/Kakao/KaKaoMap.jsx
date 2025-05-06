import React from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKakaoLoader";

const KaKaoMap = () => {
  useKakaoLoader();

  const position = { lat: 34.76702, lng: 128.50729 };

  return (
    <div
      style={{
        borderRadius: "1rem",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Map
        center={position}
        style={{ width: "100%", height: "400px" }}
        level={2}
      >
        <MapMarker position={position} />
        <CustomOverlayMap position={position} yAnchor={1.5}>
          <div className="text-yellow-700 border border-yellow-700 bg-white rounded-lg px-3 py-2 font-bold shadow-md transform -translate-y-6">
            한산펜션
          </div>
        </CustomOverlayMap>
      </Map>
    </div>
  );
};

export default KaKaoMap;
