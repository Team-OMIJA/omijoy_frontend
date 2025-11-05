import { useState, useEffect } from "react";
import axios from "axios";

function NearbyRankList() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [district, setDistrict] = useState<string | null>(null);

  const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  console.log("카카오 API KEY:", KAKAO_API_KEY);

  // 행정구역(구/군) 조회 함수
  const fetchDistrict = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/kakao/coord2region?x=${lon}&y=${lat}`,
        {
          headers: {
            Authorization: `KakaoAK ${KAKAO_API_KEY}`,
          },
        }
      );
      // response.data.documents = 응답받는 행정구역 정보 배열의 구조
      // documents[0]은 보통 행정동 단위, documents[1]은 법정동 단위 데이터
      if (response.data.documents) {
        const resDistrict = response.data.documents[0].region_2depth_name;
        setDistrict(resDistrict);
        console.log("현재 구/군:", resDistrict); // 확인용
      }
    } catch (err) {
      console.log("카카오맵 행정구역 변경 요청 오류", err);
    }
  };

  // 현재 위치 받아오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        const lat = success.coords.latitude;
        const lon = success.coords.longitude;
        setLatitude(lat);
        setLongitude(lon);

        // Kakao API 호출
        fetchDistrict(lat, lon);
      },
      (err) => {
        console.log("위치 정보 오류", err);
      }
    );
  }, []);

  return <div>NearbyRankList</div>;
}

export default NearbyRankList;
