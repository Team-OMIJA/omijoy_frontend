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
        setPerformance(null);
        alert("공연 정보를 불러올 수 없습니다.");
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
      <div style={{ display: "flex", padding: "40px", borderRadius: "16px", width: "75%", marginRight: "120px", marginTop: "25px", alignItems: "center", position: "relative"}}>
        <img src={performance.posterImgUrl} alt={performance.prfNm} width={400} height={500} style={{ borderRadius: "10px" }}/>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: "-95px",marginLeft: "100px"}}>
          <div>
            <h1 style={{position: "absolute", marginTop: "-210px"}}>{performance.prfNm}</h1>
          </div>
          <div style={{ position: "absolute", marginTop: "-10px", lineHeight: "1" }}>
            <h2>{performance.area}</h2>
            <p>{performance.prfPlcNm}</p>
            <p>{performance.prfStartDt} ~ {performance.prfEndDt}<br />{performance.dtGuidance?.toString()}<br />{performance.runtime}</p>
            <p>{performance.genreNm}<br />{performance.prfAge}</p>
            <p>{performance.ticketPrice}</p>
            {performance.visit === "Y" && <p>내한: O</p>}
            {performance.festival === "Y" && <p>축제 여부: O</p>}
            <p>어린이 동반 가능 여부: {performance.child === "Y" ? "O" : "X"}</p>

          </div>
        </div>
        <HeartIcon style={{position: "absolute", top: "40px", right: "-70px", fontSize: "40px", color: "crimson", cursor: "pointer"}} onClick={() => setLiked(!liked)}/>
        {performance.providerUrl && (
        <button
          onClick={() => {const firstUrl = performance.providerUrl.split(",")[0].trim();
            const validUrl = firstUrl.startsWith("http") ? firstUrl : `https://${firstUrl}`;
            window.open(validUrl, "_blank");
          }}
          style={{position: "absolute", bottom: "40px", right: "-100px", padding: "0 30px", lineHeight: "60px", fontSize: "23px",cursor: "pointer", borderRadius: "30px", backgroundColor: "black", color: "white"}}>예매 바로가기→</button>)}
      </div>
        <hr style={{ width: "100%", border: "1px solid #ccc", margin: "50px 0" }} />

      {performance.detailImgUrl && performance.detailImgUrl.trim() !== "" && (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          {performance.detailImgUrl
            .split(",")
            .map(url => url.trim())
            .filter(url => url)
            .map((url, idx) => (
              <img key={idx} src={url} alt={`detail-${idx}`} style={{ width: "100%", maxWidth: "800px"}}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default PerformanceDetail;