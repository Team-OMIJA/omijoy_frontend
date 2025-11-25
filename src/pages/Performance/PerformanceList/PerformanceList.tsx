import { useState, useEffect, useCallback, useRef } from "react";
import { PiMagnifyingGlass, PiXCircle } from "react-icons/pi";
import { GrClose, GrPowerReset } from "react-icons/gr";
import useInfiniteScroll from "../../../configs/useInfiniteScroll";
import { useNavigate, useNavigationType } from "react-router-dom";
import ScrollTop from "../../../components/common/Button/ScrollTopButton";
import {
  formatDateDot,
  formatDateRange,
} from "../../../components/format/formatDate";
import { removeRegionTag } from "../../../components/removeRegionTag/removeRegionTag";
import PrfList24Skeleton from "../../../components/skeleton/PrfList24Skeleton";
import { Performance } from "../../../types/performancePageTypes";
import * as s from "../../Home/PerformanceStyles";
import * as ps from "./styles";

function PerformanceList() {
  const navigationType = useNavigationType();
  const isInitialMount = useRef(true);

  const [performances, setPerformances] = useState<Performance[]>(() => {
    const storedData = sessionStorage.getItem("scroll-performance-data");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState(
    () => sessionStorage.getItem("scroll-performance-sort") || "name_asc"
  );
  const navigate = useNavigate();
  const [page, setPage] = useState(() =>
    Number(sessionStorage.getItem("scroll-performance-page") || 0)
  );
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState(
    () => sessionStorage.getItem("scroll-performance-query") || ""
  );
  const [stFilter, setStFilter] = useState(() =>
    JSON.parse(
      sessionStorage.getItem("scroll-performance-stfilter") || '"공연중"'
    )
  );
  const [arfilter, setArFilter] = useState<string[]>(() =>
    JSON.parse(sessionStorage.getItem("scroll-performance-arfilter") || "[]")
  );
  const [gefilter, setGeFilter] = useState<string[]>(() =>
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
        if (stFilter) params.append("stFilter", stFilter);
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
    [sort, stFilter, arfilter, gefilter, vtFilter]
  );

  useEffect(() => {
    sessionStorage.setItem("scroll-performance-sort", sort);
    sessionStorage.setItem("scroll-performance-query", query);
    sessionStorage.setItem(
      "scroll-performance-stfilter",
      JSON.stringify(stFilter)
    );
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
  }, [sort, query, stFilter, arfilter, gefilter, page, performances, vtFilter]);

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
    stFilter,
    arfilter,
    gefilter,
    vtFilter,
    getPerformance,
    navigationType,
  ]);

  const handleStatusChange = (value: string) => {
    setStFilter(value);
    setStatusOpen(false);
  };
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

  const [searchOpen, setSearchOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);

  const sortOptions = [
    { value: "name_asc", label: "이름순 ↑" },
    { value: "name_desc", label: "이름순 ↓" },
    { value: "date", label: "최신순" },
  ];

  useEffect(() => {
    if (query) setSearchOpen(true);
  }, []);

  const handleSortChange = (value: string) => {
    if (value === "name_asc" || value === "name_desc") {
      setSort(value);
    } else if (value === "name") {
      setSort((prev) => (prev === "name_asc" ? "name_desc" : "name_asc"));
    } else {
      setSort("date");
    }
  };

  const sortRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const genreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (sortRef.current && !sortRef.current.contains(target))
        setSortOpen(false);
      if (statusRef.current && !statusRef.current.contains(target))
        setStatusOpen(false);
      if (areaRef.current && !areaRef.current.contains(target))
        setAreaOpen(false);
      if (genreRef.current && !genreRef.current.contains(target))
        setGenreOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      style={{ width: "100%", padding: "40px 60px", boxSizing: "border-box" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "-10px",
        }}
      >
        <ScrollTop />
        <ps.DropdownWrapper ref={sortRef}>
          <ps.DropdownButton
            open={sortOpen}
            onClick={() => setSortOpen((prev) => !prev)}
          >
            {sortOptions.find(
              (o) => o.value === (sort.startsWith("name") ? sort : "date")
            )?.label || "정렬"}
          </ps.DropdownButton>
          {sortOpen && (
            <ps.DropdownList>
              {sortOptions.map((option) => (
                <ps.DropdownItem
                  key={option.value}
                  onClick={() => {
                    handleSortChange(option.value);
                    setSortOpen(false);
                  }}
                >
                  {option.label}
                </ps.DropdownItem>
              ))}
            </ps.DropdownList>
          )}
        </ps.DropdownWrapper>
        <ps.DropdownWrapper ref={statusRef}>
          <ps.DropdownButton
            open={statusOpen}
            onClick={() => setStatusOpen((prev) => !prev)}
          >
            {stFilter}
          </ps.DropdownButton>
          {statusOpen && (
            <ps.DropdownList>
              <ps.DropdownItem onClick={() => handleStatusChange("공연중")}>
                공연중
              </ps.DropdownItem>
              <ps.DropdownItem onClick={() => handleStatusChange("공연예정")}>
                공연예정
              </ps.DropdownItem>
            </ps.DropdownList>
          )}
        </ps.DropdownWrapper>
        <ps.DropdownWrapper ref={areaRef}>
          <ps.DropdownButton
            open={areaOpen}
            onClick={() => setAreaOpen((prev) => !prev)}
          >
            지역
          </ps.DropdownButton>
          {areaOpen && (
            <ps.DropdownList>
              {AREA_OPTIONS.map((area) => (
                <ps.DropdownItem
                  key={area}
                  onClick={() => {
                    handleAreaChange(area);
                    setAreaOpen(false);
                  }}
                >
                  {area}
                </ps.DropdownItem>
              ))}
            </ps.DropdownList>
          )}
        </ps.DropdownWrapper>
        <ps.DropdownWrapper ref={genreRef}>
          <ps.DropdownButton
            open={genreOpen}
            onClick={() => setGenreOpen((prev) => !prev)}
            style={{ minWidth: "200px" }}
          >
            장르
          </ps.DropdownButton>
          {genreOpen && (
            <ps.DropdownList>
              {GENRE_OPTIONS.map((genre) => (
                <ps.DropdownItem
                  key={genre}
                  onClick={() => {
                    handleGenreChange(genre);
                    setGenreOpen(false);
                  }}
                >
                  {genre}
                </ps.DropdownItem>
              ))}
            </ps.DropdownList>
          )}
        </ps.DropdownWrapper>
        <s.PerformancePlace>
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
        </s.PerformancePlace>
        <div
          onClick={() => {
            setSort("name_asc");
            setArFilter([]);
            setGeFilter([]);
            setStFilter("공연중");
            setVtFilter(false);
            setQuery("");
            setPage(0);
            getPerformance("", false, 0);
          }}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid #ccc",
            background: "#f0f0f0",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GrPowerReset size={12} color="#333" />
        </div>
        <div style={{ position: "relative", marginLeft: "auto" }}>
          <input
            type="text"
            placeholder="공연명 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") getPerformance(query, false, 0);
            }}
            style={{
              backgroundColor: "#fbfbfb",
              padding: "8px 36px 8px 24px",
              width: searchOpen || query ? 250 : 0,
              opacity: searchOpen || query ? 1 : 0,
              borderRadius: 10,
              border: "2px solid #ccc",
              outline: "none",
              boxSizing: "border-box",
              transition: "width 0.3s, opacity 0.3s",
              pointerEvents: searchOpen || query ? "auto" : "none",
            }}
          />
          <PiMagnifyingGlass
            size={18}
            onClick={() => {
              if (!query) setSearchOpen((prev) => !prev);
              else {
                setPage(0);
                getPerformance(query, false, 0);
              }
            }}
            style={{
              position: "absolute",
              right: 10,
              top: 13,
              color: "grey",
              cursor: "pointer",
            }}
          />
          {searchOpen && query && (
            <GrClose
              size={12}
              onClick={() => {
                setQuery("");
                getPerformance("", false, 0);
              }}
              style={{
                position: "absolute",
                right: 40,
                top: 16,
                color: "grey",
                cursor: "pointer",
              }}
            />
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "36px",
          marginBottom: "25px",
        }}
      >
        {arfilter.map((item) => (
          <div
            key={`area-${item}`}
            style={{
              color: "#dbdbdb",
              display: "flex",
              alignItems: "center",
              background: "#3A3A3A",
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        {gefilter.map((item) => (
          <div
            key={`genre-${item}`}
            style={{
              color: "#dbdbdb",
              display: "flex",
              alignItems: "center",
              background: "#3A3A3A",
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

      {performances.length === 0 && !loading && (
        <div
          className="detail-error"
          style={{ color: "white", marginTop: "20px" }}
        >
          공연 정보를 찾을 수 없습니다.
        </div>
      )}
      {loading && page === 0 ? (
        <PrfList24Skeleton />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "30px",
            marginTop: "30px",
          }}
        >
          {performances
            .filter((p) => new Date(p.prfEndDt) >= new Date())
            .map((p) => (
              <div
                key={p.prfId}
                style={{
                  textAlign: "left",
                  padding: "5px",
                  borderRadius: "14px",
                }}
              >
                <div
                  onClick={() => navigate(`/performance/${p.prfId}`)}
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "8px",
                      background: "rgba(0,0,0,0.6)",
                      color: "white",
                      padding: "4px 8px",
                      fontSize: "14px",
                      borderRadius: "12px",
                      zIndex: 2,
                      pointerEvents: "none",
                    }}
                  >
                    {p.genreNm}
                  </div>
                  {/* ───────────── 포스터 ───────────── */}
                  <img
                    src={p.posterImgUrl}
                    alt={p.prfNm}
                    style={{
                      width: "100%",
                      height: "260px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "0px",
                      // cursor: "pointer",
                    }}
                  />

                  {/* ───────────── 공연명 ───────────── */}
                  <s.PerformanceDetail1>
                    <h4
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        marginBottom: "4px",
                        lineHeight: "1.4",
                        wordBreak: "keep-all",
                        overflowWrap: "break-word",
                        whiteSpace: "normal",
                        cursor: "pointer",
                      }}
                    >
                      {removeRegionTag(p.prfNm)}
                    </h4>
                  </s.PerformanceDetail1>

                  {/* ───────────── 공연장명 ───────────── */}
                  <s.PerformancePlace>
                    <p
                      style={{
                        fontSize: "13px",
                        margin: "2px 0",
                        wordBreak: "keep-all",
                        overflowWrap: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {(() => {
                        const original = p.prfPlcNm;
                        let result = "";
                        const seen = new Set<string>();
                        original.split(/\s*(\([^)]+\))/).forEach((part) => {
                          if (!part) return;
                          if (!part.startsWith("(")) {
                            result += part;
                            return;
                          }
                          const content = part.slice(1, -1).trim();
                          const normalizedContent = content.replace(/\s+/g, "");
                          const normalizedResult = result.replace(/\s+/g, "");
                          if (
                            seen.has(normalizedContent) ||
                            normalizedResult.includes(normalizedContent)
                          ) {
                            return;
                          }
                          seen.add(normalizedContent);
                          result += `(${content})`;
                        });
                        return result.trim();
                      })()}
                    </p>
                  </s.PerformancePlace>

                  {/* ───────────── 날짜 ───────────── */}
                  <s.PerformancePeriod>
                    <p
                      style={{
                        fontSize: "12.5px",
                        margin: "2px 0",
                      }}
                    >
                      {formatDateRange(
                        formatDateDot(p.prfStartDt),
                        formatDateDot(p.prfEndDt)
                      )}
                    </p>
                  </s.PerformancePeriod>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default PerformanceList;
