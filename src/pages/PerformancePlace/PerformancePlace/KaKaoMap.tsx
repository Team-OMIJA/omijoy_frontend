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
  isKakaoMapLoaded: boolean;
  level: number;
  currentLocation: { lat: number; lng: number } | null;
  onMarkerClick: (place: PlaceMarker) => void;
}

function KaKaoMap({
  latitude,
  longitude,
  places,
  isKakaoMapLoaded,
  level,
  currentLocation,
  onMarkerClick,
}: KakaoMapProps) {
  const mapContainer = useRef(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const clustererRef = useRef<kakao.maps.MarkerClusterer | null>(null);
  const infowindowRef = useRef<kakao.maps.InfoWindow | null>(null);
  const myLocationMarkerRef = useRef<kakao.maps.Marker | null>(null);

  useEffect(() => {
    if (!isKakaoMapLoaded || !window.kakao || !mapContainer.current) return;

    const mapOption = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: level,
    };

    if (!mapRef.current) {
      const newMap = new window.kakao.maps.Map(mapContainer.current, mapOption);
      mapRef.current = newMap;
      newMap.setMaxLevel(12);

      clustererRef.current = new window.kakao.maps.MarkerClusterer({
        map: newMap,
        averageCenter: true,
        minLevel: 4,
        maxLevel: 12,
        gridSize: 140,
        minClusterSize: 2,
      });
      infowindowRef.current = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      const controlContainer = document.createElement("div");
      controlContainer.style.cssText = `
        position: absolute; top: 15px; right: 15px; padding: 5px 10px;
        background: white; border: 1px solid #ccc; border-radius: 5px;
        font-size: 12px; z-index: 2; display: flex; align-items: center;
        justify-content: space-between; lex-direction: column; gap: 10px;
        pointer-events: none; 
`;

      const levelLabel = document.createElement("span");
      levelLabel.style.fontWeight = "bold";

      const levelSlider = document.createElement("input");
      levelSlider.type = "range";
      const minMapLevel = 1;
      const maxMapLevel = 12;
      levelSlider.min = String(minMapLevel);
      levelSlider.max = String(maxMapLevel);
      levelSlider.className = "custom-v-slider";
      levelSlider.style.cssText = `
        -webkit-appearance: slider-vertical; writing-mode: bt-lr;
        width: 8px; height: 100px; cursor: pointer; padding: 0 5px;
        pointer-events: auto; /* ⭐️ 2. 슬라이더는 클릭 이벤트를 다시 받음 */
        `;
      levelSlider.oninput = () => {
        const sliderValue = parseInt(levelSlider.value, 10);
        const newLevel = maxMapLevel - sliderValue + minMapLevel;
        newMap.setLevel(newLevel);
      };

      controlContainer.appendChild(levelLabel);
      controlContainer.appendChild(levelSlider);
      newMap.getNode().appendChild(controlContainer);

      if (currentLocation) {
        const currentPosition = new window.kakao.maps.LatLng(
          currentLocation.lat,
          currentLocation.lng
        );
        const myMarker = new window.kakao.maps.Marker({
          position: currentPosition,
          map: mapRef.current,
          title: "내 위치",
        });
        myLocationMarkerRef.current = myMarker;
      }

      const updateZoomUI = () => {
        const currentLevel = newMap.getLevel();
        levelLabel.innerHTML = `레벨: ${currentLevel}`;
        levelSlider.value = String(maxMapLevel - currentLevel + minMapLevel);
      };

      window.kakao.maps.event.addListener(newMap, "zoom_changed", updateZoomUI);
      updateZoomUI();
    }

    const map = mapRef.current;
    const infowindow = infowindowRef.current;
    const clusterer = clustererRef.current;

    if (!map || !infowindow || !clusterer) return;

    const newCenter = new window.kakao.maps.LatLng(latitude, longitude);

    if (currentLocation && myLocationMarkerRef.current) {
      myLocationMarkerRef.current.setPosition(newCenter);
    } else if (currentLocation && map && !myLocationMarkerRef.current) {
      const myMarker = new window.kakao.maps.Marker({
        position: newCenter,
        map: map,
        title: "내 위치",
      });
      myLocationMarkerRef.current = myMarker;
    }

    map.setLevel(level);
    map.panTo(newCenter);

    clusterer.clear();

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
        console.log("마커 클릭됨:", place.prfPlcName);
        onMarkerClick(place);
      });
      return marker;
    });

    clusterer.addMarkers(newMarkers);
  }, [
    latitude,
    longitude,
    places,
    isKakaoMapLoaded,
    level,
    currentLocation,
    onMarkerClick,
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
