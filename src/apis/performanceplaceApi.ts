// src/apis/performanceplaceApi.ts

import axios from "axios";

// ⭐️ 백엔드의 PlaceMarker record와 동일한 인터페이스
export interface PlaceMarker {
  prfPlcId: string;
  sido: string;
  gugun: string;
  prfPlcName: string;
  latitude: number;
  longitude: number;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * ⭐️ 1. '내 근처' API (캐시 기반, sido가 필요 없음)
 */
export const findNearbyPlaces = async (
  latitude: number,
  longitude: number,
  radius: number = 5000 // 기본 5km
): Promise<PlaceMarker[]> => {
  const dataToSend = { latitude, longitude, radius };
  try {
    const res = await axios.post(
      `${BASE_URL}/performanceplace/nearby`,
      dataToSend
    );
    return res.data as PlaceMarker[];
  } catch (err) {
    console.error("findNearbyPlaces API 오류:", err);
    throw err;
  }
};

/**
 * ⭐️ 2. '지역 필터' API
 */
export const findPlacesByGugun = async (
  sido: string,
  gugun: string
): Promise<PlaceMarker[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/performanceplace/byGugun`, {
      params: { sido, gugun },
    });
    return res.data as PlaceMarker[];
  } catch (err) {
    console.error("findPlacesByGugun API 오류:", err);
    throw err;
  }
};
