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

function KakaoMap({ latitude, longitude }: KakaoMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current || !window.kakao) return;

    const mapOption = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 2,
    };

    const map = new window.kakao.maps.Map(mapContainer.current, mapOption);

    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    const toggleMarker = () => {
      const currentLevel = map.getLevel();

      if (currentLevel <= 4) { 
        marker.setMap(map); 
    } else { 
        marker.setMap(null); 
    }
};
    toggleMarker();
    window.kakao.maps.event.addListener(map, "zoom_changed", toggleMarker);
  
    return () => {
        window.kakao.maps.event.removeListener(map, 'zoom_changed', toggleMarker);
    };
  }, [latitude, longitude]);
  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: "100%", height: "500px" }}
    ></div>
  );
}

export default KakaoMap;
