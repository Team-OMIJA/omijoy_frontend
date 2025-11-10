// src/components/map/PerformancePlaceMap.tsx (대폭 수정)

import { useCallback, useState, useEffect } from "react";
import KaKaoMap from "./KaKaoMap";
import {
  sendLocation,
  getGugunSummaries, // ⭐️ '요약' API 임포트
  PlaceMarker,
  GugunSummary,
} from "../../../apis/performanceplaceApi";

// ⭐️ 부산의 중심 좌표 (예: 부산시청)와 기본 줌 레벨
const BUSAN_CENTER = { lat: 35.1795543, lng: 129.0756416 };
const SUMMARY_LEVEL = 8; // '요약 뷰' 일 때 맵 레벨
const DETAIL_LEVEL = 6; // '상세 뷰' 일 때 맵 레벨

function PerformancePlaceMap() {
  const [isLoading, setIsLoading] = useState(true);
  const [isKakaoMapLoaded, setIsKakaoMapLoaded] = useState(false);

  // ⭐️ 1. 뷰 모드와 마커 데이터를 상태로 관리
  const [viewMode, setViewMode] = useState<"summary" | "detail">("summary");
  const [markers, setMarkers] = useState<(PlaceMarker | GugunSummary)[]>([]);

  // ⭐️ 2. 맵 중심 좌표와 레벨을 상태로 관리
  const [mapCenter, setMapCenter] = useState({
    lat: BUSAN_CENTER.lat,
    lng: BUSAN_CENTER.lng,
  });
  const [mapLevel, setMapLevel] = useState(SUMMARY_LEVEL);

  // ⭐️ 3. 카카오맵 스크립트 로드 (최초 1회)
  useEffect(() => {
    // ⭐️ 이 로직은 사용자의 기존 코드를 활용합니다. (스크립트 로드)
    // ⭐️ window.kakao.maps.load()가 두 번 실행되지 않도록 isKakaoMapLoaded로 방어합니다.
    if (!isKakaoMapLoaded) {
      window.kakao.maps.load(() => {
        setIsKakaoMapLoaded(true);
      });
    }
  }, [isKakaoMapLoaded]); // isKakaoMapLoaded가 바뀔 때마다 실행(최초 1회)

  // ⭐️ 4. '요약 뷰' 데이터를 로드하는 함수
  const loadSummaryView = useCallback(async () => {
    console.log("Loading Summary View...");
    setIsLoading(true);
    try {
      const summaryData = await getGugunSummaries("부산");
      setMarkers(summaryData);
      setViewMode("summary");
      setMapCenter(BUSAN_CENTER); // 맵 중심을 부산 전체로
      setMapLevel(SUMMARY_LEVEL); // 맵 레벨을 '요약' 레벨로
    } catch (error) {
      console.error("요약 데이터 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ⭐️ 5. 컴포넌트 마운트 시 '요약 뷰' 로드
  useEffect(() => {
    if (isKakaoMapLoaded) {
      // 맵 스크립트가 로드된 후에 실행
      loadSummaryView();
    }
  }, [isKakaoMapLoaded, loadSummaryView]); // 맵 로드 상태(true)가 되면 1회 실행

  // ⭐️ 6. '요약' 마커 클릭 시 '개별 뷰'로 전환하는 핸들러
  const handleSummaryClick = useCallback(async (item: GugunSummary) => {
    console.log(`Loading Detail View for: ${item.gugun}`);
    setIsLoading(true);
    try {
      // ⭐️ 백엔드가 수정되었으므로 '부산', '해운대구' 등으로 필터링
      const detailData = await sendLocation("부산", item.gugun);
      setMarkers(detailData);
      setViewMode("detail");
      setMapCenter({ lat: item.latitude, lng: item.longitude }); // 맵 중심을 클릭한 '구'로 이동
      setMapLevel(DETAIL_LEVEL); // 맵 레벨을 '상세' 레벨로
    } catch (error) {
      console.error(`${item.gugun} 개별 데이터 로드 실패:`, error);
    } finally {
      setIsLoading(false);
    }
  }, []); // 의존성 배열 비움 (sendLocation은 외부 함수)

  // (참고: 기존 '현재 위치 찾기' 기능은 이 로직과 분리하거나,
  // geolocation 성공 시 handleSummaryClick(item)과 유사하게
  // sendLocation을 호출하는 '개별 뷰'로 바로 진입하도록 구현할 수 있습니다.)
  // const getLocation = ...

  return (
    <div>
      {isLoading && <p>데이터 로딩 중...</p>}
      {/* ⭐️ '상세 뷰'일 때만 '요약 뷰로 돌아가기' 버튼 표시 */}
      {viewMode === "detail" && (
        <button onClick={loadSummaryView} style={{ marginBottom: "10px" }}>
          ⬅️ 부산 전체 구군 보기
        </button>
      )}
      {/* <button onClick={getLocation}>현재 위치 찾기</button> (기존 버튼) */} {" "}
      <p>
        현재 뷰: {viewMode === "summary" ? "부산시 전체 요약" : "구군별 상세"}{" "}
        (표시 항목: {markers.length}개)
      </p>{" "}
      {isKakaoMapLoaded ? (
        <KaKaoMap
          latitude={mapCenter.lat}
          longitude={mapCenter.lng}
          level={mapLevel}
          markers={markers}
          viewMode={viewMode}
          isKakaoMapLoaded={isKakaoMapLoaded}
          onSummaryClick={handleSummaryClick} // ⭐️ 클릭 핸들러 전달
        />
      ) : (
        <p>
          지도 로딩 중... (index.html에 카카오맵 스크립트가 포함되어 있어야
          합니다)
        </p>
      )}{" "}
    </div>
  );
}

export default PerformancePlaceMap;
