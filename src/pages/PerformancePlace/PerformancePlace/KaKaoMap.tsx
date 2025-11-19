import { useEffect, useRef } from "react";
import { PlaceMarker } from "../../../apis/performanceplaceApi";
import "./PerformancePlaceStyles.css";

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
  const onMyLocationClickRef = useRef(onMyLocationClick);

  useEffect(() => {
    onMyLocationClickRef.current = onMyLocationClick;
  }, [onMyLocationClick]);

  useEffect(() => {
    if (!isKakaoMapLoaded || !window.kakao || !mapContainer.current) return;

    if (!mapRef.current) {
      const mapOption = {
        center: new window.kakao.maps.LatLng(36.5, 127.5),
        level: 9,
      };
      const newMap = new window.kakao.maps.Map(mapContainer.current, mapOption);
      mapRef.current = newMap;
      newMap.setMaxLevel(9);

      clustererRef.current = new window.kakao.maps.MarkerClusterer({
        map: newMap,
        averageCenter: true,
        minLevel: 4,
        gridSize: 100,
        minClusterSize: 1,
      });
      infowindowRef.current = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      const controlContainer = document.createElement("div");
      controlContainer.className = "map-zoom-control-container";

      const levelLabel = document.createElement("span");
      levelLabel.className = "map-level-label";

      const levelSlider = document.createElement("input");
      levelSlider.type = "range";
      const minMapLevel = 1;
      const maxMapLevel = 9;
      levelSlider.min = String(minMapLevel);
      levelSlider.max = String(maxMapLevel);
      levelSlider.className = "custom-v-slider";

      levelSlider.oninput = () => {
        const sliderValue = parseInt(levelSlider.value, 10);
        const newLevel = maxMapLevel - sliderValue + minMapLevel;
        newMap.setLevel(newLevel);
      };
      controlContainer.appendChild(levelLabel);
      controlContainer.appendChild(levelSlider);
      newMap.getNode().appendChild(controlContainer);

      const myLocationBtn = document.createElement("div");
      myLocationBtn.className = "my-location-btn";

      myLocationBtn.onclick = () => {
        onMyLocationClickRef.current();
      };

      const btnIcon = document.createElement("img");
      btnIcon.src = "/my_location.svg";
      btnIcon.className = "my-location-btn-icon";
      btnIcon.alt = "내 위치";

      myLocationBtn.appendChild(btnIcon);
      newMap.getNode().appendChild(myLocationBtn);

      const mapTypeContainer = document.createElement("div");
      mapTypeContainer.className = "map-type-container";

      const roadmapBtn = document.createElement("button");
      roadmapBtn.innerHTML = "지도";
      roadmapBtn.className = "map-type-btn";

      const hybridBtn = document.createElement("button");
      hybridBtn.innerHTML = "스카이뷰";
      hybridBtn.className = "map-type-btn";

      const setActiveButton = (
        activeBtn: HTMLButtonElement,
        inactiveBtn: HTMLButtonElement
      ) => {
        activeBtn.classList.add("active");
        activeBtn.classList.remove("inactive");
        inactiveBtn.classList.add("inactive");
        inactiveBtn.classList.remove("active");
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

      const updateZoomUI = () => {
        const currentLevel = newMap.getLevel();
        levelLabel.innerHTML = `레벨: ${currentLevel}`;
        levelSlider.value = String(maxMapLevel - currentLevel + minMapLevel);
      };
      window.kakao.maps.event.addListener(newMap, "zoom_changed", updateZoomUI);
      updateZoomUI();
    }
  }, [isKakaoMapLoaded]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !window.kakao) return;

    const newCenter = new window.kakao.maps.LatLng(latitude, longitude);
    map.setLevel(level);
    map.setCenter(newCenter);
    clustererRef.current?.redraw();
  }, [latitude, longitude, level]);

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
        onMarkerClick(place);
      });
      return marker;
    });

    clusterer.addMarkers(newMarkers);
  }, [places, onMarkerClick]);

  return (
    <div className="kakao-map-container">
      <div id="map" ref={mapContainer} className="kakao-map"></div>
    </div>
  );
}

export default KaKaoMap;
