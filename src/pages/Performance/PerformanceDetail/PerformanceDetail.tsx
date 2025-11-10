import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface PerformanceDetail {
  prfId: string;
  prfNm: string;
  prfStartDt: string;
  prfEndDt: string;
  prfPlcNm: string;
  runtime: string;
  ticketPrice: string;
  posterImgUrl: string;
  area: string;
  genreNm: string;
  openrun: string;
  visit: string;
  child: string;
  festival: string;
  dtguidance: string;
  detail_img_url: string;
  provider_url: string;
}

function PerformanceDetail() {
  const { id } = useParams<{ id: string }>();
  const [performance, setPerformance] = useState<PerformanceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const res = await fetch(`http://localhost:8080/prfDetails/${id}`);
        const data: PerformanceDetail = await res.json();
        setPerformance(data);
      } catch (err) {
        console.error("공연 상세 정보 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformance();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (!performance) return <div>공연 정보를 찾을 수 없습니다.</div>;
  return (
    <div style={{ padding: "20px" }}>
      <h2>{performance.prfNm}</h2>
      <img src={performance.posterImgUrl} alt={performance.prfNm} style={{ width: 300 }} />
      <p>기간: {performance.prfStartDt} ~ {performance.prfEndDt}</p>
      <p>장르: {performance.genreNm}</p>
      <p>지역: {performance.area}</p>
      <p>장소: {performance.prfPlcNm}</p>
      <p>러닝타임: {performance.runtime}</p>
      <p>가격: {performance.ticketPrice}</p>
      <p>오픈런 여부: {performance.openrun === "Y" ? "O" : "X"}</p>
      <p>관람 등급: {performance.visit === "Y" ? "O" : "X"}</p>
      <p>어린이 관람: {performance.child === "Y" ? "O" : "X"}</p>
      <p>축제 여부: {performance.festival === "Y" ? "O" : "X"}</p>
      <p>공연 시간: {performance.dtguidance}</p>
      {performance.detail_img_url && (
        <img src={performance.detail_img_url} alt="상세 이미지" style={{ width: 500, marginTop: 20 }} />
      )}
      {performance.provider_url && (
        <p>
          제공처: <a href={performance.provider_url} target="_blank" rel="noopener noreferrer">{performance.provider_url}</a>
        </p>
      )}
    </div>
  )
}

export default PerformanceDetail