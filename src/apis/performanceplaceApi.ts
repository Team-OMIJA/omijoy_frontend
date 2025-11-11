import axios from "axios";

export interface PlaceMarker {
  prfPlcId: string;
  sido: string;
  gugun: string;
  prfPlcName: string;
  latitude: number;
  longitude: number;
  address : string | null;
  tel : string | null;
  url : string | null;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const findNearbyPlaces = async (
  latitude: number,
  longitude: number,
  radius: number = 5000 // 5km 설정
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
