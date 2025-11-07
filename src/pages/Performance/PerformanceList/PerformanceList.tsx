import { useState, useEffect } from "react";
import { PiMagnifyingGlass, PiXCircle} from "react-icons/pi";
import { GrClose, GrPowerReset } from "react-icons/gr";

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
  const [arfilter, setArFilter] = useState<string[]>([]);
  const [gefilter, setGeFilter] = useState<string[]>([]);

  const getPerformance = async (searchQuery?: string) => {
  setLoading(true);
  try {
    const baseUrl = "http://localhost:8080/prfDetails";
    const isSearch = searchQuery && searchQuery.trim() !== "";

    const params = new URLSearchParams();
    if (isSearch) params.append("search", searchQuery!);
    params.append("sort", sort);
    if (arfilter.length > 0) params.append("arFilter", arfilter.join(","));
    if (gefilter.length > 0) params.append("geFilter", gefilter.join(","));

    const url = `${baseUrl}${isSearch ? "/search" : ""}?${params.toString()}`;

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
    getPerformance(query);
  }, [sort, arfilter, gefilter]);

  const handleAreaChange = (value: string) => {
    if (value && !arfilter.includes(value)) {
      setArFilter([...arfilter, value]);
    }
  };

  const handleGenreChange = (value: string) => {
    if (value && !gefilter.includes(value)) {
      setGeFilter([...gefilter, value]);
    }
  };

  const removeFilter = (type: "area" | "genre", value: string) => {
    if (type === "area") {
      setArFilter(arfilter.filter((item) => item !== value));
    } else {
      setGeFilter(gefilter.filter((item) => item !== value));
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
      <h2>공연 리스트</h2>
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
        value={arfilter}
        onChange={(e) => handleAreaChange(e.target.value)}
        style={{
          padding: "8px 12px",
          border: "solid #ccc",
          outline: "none",
        }}
      >
        <option value="" hidden>지역</option>
        <option value="서울">서울</option>
        <option value="부산">부산</option>
        <option value="인천">인천</option>
        <option value="대구">대구</option>
        <option value="대전">대전</option>
        <option value="광주">광주</option>
        <option value="울산">울산</option>
        <option value="세종">세종</option>
        <option value="경기">경기</option>
        <option value="강원">강원</option>
        <option value="경북">경북</option>
        <option value="경남">경남</option>
        <option value="충북">충북</option>
        <option value="충남">충남</option>
        <option value="전북">전북</option>
        <option value="전남">전남</option>
        <option value="제주">제주</option>
      </select>
      <select
        value={gefilter}
        onChange={(e) => handleGenreChange(e.target.value)}
        style={{
          padding: "8px 12px",
          border: "solid #ccc",
          outline: "none",
        }}
      >
        <option value="" hidden>장르</option>
        <option value="대중무용">대중무용</option>
        <option value="대중음악">대중음악</option>
        <option value="무용(서양/한국무용)">무용(서양/한국무용)</option>
        <option value="뮤지컬">뮤지컬</option>
        <option value="복합">복합</option>
        <option value="서양음악(클래식)">서양음악(클래식)</option>
        <option value="서커스/마술">서커스/마술</option>
        <option value="연극">연극</option>
        <option value="한국음악(국악)">한국음악(국악)</option>
      </select>
      <GrPowerReset 
        onClick={() => {
          setArFilter([]);
          setGeFilter([]);
          getPerformance(query);
        }}
        style={{
          padding: "6px 12px",
          borderRadius: 8,
          border: "1px solid #ccc",
          background: "#f0f0f0",
          cursor: "pointer",
        }}
      />
      <div style={{ position: "relative", width: 250, marginLeft: "auto"}}>
          <input
            type="text"
            placeholder="공연명 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") getPerformance(query);
            }}
            style={{
              padding: "8px 36px 8px 24px",
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
          {query && (
            <GrClose  
              size={12}
              onClick={() => {
                setQuery("");
                setArFilter([]);
                setGeFilter([]);
                getPerformance("");
              }}
              style={{
                position: "absolute",
                right: 36,
                top: 11,
                color: "grey",
                cursor: "pointer",
              }}
            />
          )}
          </div>
      </div>
      
      <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: 20 }}>
        {arfilter.map((item) => (
          <div
            key={`area-${item}`}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#e0e0e0",
              borderRadius: "16px",
              padding: "4px 8px",
            }}
          >
            <span>{item}</span>
            <PiXCircle 
              size={16}
              style={{ marginLeft: 6, cursor: "pointer" }}
              onClick={() => removeFilter("area", item)}
            />
          </div>
        ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {gefilter.map((item) => (
          <div
            key={`genre-${item}`}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#e0e0e0",
              borderRadius: "16px",
              padding: "4px 8px",
            }}
          >
            <span>{item}</span>
            <PiXCircle 
              size={14}
              style={{ marginLeft: 6, cursor: "pointer" }}
              onClick={() => removeFilter("genre", item)}
            />
          </div>
        ))}
        </div>
      </div>

      <div 
        style={{ 
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center", 
          marginBottom: 30 
        }}
      >
      </div>

      {loading ? (
        <div className="detail-loading">공연 정보를 불러오는 중 ... </div>
      ) : performances.length === 0 ? (
        <div className="detail-error" style={{ marginTop: "20px" }}>
          공연 정보를 찾을 수 없습니다.
        </div>
      ) : (
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
            <div>
              <a 
                href={p.posterImgUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "black", cursor: "pointer" }}
              >
                <strong>{p.prfNm}</strong>
              </a>
            </div>
            <div>({p.prfStartDt} ~ {p.prfEndDt})</div>
            <div>{p.prfPlcNm}</div>
            <div><strong>{p.area}</strong></div>
            <div><strong>{p.genreNm}</strong></div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

export default PerformanceList