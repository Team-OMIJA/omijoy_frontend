import { useCallback, useState, useEffect } from "react";
import KaKaoMap from "./KaKaoMap";
import {
  findNearbyPlaces,
  findPlacesByGugun,
  PlaceMarker,
} from "../../../apis/performanceplaceApi";
import { KOREA_REGIONS } from "../../../utils/regions";
import PerformancePlaceModal from "../PerformancePlaceModal/PerformancePlaceModal";
import RegionFilterSidebar from "../PerformancePlaceModal/RegionFilterSidebarModal";

type SidoKey = keyof typeof KOREA_REGIONS;

const KOREA_CENTER = { lat: 36.5, lng: 127.5 };
const KOREA_LEVEL = 12;
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tempSido, setTempSido] = useState<SidoKey | "">("");
  const [tempGugun, setTempGugun] = useState<string>("");
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceMarker | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
        { enableHighAccuracy: true, maximumAge: 10000 }
      );
    }
  }, [isKakaoMapLoaded]);

  const getLocation = () => {
    setIsLoading(true);
    setErrorMessage(null);
    setPlaces([]);

    if (!navigator.geolocation) {
      setErrorMessage("Geolocation이 지원되지 않습니다.");
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
      maximumAge: 10000,
    });
  };

  const handleMarkerClick = useCallback((placeData: PlaceMarker) => {
    setSelectedPlace(placeData);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPlace(null);
  }, []);

  const handleFilterApply = async () => {
    if (!tempSido) {
      alert("시/도를 선택해주세요.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setPlaces([]);
    setCurrentLocation(null);

    try {
      const markerList = await findPlacesByGugun(tempSido, tempGugun);
      setPlaces(markerList);

      if (markerList.length > 0) {
        setMapCenter({
          lat: markerList[0].latitude,
          lng: markerList[0].longitude,
        });
        setMapLevel(tempGugun ? GU_LEVEL : 10);
      } else {
        setErrorMessage("해당 지역에 공연장이 없습니다.");
      }
    } catch (error) {
      setErrorMessage("지역 필터 검색에 실패했습니다.");
    }
    setIsLoading(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        touchAction: "none",
        padding: 0,
        margin: 0,
        position: "relative",
      }}
    >
      <div
        style={{ flex: 1, position: "relative", width: "100%", height: "100%" }}
      >
        {isKakaoMapLoaded && (
          <RegionFilterSidebar
            selectedSido={tempSido}
            selectedGugun={tempGugun}
            onSidoChange={setTempSido}
            onGugunChange={setTempGugun}
            onApply={handleFilterApply}
          />
        )}

        {errorMessage && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 20,
              background: "rgba(255, 255, 255, 0.95)",
              padding: "8px 16px",
              borderRadius: "20px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              fontSize: "14px",
              fontWeight: "bold",
              color: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>{errorMessage}</span>
          </div>
        )}
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
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#f0f0f0",
            }}
          >
            지도를 불러오는 중입니다...
          </div>
        )}
      </div>

      {isModalOpen && selectedPlace && (
        <PerformancePlaceModal place={selectedPlace} onClose={closeModal} />
      )}
    </div>
  );
}

export default PerformancePlaceMap;
