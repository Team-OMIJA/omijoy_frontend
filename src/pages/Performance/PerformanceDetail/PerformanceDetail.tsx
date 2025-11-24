import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SlHeart } from "react-icons/sl";
import { ImHeart } from "react-icons/im";
import * as s from "../../Home/PerformanceStyles";
import { useFavoriteState } from "../../../stores/useFavoriteState";
import { removeRegionTag } from "../../../apis/performanceApi";

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
  const [performance, setPerformance] = useState<PerformanceDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const [showLinks, setShowLinks] = useState(false);

  const { favorites, toggleFavorite, fetchFavoriteState } = useFavoriteState();

  const liked = id ? favorites[id] ?? false : false;

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

    if (id) fetchFavoriteState(id);

  }, [id, fetchFavoriteState]);

  
  const handleToggleFavorite = async () => {
    if (!id) return;

    await toggleFavorite(id);
  };

  if (loading) return <div>로딩 중...</div>;
  if (!performance) return <div>공연 정보를 찾을 수 없습니다.</div>;

  const HeartIcon = liked ? ImHeart : SlHeart;

  const getSiteName = (url: string) => {
  const lower = url.toLowerCase();
    if (lower.includes("interpark")) return "인터파크";
    if (lower.includes("ticketlink")) return "티켓링크";
    if (lower.includes("yes24")) return "YES24";
    if (lower.includes("naver")) return "네이버 예매";
    if (lower.includes("wemakeprice")) return "위메프";
    if (lower.includes("melon")) return "멜론티켓";
    if (lower.includes("lotte")) return "롯데콘서트홀";
    if (lower.includes("coffee")) return "커넥티브 티켓";
    if (lower.includes("nanumticket")) return "나눔 티켓";
    try {
      const hostname = new URL(url).hostname;
      const parts = hostname.replace("www.", "").split(".");
      const mainDomain = parts[0];

      return mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);
    } catch {
      return "예매처";
    }
  };



  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          padding: "40px",
          borderRadius: "16px",
          width: "75%",
          marginRight: "120px",
          marginTop: "25px",
          // alignItems: "center",
          gap: "100px",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
      <div>
        <img
          src={performance.posterImgUrl}
          alt={performance.prfNm}
          width={400}
          height={500}
          style={{ borderRadius: "10px" }}
        />
      </div>
      <div style={{marginTop: 0,  width: "524px"}}>
        <s.PerformanceTitle>
          <h1 style={{marginTop: 0}}>{removeRegionTag(performance.prfNm)}</h1>
        </s.PerformanceTitle>
        <s.PerformanceDetail1>
          <h2 style={{ margin: 0, lineHeight: 2 }}>
            {(() => {
              const original = performance.prfPlcNm;
              let result = '';
              const seen = new Set<string>();
              original.split(/\s*(\([^)]+\))/).forEach((part) => {
                if (!part) return;
                if (!part.startsWith('(')) {
                  result += part;
                  return;
                }
                const content = part.slice(1, -1).trim();
                const normalizedContent = content.replace(/\s+/g, '');
                const normalizedResult = result.replace(/\s+/g, '');
                if (seen.has(normalizedContent) || normalizedResult.includes(normalizedContent)) {
                  return;
                }
                seen.add(normalizedContent);
                result += `(${content})`;
              });
              return result.trim();
            })()}
          </h2>
          <p>{performance.area}</p>
        </s.PerformanceDetail1>

        <s.PerformanceTitle>
          {performance.prfStartDt} ~ {performance.prfEndDt}
        </s.PerformanceTitle>
        <s.PerformanceDetail2 style={{fontSize: "17.5px"}}>
          <br />
          {performance.dtGuidance?.split('),').map((time) => time.trim()).map((line, idx) => (<span key={idx}>{line.endsWith(')') ? line : line + ')'}<br /></span>))}
        </s.PerformanceDetail2>
        <s.PerformanceDetail3>
        <p style={{ fontSize: "17.5px"}}>⏱ {performance.runtime} <br /> 🎭 {performance.genreNm}<br />👶 {performance.prfAge}</p>
        </s.PerformanceDetail3>
        <s.PerformanceDetail3>
        <p style={{ fontSize: "17.5px", margin: 0, lineHeight: 1.5 }}>
        {performance.child === "Y" && "✔️ 미취학 아동 입장 가능"}</p>
        <p style={{ fontSize: "17.5px", margin: 0, lineHeight: 1.5 }}>
        {performance.visit === "Y" && "✔️ 내한 공연"}</p>
        </s.PerformanceDetail3>
        <s.PerformanceDetail1>
        {performance.ticketPrice?.toString().split(', ').map((price, idx) => (
          <p key={`price-${idx}`} style={{ fontSize: "17.5px", marginBottom: "5px" }}>
            {price}
          </p>
        ))}
        </s.PerformanceDetail1>

        <div
          onMouseEnter={() => setShowLinks(true)}
          onMouseLeave={() => setShowLinks(false)}
          style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "0px"}}
        >
        <button
          style={{
            width: "200px",
            height: "60px",
            marginTop: "20px",
            backgroundColor: "#Bf1C1C",
            color: "#dbdbdb",
            fontWeight: 500,
            borderRadius: "6px",
            textAlign: "center",
            lineHeight: "60px",
            border: "none",
            cursor: "pointer"
          }}
        >
          예매 바로가기 →
        </button>
        
        {showLinks && (
          <div
            onMouseEnter={() => setShowLinks(true)}
            onMouseLeave={() => setShowLinks(false)}
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              transition: "all 0.2s"
            }}
          >
            {performance.providerUrl
              .split(",")
              .map((rawUrl, index) => {
                const trimmed = rawUrl.trim();
                if (!trimmed) return null;

                const validUrl = trimmed.startsWith("http")
                  ? trimmed
                  : `https://${trimmed}`;

                const siteName = getSiteName(validUrl);

                return (
                  <button
                    key={index}
                    onClick={() => window.open(validUrl, "_blank")}
                    style={{
                      width: "200px",
                      height: "50px",
                      backgroundColor: "#Bf1C1C",
                      color: "#f0f0f0",
                      fontWeight: 500,
                      borderRadius: "6px",
                      textAlign: "center",
                      lineHeight: "50px",
                      display: "block",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    {siteName}
                  </button>
                );
              })}
          </div>
        )}
        </div>
        </div>
        <HeartIcon style={{position: "absolute", top: "40px", right: "-80px", fontSize: "40px", color: "crimson", cursor: "pointer"}}  onClick={handleToggleFavorite}/>
      </div>
      
      <hr style={{ width: "100%", border: "1px solid #ccc", marginTop: "0px",marginBottom: "50px" }} />
      {performance.detailImgUrl && performance.detailImgUrl.trim() !== "" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {performance.detailImgUrl
            .split(",")
            .map((url) => url.trim())
            .filter((url) => url)
            .map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`detail-${idx}`}
                style={{ width: "100%", maxWidth: "800px" }}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default PerformanceDetail;
