import { useCallback, useState } from "react";

interface CurrentPositionProps {
  onRegionDetected: (region: string) => void; // 부모로 전달할 콜백
}

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  region: string | null;
}

function CurrentPosition({ onRegionDetected }: CurrentPositionProps) {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    region: null,
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

    // ✅ 위도,경도 → 시도명 변환
    const getAddress = (lat: number, lng: number) => {
      if (!window.kakao?.maps?.services) {
        console.error("카카오맵 services 라이브러리가 로드되지 않았습니다.");
        return;
      }

      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2Address(lng, lat, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const addr = result[0];
          const region = addr.address.region_1depth_name; // 시도명 (예: 부산광역시)

          setLocation((prev) => ({
            ...prev,
            region,
          }));

          console.log("현재 시도:", region);
          // ✅ 부모에게 전달
          onRegionDetected(region);
        }
      });
    };

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude, error: null, region: null });
      getAddress(latitude, longitude);
      setIsLoading(false);
    };

    const handleError = (error: GeolocationPositionError) => {
      let errorMessage = error.message;
      if (error.code === 1) errorMessage = "위치 정보 접근이 거부되었습니다.";
      setLocation((errorState) => ({ ...errorState, error: errorMessage }));
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    });
  }, [onRegionDetected]);

  return (
    <div>
      <button onClick={getLocation}>📍 현재 위치 찾기</button>
      {location.region && <p>시도: {location.region}</p>}
      {!isLoading && location.error && (
        <p style={{ color: "red", whiteSpace: "pre-wrap" }}>{location.error}</p>
      )}
    </div>
  );
}

export default CurrentPosition;
