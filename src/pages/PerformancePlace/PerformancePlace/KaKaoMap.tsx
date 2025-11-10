import { useEffect, useRef } from "react";
import { PlaceMarker, GugunSummary } from "../../../apis/performanceplaceApi";

// 1. window.kakao 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  latitude: number; // 맵 중심 위도
  longitude: number; // 맵 중심 경도
  level: number; // 맵 확대 레벨
  markers: (PlaceMarker | GugunSummary)[]; // ⭐️ 두 타입의 데이터를 모두 받음
  viewMode: "summary" | "detail"; // ⭐️ 뷰 모드 ('요약' | '상세')
  isKakaoMapLoaded: boolean;
  // ⭐️ 요약 마커 클릭 시 'gugun' 정보를 부모로 전달하는 콜백
  onSummaryClick: (gugun: GugunSummary) => void;
}

function KaKaoMap({
  latitude,
  longitude,
  level,
  markers,
  viewMode,
  isKakaoMapLoaded,
  onSummaryClick,
}: KakaoMapProps) {
  const mapContainer = useRef(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);

  // ⭐️ 2. 두 종류의 마커를 관리할 Ref
  const clustererRef = useRef<kakao.maps.MarkerClusterer | null>(null); // '개별 뷰'용 클러스터러
  const overlaysRef = useRef<kakao.maps.CustomOverlay[]>([]); // '요약 뷰'용 커스텀 오버레이
  const infowindowRef = useRef<kakao.maps.InfoWindow | null>(null); // '개별 뷰'용 인포윈도우 // ⭐️ 3. 지도/마커 생성 및 업데이트

  useEffect(() => {
    if (!isKakaoMapLoaded || !window.kakao || !mapContainer.current) return;

    const mapOption = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: level, // ⭐️ 부모에게 받은 레벨 사용
    }; // 4. 지도 최초 1회 생성

    if (!mapRef.current) {
      const newMap = new window.kakao.maps.Map(mapContainer.current, mapOption);
      mapRef.current = newMap;
      newMap.setMaxLevel(8); // '요약 뷰'를 위해 최대 레벨 확장

      // '개별 뷰'에서 사용할 클러스터러와 인포윈도우도 최초 1회 생성
      clustererRef.current = new window.kakao.maps.MarkerClusterer({
        map: newMap,
        averageCenter: true,
        minLevel:3, // ⭐️ 개별 뷰에서 클러스터링이 시작될 레벨
      });
      infowindowRef.current = new window.kakao.maps.InfoWindow({ zIndex: 1 }); // (기존의 줌 슬라이더 등 UI 로직은 여기에 그대로 두셔도 됩니다)
    }

    const map = mapRef.current;
    const infowindow = infowindowRef.current;
    const clusterer = clustererRef.current;

    if (!map || !infowindow || !clusterer) return;

    // ⭐️ 5. 뷰가 변경될 때마다 지도 중심과 레벨 업데이트
    const newCenter = new window.kakao.maps.LatLng(latitude, longitude);
    map.setLevel(level, { anchor: newCenter });
    map.panTo(newCenter);

    // ⭐️ 6. 기존 마커/오버레이 모두 제거 (초기화)
    clusterer.clear(); // 클러스터러 마커 제거
    overlaysRef.current.forEach((overlay) => overlay.setMap(null)); // 오버레이 제거
    overlaysRef.current = []; // 배열 비우기

    // ⭐️ 7. 뷰 모드에 따라 분기
    if (viewMode === "summary") {
      // --- '요약 뷰' 로직: CustomOverlay 사용 ---
      (markers as GugunSummary[]).forEach((item) => {
        // 커스텀 오버레이에 표시할 DOM 요소 생성
        const contentDiv = document.createElement("div");
        contentDiv.className = "summary-overlay"; // (CSS로 스타일링 가능)
        contentDiv.style.cssText = `
          padding: 5px 10px; background: rgba(255, 255, 255, 0.9); 
          border: 1px solid #333; border-radius: 15px; font-weight: bold; 
          text-align: center; font-size: 12px; cursor: pointer;
        `;
        contentDiv.innerHTML = `${item.gugun} (${item.count})`;

        // ⭐️ 클릭 이벤트 바인딩
        contentDiv.onclick = () => {
          onSummaryClick(item); // ⭐️ 클릭 시 부모 컴포넌트로 item 정보 전달
        };

        const position = new window.kakao.maps.LatLng(
          item.latitude,
          item.longitude
        );

        const overlay = new window.kakao.maps.CustomOverlay({
          content: contentDiv, // ⭐️ DOM 요소를 content로 설정
          position: position,
          yAnchor: 1,
        });

        overlay.setMap(map);
        overlaysRef.current.push(overlay);
      });
    } else {
      // --- '개별 뷰' 로직: MarkerClusterer 사용 ---
      const newMarkers = (markers as PlaceMarker[]).map((place) => {
        const markerPosition = new window.kakao.maps.LatLng(
          place.latitude,
          place.longitude
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          title: place.prfPlcName,
        });

        // '개별' 마커 클릭 시 인포윈도우 표시
        window.kakao.maps.event.addListener(marker, "click", function () {
          infowindow.setContent(
            `<div style="padding:5px;font-size:12px; font-weight: bold;">${place.prfPlcName}</div>`
          );
          infowindow.open(map, marker);
        });
        return marker;
      });

      // ⭐️ 클러스터러에 '개별' 마커 추가
      clusterer.addMarkers(newMarkers);
    }
  }, [
    latitude,
    longitude,
    level,
    markers,
    viewMode,
    isKakaoMapLoaded,
    onSummaryClick,
  ]);

  return (
    <div style={{ position: "relative", width: "100%", height: "500px" }}>
      {" "}
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "500px" }}
      ></div>{" "}
    </div>
  );
}

export default KaKaoMap;
