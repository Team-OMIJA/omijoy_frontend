// src/components/map/PerformancePlaceMap.tsx

import { useCallback, useState, useEffect } from "react";
import KaKaoMap from "./KaKaoMap";
import { sendLocation, PlaceMarker } from "../../../apis/performanceplaceApi";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  region1: string | null;
  region2: string | null;
}

function PerformancePlaceMap() {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    region1: null,
    region2: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [places, setPlaces] = useState<PlaceMarker[]>([]);

  const [isKakaoMapLoaded, setIsKakaoMapLoaded] = useState(false);

  const executeGeocoder = useCallback(
    (lat: number, lng: number) => {
      if (!window.kakao.maps.services) {
        console.error("카카오맵 services 라이브러리가 초기화되지 않았습니다.");
        return;
      }

      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2Address(lng, lat, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const addr = result[0];
          const region1 = addr.address.region_1depth_name;
          const region2 = addr.address.region_2depth_name;

          setLocation((prev) => ({
            ...prev,
            region1,
            region2,
          }));

          sendLocation(region1, region2)
            .then((markerList: PlaceMarker[]) => {
              setPlaces(markerList);
              console.log(
                `✅ ${markerList.length}개의 공연장 데이터를 수신했습니다.`
              );
            })
            .catch((error: any) => {
              console.error("공연장 데이터 로드 실패:", error);
            });
        }
      });
    },
    [setLocation, setPlaces]
  );

  const getLocation = useCallback(() => {
    setIsLoading(true);
    setLocation((loca) => ({
      ...loca,
      latitude: null,
      longitude: null,
      error: null,
    }));
    setPlaces([]);

    if (!navigator.geolocation) {
      // ... (브라우저 오류 처리 생략)
      setIsLoading(false);
      return;
    }

    const getAddress = (lat: number, lng: number) => {
      // isKakaoMapLoaded가 false일 때만 load 함수를 호출하여 중복 실행을 방지합니다.
      if (!isKakaoMapLoaded) {
        window.kakao.maps.load(() => {
          setIsKakaoMapLoaded(true);
          executeGeocoder(lat, lng);
        });
      } else {
        // 이미 로드된 경우, 바로 executeGeocoder를 실행합니다.
        executeGeocoder(lat, lng);
      }
    };

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;

      setLocation({
        latitude,
        longitude,
        error: null,
        region1: null,
        region2: null,
      });

      getAddress(latitude, longitude);
      setIsLoading(false);
    };

    const handleError = (error: GeolocationPositionError) => {
      let errorMessage = error.message;
      if (error.code === 1) {
        errorMessage = "위치 정보 접근이 거부되었습니다.";
      }
      setLocation((errorState) => ({ ...errorState, error: errorMessage }));
      setIsLoading(false);
    };

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
  }, [executeGeocoder]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return (
    <div>
      <p>공연장 개수: {places.length}개</p>
      <button onClick={getLocation}>현재 위치 찾기</button>

      {!isLoading &&
      location.latitude &&
      location.longitude &&
      isKakaoMapLoaded ? (
        <KaKaoMap
          latitude={location.latitude}
          longitude={location.longitude}
          places={places}
          isKakaoMapLoaded={isKakaoMapLoaded} // isKakaoMapLoaded prop 추가
        />
      ) : (
        !isLoading && <p>지도를 표시할 위치 정보가 없습니다.</p>
      )}
    </div>
  );
}

export default PerformancePlaceMap;
