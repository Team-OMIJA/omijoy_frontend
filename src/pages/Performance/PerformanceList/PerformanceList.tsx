import { useState, useEffect } from "react";
import { PiMagnifyingGlass} from "react-icons/pi";

interface Performance {
  prfId: string;
  prfNm: string;
  prfStartDt: string;
  prfEndDt: string;
  prfPlcNm: string;
  ticketPrice: string;
  posterImgUrl: string;
  area: string;
  genreNm: string;
}

function PerformanceList() {
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name");

  const getPerformance = async (searchQuery?: string) => {
  setLoading(true);
  try {
    const baseUrl = "http://localhost:8080/prfDetails";
    let url = "";

    if (searchQuery && searchQuery.trim() !== "") {
      url = `${baseUrl}/search?search=${encodeURIComponent(searchQuery)}&sort=${sort}`;
    } else {
      url = `${baseUrl}?sort=${sort}`;
    }

    const response = await fetch(url);
    const json: Performance[] = await response.json();
    setPerformances(json);
  } catch (err) {
    console.log("공연 정보 불러오는 중 오류 발생", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    getPerformance();
  }, []);

  useEffect(() => {
    getPerformance();
  }, [sort]);

  if (loading) {
    return <div className="detail-loading">공연 정보를 불러오는 중 ... </div>;
  }

  if (performances.length === 0) {
    return <div className="detail-error">공연 정보를 찾을 수 없습니다.</div>;
  }
  
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
      <h2>PerformanceList</h2>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        style={{
          padding: "8px 12px",
          border: "solid #ccc",
          outline: "none",
        }}
      >
        <option value="name">이름순</option>
        <option value="date">날짜순</option>
      </select>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        style={{
          padding: "8px 12px",
          border: "solid #ccc",
          outline: "none",
        }}
      >
        <option value="name">지역(전체)</option>
        <option value="date">날짜순</option>
      </select>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        style={{
          padding: "8px 12px",
          border: "solid #ccc",
          outline: "none",
        }}
      >
        <option value="name">이름순</option>
        <option value="date">날짜순</option>
      </select>
      </div>
      <div 
        style={{ 
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center", 
          marginBottom: 30 
        }}
      >
        <div style={{ position: "relative", width: 250 }}>
          <input
            type="text"
            placeholder="공연명 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") getPerformance(query);
            }}
            style={{
              padding: "8px 36px 8px 12px",
              width: 250,
              borderRadius: 10,
              border: "2px solid #ccc",
              outline: "none",
              boxSizing: "border-box",
              }}
            />
          <PiMagnifyingGlass 
            size={18}
            onClick={() => getPerformance(query)}
            style={{
              position: "absolute",
              right: 10,
              top: 8,
              color: "grey",
              cursor: "pointer", 
            }}
          />
          </div>
        </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "16px"
        }}
      >
        {performances.slice(0,30).map((p) => (
          <div key={p.prfId} style={{ textAlign: "center" }}>
            <a href={p.posterImgUrl} target="_blank" rel="noopener noreferrer">
              <img src={p.posterImgUrl} alt="poster" style={{ width: 200, cursor: "pointer" }} />
            </a>
            <div><strong>{p.prfNm}</strong></div>
            <div>({p.prfStartDt} ~ {p.prfEndDt})</div>
            <div>{p.prfPlcNm}</div>
            <div>{p.area}</div>
            <div>{p.genreNm}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PerformanceList