import { useCallback, useState } from "react";
import KakaoMap from "./KaKaoMap";
import { sendLocation } from "../../../apis/performanceplaceApi";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  error: string | null;
}

function PerformancePlaceMap() {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const getLocation = useCallback(() => {
    setIsLoading(true);
    setLocation((loca) => ({
      ...loca,
      latitude: null,
      longitude: null,
      error: null,
    }));

    if (!navigator.geolocation) {
      setLocation((prevState) => ({
        ...prevState,
        error: "이 브라우저에서는 위치 정보가 지원되지 않습니다.",
      }));
      setIsLoading(false);
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords;

      if (accuracy > 200) {
        setLocation((currentState) => ({
          ...currentState,
          error: `위치 정확도가 낮습니다 (오차: ${Math.round(accuracy)}`,
        }));
        setIsLoading(false);
        return;
      }
      setLocation({
        latitude,
        longitude,
        accuracy,
        error: null,
      });
      setIsLoading(false);
      sendLocation(latitude, longitude); // 조건이 통과하면 현재 위치를 백엔드로 전송
      console.log(latitude, longitude); // 현재 위치가 제대로 들어갔나 확인 용
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
  }, []);

  return (
    <div>
      <h1>현재 위치</h1>
      <p>위도: {location.latitude}</p>
      <p>경도: {location.longitude}</p>
      <p>정확도: {location.accuracy}</p>
      <button onClick={getLocation}>현재 위치 찾기</button>
      {!isLoading && location.error && (
        <p style={{ color: "red", whiteSpace: "pre-wrap" }}>{location.error}</p>
      )}

      {!isLoading && location.latitude && location.longitude ? (
        <KakaoMap latitude={location.latitude} longitude={location.longitude} />
      ) : (
        !isLoading && <p>지도를 표시할 위치 정보가 없습니다.</p>
      )}
    </div>
  );
}

export default PerformancePlaceMap
