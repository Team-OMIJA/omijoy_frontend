import { useState, useEffect } from "react";

interface Performance {
  prfId: string;
  prfNm: string;
  prfStartDt: string;
  prfEndDt: string;
  prfPlcNm: string;
  ticketPrice: string;
  posterImgUrl: string;
}

function PerformanceList() {
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const getPerformance = async () => {
    setLoading(true);
    try {
      const url = query
        ? `http://localhost:8080/prfDetails/search?prfNm=${encodeURIComponent(query)}`
        : `http://localhost:8080/prfDetails`;
      const response = await fetch(url);
      const json: Performance[] = await response.json(); // 바로 배열로 받음
      setPerformances(json);
      setLoading(false);
    } catch (err) {
      console.log("공연 정보 불러오는 중 오류 발생", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPerformance();
  }, []);

  if (loading) {
    return <div className="detail-loading">공연 정보를 불러오는 중 ... </div>;
  }

  if (performances.length === 0) {
    return <div className="detail-error">공연 정보를 찾을 수 없습니다.</div>;
  }
  
  return (
    <div>
      <h2>PerformanceList</h2>
      <div style={{ marginBottom: 30 }}>
        <input
          type="text"
          placeholder="공연명 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: 8, width: 250 }}
        />
        <button onClick={() => getPerformance(query)} style={{ padding: "8px 16px", marginLeft: 8 }}>
          검색
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "16px"
        }}
      >
        {performances.slice(0, 30).map((p) => (
          <div key={p.prfId} style={{ textAlign: "center" }}>
            <a href={p.posterImgUrl} target="_blank" rel="noopener noreferrer">
              <img src={p.posterImgUrl} alt="poster" style={{ width: 200, cursor: "pointer" }} />
            </a>
            <div><strong>{p.prfNm}</strong></div>
            <div>({p.prfStartDt} ~ {p.prfEndDt})</div>
            <div>{p.prfPlcNm}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PerformanceList