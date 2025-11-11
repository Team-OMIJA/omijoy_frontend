import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SlHeart } from "react-icons/sl";
import { ImHeart } from "react-icons/im";

interface PerformanceDetail {
  prfId: string;
  prfNm: string;
  prfStartDt: string;
  prfEndDt: string;
  prfPlcNm: string;
  prfAge: string;
  runtime: string;
  ticketPrice: string;
  posterImgUrl: string;
  area: string;
  genreNm: string;
  visit: string;
  child: string;
  festival: string;
  dtGuidance: string;
  detailImgUrl: string;
  providerUrl: string;
}

function PerformanceDetail() {
  const { id } = useParams<{ id: string }>();
  const [performance, setPerformance] = useState<PerformanceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

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

  const HeartIcon = liked ? ImHeart : SlHeart;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex",backgroundColor: "#f8f8f8", padding: "40px", borderRadius: "16px", width: "75%", marginTop: "20px", alignItems: "center", position: "relative"}}>
        <img src={performance.posterImgUrl} alt={performance.prfNm} width={400} height={500} style={{ borderRadius: "10px" }}/>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginLeft: "100px"}}>
          <div>
            <h2 style={{ marginBottom: "10px" }}>{performance.prfNm}</h2>
          </div>
          <div style={{ lineHeight: "1.8" }}>
            <h3>{performance.area}</h3>
            <p>기간: {performance.prfStartDt} ~ {performance.prfEndDt}</p>
            <p>공연 시간: {performance.dtGuidance?.toString()}</p>
            <p>장르: {performance.genreNm}</p>
            <p>장소: {performance.prfPlcNm}</p>
            <p>러닝타임: {performance.runtime}</p>
            <p>관람등급: {performance.prfAge}</p>
            <p>가격: {performance.ticketPrice}</p>
            <p>내한: {performance.visit === "Y" ? "O" : "X"}</p>
            <p>어린이 관람: {performance.child === "Y" ? "O" : "X"}</p>
            <p>축제 여부: {performance.festival === "Y" ? "O" : "X"}</p>
          </div>
        </div>
        <HeartIcon style={{position: "absolute", top: "20", right: "30", fontSize: "28px", color: "crimson", cursor: "pointer"}} onClick={() => setLiked(!liked)}/>
        {performance.providerUrl && (
        <button
          onClick={() => {const firstUrl = performance.providerUrl.split(",")[0].trim();
            const validUrl = firstUrl.startsWith("http") ? firstUrl : `https://${firstUrl}`;
            window.open(validUrl, "_blank");
          }}
          style={{position: "absolute", bottom: "40px", right: "60px", padding: "20px 50px", fontSize: "16px", cursor: "pointer", borderRadius: "30px"}}>예매하기</button>)}
      </div>

      {performance.detailImgUrl && performance.detailImgUrl.trim() !== "" && (
        <div style={{display: "flex", flexDirection: "column", marginTop: "100px", alignItems: "center",}}>
          {performance.detailImgUrl
            .split(",")
            .map(url => url.trim())
            .filter(url => url)
            .map((url, idx) => (
              <img key={idx} src={url} alt={`detail-${idx}`} style={{ width: "80%", maxWidth: "800px"}}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default PerformanceDetail;