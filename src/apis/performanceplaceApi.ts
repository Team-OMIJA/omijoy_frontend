// src/apis/performanceplaceApi.ts

import axios from "axios";

// ⭐️ 1. 백엔드 DTO와 정확히 일치하는 인터페이스 정의
export interface PlaceMarker {
  prfPlcId: string;
  sido: string;
  gugun: string;
  prfPlcName: string;
  latitude: number;
  longitude: number;
}
<<<<<<< HEAD
// ⬇️ 2. (신규) '요약 뷰' DTO 인터페이스 추가
export interface GugunSummary {
    gugun: string;
    count: number;    
    latitude: number;
    longitude: number;
}
=======
>>>>>>> main

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 현재 위치를 백엔드로 전송하고 마커 데이터를 받아옵니다.
export const sendLocation = async (
<<<<<<< HEAD
    region1: string,
    region2: string
): Promise<PlaceMarker[]> => { // ⭐️ 반환 타입 수정
    const dataToSend = {
        region1,
        region2
    };
    try {
        const res = await axios.post(`${BASE_URL}/performanceplace/currentlocation`,dataToSend)
        
        // DTO 리스트를 반환
        return res.data as PlaceMarker[]; 
    } catch (err) {
        console.error("sendLocation API 오류 발생:", err);
        throw err;
    }
}
export const getGugunSummaries = async (sido: string): Promise<GugunSummary[]> => {
    try {
    const res = await axios.get(`${BASE_URL}/performanceplace/summary`, {
    params: { 
        sido: sido  // 쿼리 파라미터로 ?sido=부산 전송
    }
    });
    return res.data as GugunSummary[];
    } catch (err) {
    console.error("getGugunSummaries API 오류:", err);
    throw err;
    }
}
=======
  region1: string,
  region2: string
): Promise<PlaceMarker[]> => {
  // ⭐️ 반환 타입 수정
  const dataToSend = {
    region1,
    region2,
  };
  try {
    const res = await axios.post(
      `${BASE_URL}/performanceplace/currentlocation`,
      dataToSend
    );

    // DTO 리스트를 반환
    return res.data as PlaceMarker[];
  } catch (err) {
    console.error("sendLocation API 오류 발생:", err);
    throw err;
  }
};
>>>>>>> main
