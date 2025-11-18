import { useState, useEffect, useCallback, useRef } from "react";
import { PiMagnifyingGlass, PiXCircle } from "react-icons/pi";
import { GrClose, GrPowerReset } from "react-icons/gr";
import useInfiniteScroll from "../../../configs/useInfiniteScroll";
import { useNavigate, useNavigationType } from "react-router-dom";
import ScrollTop from "../../../components/common/Button/ScrollTopButton";
import { formatDateDot,formatDateRange } from "../../../components/FormatDate/FormatDate";
import { removeRegionTag } from "../../../apis/performanceApi";
import PrfList10Skeleton from "../../../components/skeleton/PrfList10Skeleton";

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
  const navigationType = useNavigationType();
  const isInitialMount = useRef(true);

  const [performances, setPerformances] = useState<Performance[]>(() => {
    const storedData = sessionStorage.getItem("scroll-performance-data");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("name");
  const navigate = useNavigate();
  const [page, setPage] = useState(() =>
    Number(sessionStorage.getItem("scroll-performance-page") || 0)
  );
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState(
    () => sessionStorage.getItem("scroll-performance-query") || ""
  );
  const [arfilter, setArFilter] = useState(() =>
    JSON.parse(sessionStorage.getItem("scroll-performance-arfilter") || "[]")
  );
  const [gefilter, setGeFilter] = useState(() =>
    JSON.parse(sessionStorage.getItem("scroll-performance-gefilter") || "[]")
  );
  const [vtFilter, setVtFilter] = useState(() =>
    JSON.parse(sessionStorage.getItem("scroll-performance-vtfilter") || "false")
  );

  const getPerformance = useCallback(
    async (searchQuery: string, append = false, pageToLoad = 0) => {
      setLoading(true);
      try {
        const baseUrl = "http://localhost:8080/prfDetails";
        const isSearch = searchQuery && searchQuery.trim() !== "";

        const params = new URLSearchParams();
        if (isSearch) params.append("search", searchQuery);
        params.append("sort", sort);
        params.append("page", String(pageToLoad));
        params.append("size", "30");
        if (arfilter.length > 0) params.append("arFilter", arfilter.join(","));
        if (gefilter.length > 0) params.append("geFilter", gefilter.join(","));
        if (vtFilter) params.append("vtFilter", "Y");

        const url = `${baseUrl}${
          isSearch ? "/search" : ""
        }?${params.toString()}`;

        const response = await fetch(url);
        const json: Performance[] = await response.json();

        if (append) setPerformances((prev) => [...prev, ...json]);
        else setPerformances(json);

        setHasMore(json.length > 0);
      } catch (err) {
        console.log("공연 정보 불러오는 중 오류 발생", err);
      } finally {
        setLoading(false);
      }
    },
    [sort, arfilter, gefilter, vtFilter]
  );

  useEffect(() => {
    sessionStorage.setItem("scroll-performance-query", query);
    sessionStorage.setItem(
      "scroll-performance-arfilter",
      JSON.stringify(arfilter)
    );
    sessionStorage.setItem(
      "scroll-performance-gefilter",
      JSON.stringify(gefilter)
    );
    sessionStorage.setItem("scroll-performance-page", String(page));
    sessionStorage.setItem(
      "scroll-performance-data",
      JSON.stringify(performances)
    );
    sessionStorage.setItem(
      "scroll-performance-vtfilter",
      JSON.stringify(vtFilter)
    );
  }, [query, arfilter, gefilter, page, performances, vtFilter]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

      if (navigationType === "POP" && performances.length > 0) {
        setLoading(false);
        return;
      }
    }
    setPage(0);
    getPerformance(query, false, 0);
  }, [
    sort,
    arfilter,
    gefilter,
    vtFilter,
    query,
    getPerformance,
    navigationType,
  ]);

  const handleAreaChange = (value: string) => {
    if (value && !arfilter.includes(value)) setArFilter([...arfilter, value]);
  };
  const handleGenreChange = (value: string) => {
    if (value && !gefilter.includes(value)) setGeFilter([...gefilter, value]);
  };
  const removeFilter = (type: "area" | "genre", value: string) => {
    if (type === "area") setArFilter(arfilter.filter((item) => item !== value));
    else setGeFilter(gefilter.filter((item) => item !== value));
  };

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      getPerformance(query, true, nextPage);
    }
  }, [loading, hasMore, page, query, getPerformance]);

  useInfiniteScroll(loadMore, hasMore);

  const AREA_OPTIONS = [
    "서울",
    "부산",
    "인천",
    "대구",
    "대전",
    "광주",
    "울산",
    "세종",
    "경기",
    "강원",
    "경북",
    "경남",
    "충북",
    "충남",
    "전북",
    "전남",
    "제주",
  ];
  const GENRE_OPTIONS = [
    "대중무용",
    "대중음악",
    "무용(서양/한국무용)",
    "뮤지컬",
    "복합",
    "서양음악(클래식)",
    "서커스/마술",
    "연극",
    "한국음악(국악)",
  ];

  return (
    <div style={{width: "100%", padding: "40px 60px", boxSizing: "border-box"}}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h2>공연 리스트</h2>
        <ScrollTop />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ padding: "8px 12px", border: "solid #ccc", outline: "none" }}
        >
          <option value="name">이름순</option>
          <option value="date">날짜순</option>
        </select>
        {/*
        select = 한개의 값만 보여줌
        현재 = 여러 값 필터링 중이라 배열이 될 수 있음
        -> 배열을 select의 value로 설정 불가능
        -> value를 공백으로 두고 선택 시 
        handleAreaChange에서 배열에 push 하도록 함
         */}
        {/* <select
          value={arfilter}
          onChange={(e) => handleAreaChange(e.target.value)} */}
          <select value="" onChange={(e) => handleAreaChange(e.target.value)}

          style={{ padding: "8px 12px", border: "solid #ccc", outline: "none" }}
        >
          <option value="" hidden>
            지역
          </option>
          {AREA_OPTIONS.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        {/* <select
          value={gefilter}
          onChange={(e) => handleGenreChange(e.target.value)} */}
          <select value="" onChange={(e) => handleGenreChange(e.target.value)}

          style={{ padding: "8px 12px", border: "solid #ccc", outline: "none" }}
        >
          <option value="" hidden>
            장르
          </option>
          {GENRE_OPTIONS.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <div style={{ marginLeft: 10 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="checkbox"
              checked={vtFilter}
              onChange={(e) => setVtFilter(e.target.checked)}
            />
            내한 공연
          </label>
        </div>
        <GrPowerReset
          onClick={() => {
            setArFilter([]);
            setGeFilter([]);
            setPage(0);
            setQuery("");
            setPage(0);
            getPerformance("", false, 0);
            getPerformance(query, false, 0);
          }}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid #ccc",
            background: "#f0f0f0",
            cursor: "pointer",
          }}
        />
        <div style={{ position: "relative", width: 250, marginLeft: "auto" }}>
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
            onClick={() => {
              setPage(0);
              getPerformance(query, false, 0);
            }}
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
                setPage(0);
                getPerformance("", false, 0);
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
      
      <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:20 }}>
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
      
      {performances.length === 0 && !loading && <div className="detail-error" style={{ marginTop:"20px" }}>공연 정보를 찾을 수 없습니다.</div>}
      {loading && page === 0 ? (
        <PrfList10Skeleton />
      ) : (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "30px",
          marginTop: "30px",
        }}
      >
      {performances.map((p) => (
        <div
          key={p.prfId}
          style={{
            textAlign: "left",
            padding: "5px",
            borderRadius: "14px",
          }}
        >
          {/* ───────────── 포스터 ───────────── */}
          <img
            src={p.posterImgUrl}
            alt={p.prfNm}
            onClick={() => navigate(`/performance/${p.prfId}`)}
            style={{
              width: "100%",
              height: "260px",
              objectFit: "cover",
              borderRadius: "10px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          />

          {/* ───────────── 공연명 ───────────── */}
          <h4
            style={{
              fontSize: "15px",
              fontWeight: "600",
              color: "#111",
              marginBottom: "4px",
              lineHeight: "1.4",
              wordBreak: "keep-all",
              overflowWrap: "break-word",
              whiteSpace: "normal",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/performance/${p.prfId}`)}
          >
            {removeRegionTag(p.prfNm)}
          </h4>

          {/* ───────────── 날짜 ───────────── */}
          <p
            style={{
              fontSize: "12.5px",
              color: "#777",
              margin: "2px 0",
            }}
          >
            {formatDateRange(
              formatDateDot(p.prfStartDt),
              formatDateDot(p.prfEndDt)
            )}
          </p>

          {/* ───────────── 공연장명 ───────────── */}
          <p
            style={{
              fontSize: "13px",
              color: "#555",
              margin: "2px 0",
              wordBreak: "keep-all",
              overflowWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            {p.prfPlcNm}
          </p>
        </div>
      ))}
    </div>
      )}
    </div>
  );
}

export default PerformanceList;