import { useEffect, useRef, useState } from "react";
import { PlaceMarker } from "../../../apis/performanceplaceApi";
import * as S from "./KaKaoMap.styles";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  places: PlaceMarker[];
  isKakaoMapLoaded: boolean;
  level: number;
  currentLocation: { lat: number; lng: number } | null;
  onMarkerClick: (place: PlaceMarker) => void;
  onMyLocationClick: () => void;
}

function KaKaoMap({
  latitude,
  longitude,
  places,
  isKakaoMapLoaded,
  level,
  currentLocation,
  onMarkerClick,
  onMyLocationClick,
}: KakaoMapProps) {
  const mapContainer = useRef(null);
  const mapRef = useRef<any>(null); // kakao.maps.Map
  const clustererRef = useRef<any>(null); // kakao.maps.MarkerClusterer
  const myLocationMarkerRef = useRef<kakao.maps.Marker | null>(null);

  const [mapType, setMapType] = useState<"ROADMAP" | "HYBRID">("ROADMAP");
  const [currentMapLevel, setCurrentMapLevel] = useState(level);

  const MIN_MAP_LEVEL = 1;
  const MAX_MAP_LEVEL = 9;
  useEffect(() => {
    if (!isKakaoMapLoaded || !window.kakao || !mapContainer.current) return;

    if (!mapRef.current) {
      const mapOption = {
        center: new window.kakao.maps.LatLng(36.5, 127.5),
        level: 9,
      };
      const newMap = new window.kakao.maps.Map(mapContainer.current, mapOption);
      mapRef.current = newMap;
      newMap.setMaxLevel(MAX_MAP_LEVEL);

      clustererRef.current = new window.kakao.maps.MarkerClusterer({
        map: newMap,
        averageCenter: true,
        minLevel: 5,
        gridSize: 120,
        minClusterSize: 1,
      });

      const updateZoomUI = () => {
        setCurrentMapLevel(newMap.getLevel());
      };
      window.kakao.maps.event.addListener(newMap, "zoom_changed", updateZoomUI);
      updateZoomUI();
    }
  }, [isKakaoMapLoaded]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !window.kakao) return;

    const newCenter = new window.kakao.maps.LatLng(latitude, longitude);
    if (map.getLevel() !== level) {
      map.setLevel(level);
    }
    map.setCenter(newCenter);
    clustererRef.current?.redraw();
  }, [latitude, longitude, level]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !window.kakao) return;

    const newMapType =
      mapType === "HYBRID"
        ? window.kakao.maps.MapTypeId.HYBRID
        : window.kakao.maps.MapTypeId.ROADMAP;
    map.setMapTypeId(newMapType);
  }, [mapType]);

  useEffect(() => {
    if (!isKakaoMapLoaded || !window.kakao) return;
    const map = mapRef.current;

    if (currentLocation && map) {
      const currentPosition = new window.kakao.maps.LatLng(
        currentLocation.lat,
        currentLocation.lng
      );
      if (myLocationMarkerRef.current) {
        myLocationMarkerRef.current.setPosition(currentPosition);
      } else {
        const myPinIconUrl = "/my_pin.svg";
        const myPinImageSize = new window.kakao.maps.Size(50, 62);
        const myPinImageOption = {
          offset: new window.kakao.maps.Point(15, 42),
        };
        const myLocationMarkerImage = new window.kakao.maps.MarkerImage(
          myPinIconUrl,
          myPinImageSize,
          myPinImageOption
        );

        myLocationMarkerRef.current = new window.kakao.maps.Marker({
          position: currentPosition,
          map: map,
          title: "내 위치",
          image: myLocationMarkerImage,
        });
      }
    } else if (!currentLocation && myLocationMarkerRef.current) {
      myLocationMarkerRef.current.setMap(null);
      myLocationMarkerRef.current = null;
    }
  }, [currentLocation, isKakaoMapLoaded]);

  useEffect(() => {
    const clusterer = clustererRef.current;
    if (!clusterer || !window.kakao) return;

    clusterer.clear();

    const imageSrc = "/crimson_marker.svg";
    // 일반 마커
    const imageSize = new window.kakao.maps.Size(32, 80); 
    const imageOption = { offset: new window.kakao.maps.Point(16, 55) };
    // 호버 마커
    const hoverSize = new window.kakao.maps.Size(34, 100); 
    const hoverOption = { offset: new window.kakao.maps.Point(16, 65) }; 
    // 호버 마커 생성 
    const hoverImage = new window.kakao.maps.MarkerImage(imageSrc, hoverSize, hoverOption);
    // 일반 마커 생성
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    const newMarkers = places.map((place) => {
      const markerPosition = new window.kakao.maps.LatLng(
        place.latitude,
        place.longitude
      );
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        title: place.prfPlcName,
        image: markerImage,
      });
      window.kakao.maps.event.addListener(marker, "click", function () {
        onMarkerClick(place);
      });

      // 호버 상태
      window.kakao.maps.event.addListener(marker, "mouseover", function() {
        marker.setImage(hoverImage);
        marker.setZIndex(10); 
      });
      // 호버 상태 해제
      window.kakao.maps.event.addListener(marker, "mouseout", function() {
        marker.setImage(markerImage);
        marker.setZIndex(0);
      });
      return marker;
    });

    clusterer.addMarkers(newMarkers);
  }, [places, onMarkerClick]);

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const map = mapRef.current;
    if (!map) return;
    const newLevel =
      MAX_MAP_LEVEL - parseInt(e.target.value, 10) + MIN_MAP_LEVEL;
    map.setLevel(newLevel);
  };

  return (
    <S.KakaoMapContainer>
      <S.KakaoMapDiv id="map" ref={mapContainer} />

      <S.MapTypeContainer>
        <S.MapTypeButton
          active={mapType === "ROADMAP"}
          onClick={() => setMapType("ROADMAP")}
        >
          지도
        </S.MapTypeButton>
        <S.MapTypeButton
          active={mapType === "HYBRID"}
          onClick={() => setMapType("HYBRID")}
        >
          스카이뷰
        </S.MapTypeButton>
      </S.MapTypeContainer>

      <S.MyLocationButton onClick={onMyLocationClick}>
        <img src="/my_location.svg" alt="내 위치" width={24} height={24} />
      </S.MyLocationButton>

      <S.MapZoomControlContainer>
        <S.MapLevelLabel>레벨: {currentMapLevel}</S.MapLevelLabel>
        <S.CustomVSlider
          type="range"
          min={MIN_MAP_LEVEL}
          max={MAX_MAP_LEVEL}
          value={MAX_MAP_LEVEL - currentMapLevel + MIN_MAP_LEVEL}
          onChange={handleZoomChange}
        />
      </S.MapZoomControlContainer>
    </S.KakaoMapContainer>
  );
}

export default KaKaoMap;
