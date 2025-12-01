import { PlaceMarker } from "../apis/performanceplaceApi";
import { KOREA_REGIONS } from "../utils/regions";

export interface KakaoMapProps {
  latitude: number;
  longitude: number;
  places: PlaceMarker[];
  isKakaoMapLoaded: boolean;
  level: number;
  currentLocation: { lat: number; lng: number } | null;
  onMarkerClick: (place: PlaceMarker) => void;
  onMyLocationClick: () => void;
}

export interface PerformancePlaceModalProps {
  place: PlaceMarker;
  onClose: (updatedFlag?: boolean) => void;
}

export type SidoKey = keyof typeof KOREA_REGIONS;

export interface RegionFilterSidebarProps {
  selectedSido: SidoKey | "";
  selectedGugun: string;
  onSidoChange: (sido: SidoKey | "") => void;
  onGugunChange: (gugun: string) => void;
  onApply: () => void;
}