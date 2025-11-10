import { useEffect, useRef } from "react";
import { PlaceMarker } from "../../../apis/performanceplaceApi";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  places: PlaceMarker[];
  isKakaoMapLoaded: boolean; // isKakaoMapLoaded prop 추가
}

function KaKaoMap({
  latitude,
  longitude,
  places,
  isKakaoMapLoaded,
}: KakaoMapProps) {
  const mapContainer = useRef(null);
  // 💡 지도와 마커 관련 객체를 컴포넌트 전역에서 관리하기 위해 ref를 사용합니다.a
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const infowindowRef = useRef<kakao.maps.InfoWindow | null>(null);
  const clustererRef = useRef<kakao.maps.MarkerClusterer | null>(null);

  // 💡 지도 생성 및 마커/클러스터 업데이트를 위한 useEffect
  useEffect(() => {
    // 카카오 SDK 스크립트가 로드되지 않았거나, 지도를 담을 div가 없으면 중단
    if (!isKakaoMapLoaded || !window.kakao || !mapContainer.current) {
      // isKakaoMapLoaded 조건 추가
      return;
    }

    // 1. 지도 객체가 아직 생성되지 않았다면 최초 1회 생성
    if (!mapRef.current) {
      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 6,
      };
      const newMap = new window.kakao.maps.Map(mapContainer.current, mapOption);
      mapRef.current = newMap;
      newMap.setMaxLevel(7);

      // --- 💡 START: 클러스터러 생성 ---
      const newClusterer = new window.kakao.maps.MarkerClusterer({
        map: newMap,
        averageCenter: true,
        gridSize: 300, // 💡 클러스터링 격자 크기를 늘려 하나의 클러스터로 합쳐질 확률을 높입니다.
        minLevel: 7,
        minClusterSize: 1, // 💡 최소 클러스터링 단위를 1로 변경
        styles: [
          {
            width: "100px",
            height: "30px",
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "15px",
            border: "1px solid #333",
            color: "#000",
            textAlign: "center",
            lineHeight: "30px",
            fontWeight: "bold",
          },
        ],
      });
      clustererRef.current = newClusterer;

      // --- 💡 START: 클러스터 클릭 시 확대 레벨 조절 ---
      window.kakao.maps.event.addListener(
        newClusterer,
        "clusterclick",
        function (cluster: any) {
          // 클러스터를 클릭했을 때, 지도의 레벨을 6으로 설정하고 클러스터의 중심으로 이동합니다.
          newMap.setLevel(6, { anchor: cluster.getCenter() });
        }
      );
      infowindowRef.current = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      // --- 💡 START: 레벨 컨트롤러 UI 생성 ---
      const controlContainer = document.createElement("div");
      controlContainer.style.cssText = `
          position: absolute; top: 15px; right: 15px; padding: 5px 10px;
          background: white; border: 1px solid #ccc; border-radius: 5px;
          font-size: 12px; z-index: 2; display: flex; align-items: center;
          flex-direction: column; gap: 10px;
        `;

      const levelLabel = document.createElement("span");
      levelLabel.style.fontWeight = "bold";

      const levelSlider = document.createElement("input");
      levelSlider.type = "range";
      const minMapLevel = 1;
      const maxMapLevel = 7;
      levelSlider.min = String(minMapLevel);
      levelSlider.max = String(maxMapLevel);
      levelSlider.className = "custom-v-slider";
      levelSlider.style.cssText = `
          -webkit-appearance: slider-vertical; writing-mode: bt-lr;
          width: 8px; height: 100px; cursor: pointer; padding: 0 5px;
        `;
      levelSlider.oninput = () => {
        const sliderValue = parseInt(levelSlider.value, 10);
        const newLevel = maxMapLevel - sliderValue + minMapLevel;
        newMap.setLevel(newLevel);
      };

      controlContainer.appendChild(levelLabel);
      controlContainer.appendChild(levelSlider);
      newMap.getNode().appendChild(controlContainer);

      const toggleMarkers = () => {
        const currentLevel = newMap.getLevel();
        levelLabel.innerHTML = `레벨: ${currentLevel}`;
        levelSlider.value = String(maxMapLevel - currentLevel + minMapLevel);
      };

      window.kakao.maps.event.addListener(
        newMap,
        "zoom_changed",
        toggleMarkers
      );
      toggleMarkers();
    }

    // 2. 지도 객체가 생성된 이후, 마커/클러스터 업데이트 로직
    const map = mapRef.current;
    const infowindow = infowindowRef.current;
    const clusterer = clustererRef.current;

    if (!map || !infowindow || !clusterer) return;

    // 💡 위도, 경도가 변경되면 지도의 중심을 부드럽게 이동
    const newCenter = new window.kakao.maps.LatLng(latitude, longitude);
    map.panTo(newCenter);

    // 기존 마커와 클러스터 내용 초기화
    clusterer.clear();
    markersRef.current = [];

    const gugunName = places.length > 0 ? places[0].gugun : "";

    // `places` 데이터가 없으면 마커를 생성하지 않고 여기서 종료
    if (!places || places.length === 0) {
      return;
    }

    const newMarkers = places.map((place) => {
      const markerPosition = new window.kakao.maps.LatLng(
        place.latitude,
        place.longitude
      );
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        title: place.prfPlcName,
      });

      window.kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          `<div style="padding:5px;font-size:12px; font-weight: bold;">${place.prfPlcName}</div>`
        );
        infowindow.open(map, marker);
      });

      return marker;
    });

    clusterer.setTexts(() => gugunName);
    clusterer.addMarkers(newMarkers);
    markersRef.current = newMarkers;
  }, [latitude, longitude, places, isKakaoMapLoaded]); // 의존성 배열에 isKakaoMapLoaded 추가

  return (
    <div style={{ position: "relative", width: "100%", height: "500px" }}>
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "500px" }}
      ></div>
    </div>
  );
}

export default KaKaoMap;
