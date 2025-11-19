import { instance } from "./instance";

export interface PlaceMarker {
  prfPlcId: string;
  sido: string;
  gugun: string;
  prfPlcName: string;
  latitude: number;
  longitude: number;
  address: string | null;
  tel: string | null;
  url: string | null;
  parkBarrier: string | null;
  eleve : string | null;
  parkingLot : string | null;
}

export interface PrfPlcModal {
  prfId: string;
  posterImgUrl: string | null;
}

export const findPerformancesByPlaceId = async (
  prfPlcId: string
): Promise<PrfPlcModal[]> => {
  try {
    const res = await instance.get(`/performanceplace/by-place/${prfPlcId}`);
    return res.data as PrfPlcModal[];
  } catch (err) {
    console.error("findPerformancesByPlaceId API 오류:", err);
    throw err;
  }
};

export const findNearbyPlaces = async (
  latitude: number,
  longitude: number,
  radius: number = 5000 // 5km
): Promise<PlaceMarker[]> => {
  const dataToSend = { latitude, longitude, radius };
  try {
    const res = await instance.post(`/performanceplace/nearby`,dataToSend);
    return res.data as PlaceMarker[];
  } catch (err) {
    console.error("findNearbyPlaces API 오류:", err);
    throw err;
  }
};

export const findPlacesByGugun = async (
  sido: string,
  gugun: string
): Promise<PlaceMarker[]> => {
  try {
    const res = await instance.get(`/performanceplace/byGugun`, {
      params: { sido, gugun },
    });
    return res.data as PlaceMarker[];
  } catch (err) {
    console.error("findPlacesByGugun API 오류:", err);
    throw err;
  }
};
