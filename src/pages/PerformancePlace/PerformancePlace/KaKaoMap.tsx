import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  latitude: number;
  longitude: number;
}

function KaKaoMap({ latitude, longitude }: KakaoMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    console.log(window.kakao)
    // 카카오맵 초기화 함수
    const initMap = () => {
      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 7
      };

      const map = new window.kakao.maps.Map(mapContainer.current, mapOption);
      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      
      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      });

      marker.setMap(map);
    };

    // autoload=false이므로 명시적으로 로드
    window.kakao.maps.load(() => {
      console.log("카카오맵 로드 완료");
      initMap();
    });

  }, [latitude, longitude]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "500px" }}
    />
  );
}

export default KaKaoMap;