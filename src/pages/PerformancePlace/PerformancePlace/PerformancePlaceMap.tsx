// src/components/map/PerformancePlaceMap.tsx

import { useCallback, useState, useEffect } from "react";
import KaKaoMap from "./KaKaoMap";
import {
  findNearbyPlaces, // '내 근처' API
  findPlacesByGugun, // '지역 필터' API
  PlaceMarker,
} from "../../../apis/performanceplaceApi";
import { KOREA_REGIONS} from "../../../utils/regions";

const KOREA_CENTER = { lat: 36.5, lng: 127.5 };
const KOREA_LEVEL = 12;
const LOCAL_LEVEL = 7;
const GU_LEVEL = 8;

function PerformancePlaceMap() {
  const [mapCenter, setMapCenter] = useState({
    lat: KOREA_CENTER.lat,
    lng: KOREA_CENTER.lng,
  });
  const [mapLevel, setMapLevel] = useState(KOREA_LEVEL);

  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState<PlaceMarker[]>([]);
  const [isKakaoMapLoaded, setIsKakaoMapLoaded] = useState(false);

  const [isLocationDenied, setIsLocationDenied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [filterSido, setFilterSido] = useState<SidoKey | "">("");
  const [filterGugun, setFilterGugun] = useState<string>("");

  // ⭐️ 1. 카카오맵 스크립트 로드
  useEffect(() => {
    if (!isKakaoMapLoaded) {
      window.kakao.maps.load(() => {
        setIsKakaoMapLoaded(true);
      });
    }
  }, [isKakaoMapLoaded]);

  // ⭐️ 2. (기본 기능) '내 근처' 찾기
  const getLocation = useCallback(() => {
    setIsLoading(true);
    setErrorMessage(null);
    setPlaces([]); // ⭐️ 새로고침 시 기존 마커 초기화

    setMapCenter(KOREA_CENTER); 
    setMapLevel(KOREA_LEVEL);

    if (!navigator.geolocation) {
      setErrorMessage(
        "Geolocation이 지원되지 않습니다. '지역 필터'를 이용해 주세요."
      );
      setIsLocationDenied(true);
      setIsLoading(false);
      return;
    }

    const handleSuccess = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;

      try {
        const markerList = await findNearbyPlaces(latitude, longitude, 5000);

        setPlaces(markerList);
        setMapCenter({ lat: latitude, lng: longitude });
        setMapLevel(LOCAL_LEVEL);
        setIsLocationDenied(false);
      } catch (error) {
        setErrorMessage("근처 공연장 로드에 실패했습니다.");
      }
      setIsLoading(false);
    };

    const handleError = (error: GeolocationPositionError) => {
      if (error.code === 1) {
        // 권한 거부 (핵심 폴백)
        setErrorMessage(
          "위치 권한이 거부되었습니다. '지역 필터'로 검색해 주세요."
        );
        setIsLocationDenied(true);
        setMapCenter(KOREA_CENTER);
        setMapLevel(KOREA_LEVEL);
      } else {
        setErrorMessage(`위치 찾기 오류: ${error.message}`);
      }
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  const handleFilterSearch = useCallback(async () => {
    if (!filterSido) {
      alert("시/도를 선택해주세요."); 
      return; 
    }

    setIsLoading(true);
    setErrorMessage(null);
    setPlaces([]);

    try {
      const markerList = await findPlacesByGugun(filterSido, filterGugun);
      setPlaces(markerList);

      if (markerList.length > 0) {
        setMapCenter({
          lat: markerList[0].latitude,
          lng: markerList[0].longitude,
        });
        setMapLevel(filterGugun ? GU_LEVEL : 10);
      } else {
        setErrorMessage("해당 지역에 공연장이 없습니다.");
      }
    } catch (error) {
      setErrorMessage("지역 필터 검색에 실패했습니다.");
    }
    setIsLoading(false);
  }, [filterSido, filterGugun]); // ⭐️ 4. 맵 스크립트 로드 완료 시 '현재 위치' 자동 실행

  useEffect(() => {
    if (isKakaoMapLoaded) {
      getLocation();
    }
  }, [isKakaoMapLoaded, getLocation]);

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          marginBottom: "10px",
          background: "#f4f4f4",
          padding: "10px",
          borderRadius: "8px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <strong>지역으로 찾기:</strong>
        <select
          value={filterSido}
          onChange={(e) => {
            const newSido = e.target.value as| "";
            setFilterSido(newSido);
            setFilterGugun(""); // Sido 변경 시 Gugun 초기화
          }}
        >
          <option value="">-- 시/도 선택 --</option>
          {(Object.keys(KOREA_REGIONS)).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={filterGugun}
          onChange={(e) => setFilterGugun(e.target.value)}
          disabled={!filterSido} // Sido가 ""이면 비활성화
        >
          <option value="">-- 시/군/구 (전체) --</option>
          {filterSido &&
            KOREA_REGIONS[filterSido]?.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}

        </select>
        <button onClick={handleFilterSearch} disabled={isLoading}>찾기</button>
      </div>
    
      {!isLocationDenied && (
        <button
          onClick={getLocation}
          disabled={isLoading}
          style={{ marginBottom: "10px" }}
        >
          {isLoading ? "위치 찾는 중..." : "📍 내 근처 새로고침"}
          {" "}
        </button>
      )}
      <p>표시된 공연장: {places.length}개</p>
      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
      )}
      {isKakaoMapLoaded ? (
        <KaKaoMap
          latitude={mapCenter.lat}
          longitude={mapCenter.lng}
          level={mapLevel}
          places={places}
          isKakaoMapLoaded={isKakaoMapLoaded}
        />
      ) : (
        <p>
          지도 로딩 중... 
        </p>
      )}
    </div>
  );
}

export default PerformancePlaceMap;
