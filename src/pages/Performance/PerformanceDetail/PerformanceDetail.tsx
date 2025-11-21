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
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          src={performance.posterImgUrl}
          alt={performance.prfNm}
          width={400}
          height={500}
          style={{ borderRadius: "10px" }}
        />
        <HeartIcon style={{position: "absolute", top: "40px", right: "-80px", fontSize: "40px", color: "crimson", cursor: "pointer"}}  onClick={handleToggleFavorite}/>
      </div>
      <s.PerformanceTitle>
            <h1>{removeRegionTag(performance.prfNm)}</h1>
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
          <p>
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
        <p style={{fontSize: "17.5px"}}>
          <br />
          {performance.ticketPrice?.toString().split(', ').map((price, index) => (
            <span key={index}>
              {price}
              <br />
            </span>
          ))}
      </p>
      </s.PerformanceDetail1>
        </p>
        <button
          onClick={() => {
            const firstUrl = performance.providerUrl.split(",")[0].trim();
            const validUrl = firstUrl.startsWith("http")
              ? firstUrl
              : `https://${firstUrl}`;
            window.open(validUrl, "_blank");
          }}
          style={{
            padding: "0 30px",
            lineHeight: "60px",
            fontSize: "23px",
            cursor: "pointer",
            borderRadius: "30px",
            backgroundColor: "white",
            color: "black",
          }}
        >
          예매 바로가기→
        </button>
      <hr style={{ width: "100%", border: "1px solid #ccc", margin: "120px 0", marginBottom: "90px" }} />
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
