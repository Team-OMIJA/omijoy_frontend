import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SlHeart } from "react-icons/sl";
import { ImHeart } from "react-icons/im";
import { toggleFavoriteReq, getFavoritePrfListReq } from "../../../apis/favoriteApi";
import * as s from "../../Home/PerformanceStyles";

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

    const fetchLikedStatus = async () => {
      try {
        const favorites = (await getFavoritePrfListReq()) as { prfId: string }[];
        if (favorites.some((fav) => fav.prfId === id)) {
          setLiked(true);
        }
      } catch (err) {
        console.error("좋아요 상태 확인 실패", err);
      }
    };

      fetchPerformance();
      fetchLikedStatus();
    }, [id]);

    const handleToggleFavorite = async () => {
      try {
        if (!id) return;
        await toggleFavoriteReq(id);
        setLiked((prev) => !prev);
      } catch (err) {
        console.error("좋아요 토글 실패", err);
        alert("로그인이 필요합니다.");
      }
    };

  if (loading) return <div>로딩 중...</div>;
  if (!performance) return <div>공연 정보를 찾을 수 없습니다.</div>;

  const HeartIcon = liked ? ImHeart : SlHeart;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", padding: "40px", borderRadius: "16px", width: "75%", marginRight: "120px", marginTop: "25px", alignItems: "center", position: "relative"}}>
        <img src={performance.posterImgUrl} alt={performance.prfNm} width={400} height={500} style={{ borderRadius: "10px" }}/>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: "-95px",marginLeft: "100px"}}>
          <div>
            <s.PerformanceTitle>
            <h1 style={{position: "absolute", marginTop: "-210px"}}>{performance.prfNm}</h1>
            </s.PerformanceTitle>
          </div>
          <div style={{ position: "absolute", marginTop: "-10px", lineHeight: "1" }}>
            <s.PerformanceDetail1>
            <h2 style={{ margin: 0, lineHeight: 2 }}>{performance.prfPlcNm}</h2>
            <p>{performance.area}</p>
            </s.PerformanceDetail1>
            <p style={{ whiteSpace: 'pre-line' }}>
              <s.PerformanceDetail2 style={{fontSize: "17.5px", lineHeight: 1.3, margin: 0 }}>
              {performance.prfStartDt} ~ {performance.prfEndDt}
              <br />
              {performance.dtGuidance?.toString()}
              </s.PerformanceDetail2>
            </p>
            
          </div>
        </div>
        <div style={{position: "absolute", top: "450px", left: "535px",textAlign: "left"}}>
          <s.PerformanceDetail3>
            <p style={{ fontSize: "17.5px", margin: 0, lineHeight: 1.5 }}>⏱ {performance.runtime} <br /> 🎭 {performance.genreNm}<br />👶 {performance.prfAge}<br />{performance.child === "Y" && "어린이 동반 가능"}</p>
            {performance.visit === "Y" && <p>내한 공연: ✔️</p>}
            {performance.festival === "Y" && <p>축제 행사: ✔️</p>}
            </s.PerformanceDetail3>
        </div>
        <div style={{position: "absolute", top: "433px", right: "150px", textAlign: "left"}}>
          <s.PerformanceDetail1>
          <p style={{fontSize: "17.5px"}}>
            가격<br />
            {performance.ticketPrice?.toString().split(', ').map((price, index) => (
              <span key={index}>
                {price}
                <br />
              </span>
            ))}
          </p>
          </s.PerformanceDetail1>
        </div>
        <HeartIcon style={{position: "absolute", top: "40px", right: "-70px", fontSize: "40px", color: "crimson", cursor: "pointer"}}  onClick={handleToggleFavorite}/>
        {performance.providerUrl && (
        <button
          onClick={() => {const firstUrl = performance.providerUrl.split(",")[0].trim();
            const validUrl = firstUrl.startsWith("http") ? firstUrl : `https://${firstUrl}`;
            window.open(validUrl, "_blank");
          }}
          style={{position: "absolute", bottom: "40px", right: "-100px", padding: "0 30px", lineHeight: "60px", fontSize: "23px",cursor: "pointer", borderRadius: "30px", backgroundColor: "white", color: "black"}}>예매 바로가기→</button>)}
      </div>
        <hr style={{ width: "100%", border: "1px solid #ccc", margin: "120px 0", marginBottom: "90px" }} />

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