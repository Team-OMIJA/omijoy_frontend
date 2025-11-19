import { useCallback, useState, useEffect } from "react";
import KaKaoMap from "./KaKaoMap";
import {
  findNearbyPlaces,
  findPlacesByGugun,
  PlaceMarker,
} from "../../../apis/performanceplaceApi";
import { KOREA_REGIONS } from "../../../utils/regions";
import PerformancePlaceModal from "../PerformancePlaceModal/PerformancePlaceModal";

type SidoKey = keyof typeof KOREA_REGIONS;

const KOREA_CENTER = { lat: 36.5, lng: 127.5 };
const KOREA_LEVEL = 9;
const LOCAL_LEVEL = 3;
const GU_LEVEL = 7;

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [filterSido, setFilterSido] = useState<SidoKey | "">("");
  const [filterGugun, setFilterGugun] = useState<string>("");

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceMarker | null>(null);

  useEffect(() => {
    if (!isKakaoMapLoaded && window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        setIsKakaoMapLoaded(true);
      });
    }
  }, [isKakaoMapLoaded]);

  useEffect(() => {
    if (isKakaoMapLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
          setMapLevel(LOCAL_LEVEL + 1);
        },
        (error) => {
          console.error("초기 위치 로드 실패:", error.message);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000
        }
        
      );
    }
    
  }, [isKakaoMapLoaded]);

  const getLocation = () => {
    setIsLoading(true);
    setErrorMessage(null);
    setPlaces([]);

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
        setCurrentLocation({ lat: latitude, lng: longitude });

        const randomOffset = (Math.random() - 0.5) * 0.0000001;
        setMapCenter({ lat: latitude + randomOffset, lng: longitude });
        setMapLevel(LOCAL_LEVEL);
        setIsLocationDenied(false);
      } catch (error) {
        setErrorMessage("근처 공연장 로드에 실패했습니다.");
        setCurrentLocation(null);
      }
      setIsLoading(false);
    };

    const handleError = (error: GeolocationPositionError) => {
      if (error.code === 1) {
        setErrorMessage("위치 권한이 거부되었습니다.");
        setIsLocationDenied(true);
        setMapCenter(KOREA_CENTER);
        setMapLevel(KOREA_LEVEL);
      } else {
        setErrorMessage(`위치 찾기 오류: ${error.message}`);
      }
      setIsLoading(false);
    };
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      maximumAge: 10000
    });
  };

  const handleMarkerClick = useCallback((placeData: PlaceMarker) => {
    console.log("모달 열기 시도:", placeData.prfPlcName, placeData.prfPlcId);
    setSelectedPlace(placeData);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPlace(null);
  }, []);

  const handleFilterSearch = useCallback(async () => {
    if (!filterSido) {
      alert("시/도를 선택해주세요.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setPlaces([]);

    setCurrentLocation(null);

    try {
      const markerList = await findPlacesByGugun(
        filterSido as string,
        filterGugun
      );

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
  }, [filterSido, filterGugun]);

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
            const newSido = e.target.value as SidoKey | "";
            setFilterSido(newSido);
            setFilterGugun("");
          }}
        >
          <option value="">-- 시/도 선택 --</option>
          {Object.keys(KOREA_REGIONS).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={filterGugun}
          onChange={(e) => setFilterGugun(e.target.value)}
          disabled={!filterSido}
        >
          <option value="">-- 시/군/구 (전체) --</option>
          {filterSido &&
            KOREA_REGIONS[filterSido as SidoKey]?.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
        </select>
        <button onClick={handleFilterSearch} disabled={isLoading}>
          찾기
        </button>
      </div>

      <p>표시된 공연장: {places.length}개</p>
      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
      )}

      <div
        style={{
          width: "100%",
          height: "500px",
          position: "relative",
          background: "#f8f8f8",
          contain: "layout paint size",
        }}
      >
        {isKakaoMapLoaded ? (
          <KaKaoMap
            latitude={mapCenter.lat}
            longitude={mapCenter.lng}
            level={mapLevel}
            places={places}
            isKakaoMapLoaded={isKakaoMapLoaded}
            currentLocation={currentLocation}
            onMarkerClick={handleMarkerClick}
            onMyLocationClick={getLocation}
          />
        ) : (
          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#666",
            }}
          >
            지도 로딩 중...
          </p>
        )}
      </div>
      {isModalOpen && selectedPlace? (
        <PerformancePlaceModal 
        place={selectedPlace} 
        onClose={closeModal} 
        />
      ) : null}
    </div>
  );
}

export default PerformancePlaceMap;
