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
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const clustererRef = useRef<kakao.maps.MarkerClusterer | null>(null);
  const infowindowRef = useRef<kakao.maps.InfoWindow | null>(null);
  const myLocationMarkerRef = useRef<kakao.maps.Marker | null>(null);

  useEffect(() => {
    if (!isKakaoMapLoaded || !window.kakao || !mapContainer.current) return;

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
        gridSize: 100,
        minClusterSize: 1,
      });
      infowindowRef.current = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      const controlContainer = document.createElement("div");
      controlContainer.style.cssText = `
        position: absolute; top: 15px; right: 15px; padding: 5px 10px;
        background: white; border: 1px solid #ccc; border-radius: 5px;
        font-size: 12px; z-index: 2; display: flex; align-items: center;
        justify-content: space-between; flex-direction: column; gap: 10px;
        pointer-events: none; 
      `;
      const levelLabel = document.createElement("span");
      levelLabel.style.fontWeight = "bold";
      levelLabel.style.minWidth = "50px";
      levelLabel.style.textAlign = "center";
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
        pointer-events: auto;
        `;
      levelSlider.oninput = () => {
        const sliderValue = parseInt(levelSlider.value, 10);
        const newLevel = maxMapLevel - sliderValue + minMapLevel;
        newMap.setLevel(newLevel);
      };
      controlContainer.appendChild(levelLabel);
      controlContainer.appendChild(levelSlider);
      newMap.getNode().appendChild(controlContainer);

      const myLocationBtn = document.createElement("div");
      myLocationBtn.style.cssText = `
        position: absolute; 
        top: 15px; 
        left: 15px;
        cursor: pointer; 
        z-index: 10; /* 
        pointer-events: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none; 
        border: none;
        box-shadow: none;
        padding: 0;
      `;
      myLocationBtn.onclick = onMyLocationClick;

      const btnIcon = document.createElement("img");
      btnIcon.src = "/my_location.svg";

      const newSize = 20 * 2;
      btnIcon.style.width = `${newSize}px`;
      btnIcon.style.height = `${newSize}px`;
      btnIcon.alt = "내 위치";

      btnIcon.style.filter = "brightness(0)";

      myLocationBtn.appendChild(btnIcon);
      newMap.getNode().appendChild(myLocationBtn);

      const mapTypeContainer = document.createElement("div");
      mapTypeContainer.style.cssText = `
        position: absolute; 
        top: 60px; 
        left: 15px;
        z-index: 10;
        border-radius: 5px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        overflow: hidden;
      `;

      const roadmapBtn = document.createElement("button");
      roadmapBtn.innerHTML = "지도";
      roadmapBtn.style.cssText =
        "padding: 5px 8px; font-size: 12px; border: none; background: #e9e9e9; cursor: pointer;";

      const hybridBtn = document.createElement("button");
      hybridBtn.innerHTML = "스카이뷰";
      hybridBtn.style.cssText =
        "padding: 5px 8px; font-size: 12px; border: none; background: white; cursor: pointer;";

      const setActiveButton = (
        activeBtn: HTMLButtonElement,
        inactiveBtn: HTMLButtonElement
      ) => {
        activeBtn.style.background = "#e9e9e9";
        activeBtn.style.fontWeight = "bold";
        inactiveBtn.style.background = "white";
        inactiveBtn.style.fontWeight = "normal";
      };

      setActiveButton(roadmapBtn, hybridBtn);

      roadmapBtn.onclick = () => {
        newMap.setMapTypeId(window.kakao.maps.MapTypeId.ROADMAP);
        setActiveButton(roadmapBtn, hybridBtn);
      };

      hybridBtn.onclick = () => {
        newMap.setMapTypeId(window.kakao.maps.MapTypeId.HYBRID);
        setActiveButton(hybridBtn, roadmapBtn);
      };

      mapTypeContainer.appendChild(roadmapBtn);
      mapTypeContainer.appendChild(hybridBtn);
      newMap.getNode().appendChild(mapTypeContainer);

      if (currentLocation) {
        const currentPosition = new window.kakao.maps.LatLng(
          currentLocation.lat,
          currentLocation.lng
        );
        const myMarker = new window.kakao.maps.Marker({
          position: currentPosition,
          map: mapRef.current,
          title: "내 위치",
          image: myLocationMarkerImage,
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

    if (!currentLocation && myLocationMarkerRef.current) {
      myLocationMarkerRef.current.setMap(null);
      myLocationMarkerRef.current = null;
    }

    if (currentLocation && myLocationMarkerRef.current) {
      myLocationMarkerRef.current.setPosition(newCenter);
    } else if (currentLocation && map && !myLocationMarkerRef.current) {
      const myMarker = new window.kakao.maps.Marker({
        position: newCenter,
        map: map,
        title: "내 위치",
        image: myLocationMarkerImage,
      });
      myLocationMarkerRef.current = myMarker;
    }

    map.setLevel(level);
    map.setCenter(newCenter);

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
        console.log("마커 클릭됨:", place.prfPlcName, place.prfPlcId);
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
    onMyLocationClick,
  ]);

  return (
    <div style={{ position: "relative", width: "100%", height: "500px" }}>
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "500px" }}
      ></div>
    </div>
  );
}

export default KaKaoMap;
