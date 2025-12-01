import { useState, useEffect, useCallback, useRef } from "react";
import { GrPowerReset } from "react-icons/gr";
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
import * as s from "./PerformanceListStyles";

function PerformanceList() {
  // 기본 라우팅 / 초기 Ref
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const isInitialMount = useRef(true);

  // 데이터 / 필터 / 페이지
  const [performances, setPerformances] = useState<Performance[]>(() =>
    JSON.parse(sessionStorage.getItem("scroll-performance-data") || "[]")
  );
  const [page, setPage] = useState(() =>
    Number(sessionStorage.getItem("scroll-performance-page") || 0)
  );
  const [sort, setSort] = useState(
    () => sessionStorage.getItem("scroll-performance-sort") || "name_asc"
  );
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

  // 로딩 / 스크롤
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // 드롭다운 UI & ref
  const [searchOpen, setSearchOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const genreRef = useRef<HTMLDivElement>(null);

  // 옵션 상수
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

  const sortOptions = [
    { value: "name_asc", label: "이름순 ↑" },
    { value: "name_desc", label: "이름순 ↓" },
    { value: "date", label: "최신순" },
  ];

  // 핸들러
  const handleStatusChange = (v: string) => {
    setStFilter(v);
    setStatusOpen(false);
  };
  const handleAreaChange = (v: string) => {
    if (!arfilter.includes(v)) setArFilter([...arfilter, v]);
  };
  const handleGenreChange = (v: string) => {
    if (!gefilter.includes(v)) setGeFilter([...gefilter, v]);
  };
  const removeFilter = (type: "area" | "genre", value: string) =>
    type === "area"
      ? setArFilter(arfilter.filter((i) => i !== value))
      : setGeFilter(gefilter.filter((i) => i !== value));
  const handleSortChange = (value: string) => {
    if (value === "name_asc" || value === "name_desc") setSort(value);
    else if (value === "name")
      setSort((prev) => (prev === "name_asc" ? "name_desc" : "name_asc"));
    else setSort("date");
  };

  // 데이터 fetch + 무한 스크롤
  const getPerformance = useCallback(
    async (searchQuery: string, append = false, pageToLoad = 0) => {
      setLoading(true);
      try {
        const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/prfDetails`;
        const params = new URLSearchParams();
        if (searchQuery.trim() !== "") params.append("search", searchQuery);
        params.append("sort", sort);
        params.append("page", String(pageToLoad));
        params.append("size", "30");
        if (stFilter) params.append("stFilter", stFilter);
        if (arfilter.length) params.append("arFilter", arfilter.join(","));
        if (gefilter.length) params.append("geFilter", gefilter.join(","));
        if (vtFilter) params.append("vtFilter", "Y");

        const response = await fetch(
          `${baseUrl}${searchQuery ? "/search" : ""}?${params.toString()}`
        );
        const json: Performance[] = await response.json();

        append
          ? setPerformances((prev) => [...prev, ...json])
          : setPerformances(json);
        setHasMore(json.length > 0);
      } catch (err) {
        console.log("공연 정보 불러오는 중 오류 발생", err);
      } finally {
        setLoading(false);
      }
    },
    [sort, stFilter, arfilter, gefilter, vtFilter]
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => {
        const next = prev + 1;
        getPerformance(query, true, next);
        return next;
      });
    }
  }, [loading, hasMore, query, getPerformance]);

  useInfiniteScroll(loadMore, hasMore);

  useEffect(() => {
    if (!isInitialMount.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [sort, stFilter, arfilter, gefilter, vtFilter]);

  // sessionStorage 자동 저장
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

  // mount + 필터 변경 + query 검색창
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (navigationType === "POP" && performances.length) {
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (query) setSearchOpen(true);
  }, []);

  // 드롭다운 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const t = e.target as Node;
      if (sortRef.current && !sortRef.current.contains(t)) setSortOpen(false);
      if (statusRef.current && !statusRef.current.contains(t))
        setStatusOpen(false);
      if (areaRef.current && !areaRef.current.contains(t)) setAreaOpen(false);
      if (genreRef.current && !genreRef.current.contains(t))
        setGenreOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // UI
  return (
    <s.PerformanceListFullBox>
      <s.PerformanceListSubBox>
        <s.PerformanceListTopRow>
          <ScrollTop />

          {/* 정렬 드롭다운 */}
          <s.PerformanceListDropdownWrapper ref={sortRef}>
            <s.PerformanceListDropdownButton
              open={sortOpen}
              onClick={() => setSortOpen(!sortOpen)}
            >
              {
                sortOptions.find(
                  (o) => o.value === (sort.startsWith("name") ? sort : "date")
                )?.label
              }
            </s.PerformanceListDropdownButton>
            {sortOpen && (
              <s.PerformanceListDropdownList>
                {sortOptions.map((o) => (
                  <s.PerformanceListDropdownItem
                    key={o.value}
                    onClick={() => {
                      handleSortChange(o.value);
                      setSortOpen(false);
                    }}
                  >
                    {o.label}
                  </s.PerformanceListDropdownItem>
                ))}
              </s.PerformanceListDropdownList>
            )}
          </s.PerformanceListDropdownWrapper>

          {/* 공연 상태 */}
          <s.PerformanceListDropdownWrapper ref={statusRef}>
            <s.PerformanceListDropdownButton
              open={statusOpen}
              onClick={() => setStatusOpen(!statusOpen)}
            >
              {stFilter}
            </s.PerformanceListDropdownButton>
            {statusOpen && (
              <s.PerformanceListDropdownList>
                <s.PerformanceListDropdownItem
                  onClick={() => handleStatusChange("공연중")}
                >
                  공연중
                </s.PerformanceListDropdownItem>
                <s.PerformanceListDropdownItem
                  onClick={() => handleStatusChange("공연예정")}
                >
                  공연예정
                </s.PerformanceListDropdownItem>
              </s.PerformanceListDropdownList>
            )}
          </s.PerformanceListDropdownWrapper>

          {/* 지역 */}
          <s.PerformanceListDropdownWrapper ref={areaRef}>
            <s.PerformanceListDropdownButton
              open={areaOpen}
              onClick={() => setAreaOpen(!areaOpen)}
            >
              지역
            </s.PerformanceListDropdownButton>
            {areaOpen && (
              <s.PerformanceListDropdownList>
                {AREA_OPTIONS.map((area) => (
                  <s.PerformanceListDropdownItem
                    key={area}
                    onClick={() => {
                      handleAreaChange(area);
                      setAreaOpen(false);
                    }}
                  >
                    {area}
                  </s.PerformanceListDropdownItem>
                ))}
              </s.PerformanceListDropdownList>
            )}
          </s.PerformanceListDropdownWrapper>

          {/* 장르 */}
          <s.PerformanceListDropdownWrapper ref={genreRef}>
            <s.PerformanceListGenreDropdownButton
              open={genreOpen}
              onClick={() => setGenreOpen(!genreOpen)}
            >
              장르
            </s.PerformanceListGenreDropdownButton>

            {genreOpen && (
              <s.PerformanceListDropdownList>
                {GENRE_OPTIONS.map((genre) => (
                  <s.PerformanceListDropdownItem
                    key={genre}
                    onClick={() => {
                      handleGenreChange(genre);
                      setGenreOpen(false);
                    }}
                  >
                    {genre}
                  </s.PerformanceListDropdownItem>
                ))}
              </s.PerformanceListDropdownList>
            )}
          </s.PerformanceListDropdownWrapper>

          {/* 내한 */}
          <s.PerformanceListPlaceFilter>
            <s.PerformanceListPlaceInner>
              <s.PerformanceListPlaceLabel>
                <input
                  type="checkbox"
                  checked={vtFilter}
                  onChange={(e) => setVtFilter(e.target.checked)}
                />
                내한 공연
              </s.PerformanceListPlaceLabel>
            </s.PerformanceListPlaceInner>
          </s.PerformanceListPlaceFilter>

          {/* 리셋 */}
          <s.PerformanceListResetButton
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
          >
            <GrPowerReset />
          </s.PerformanceListResetButton>

          {/* 검색 */}
          <s.PerformanceListSearchWrapper>
            <s.PerformanceListSearchInput
              type="text"
              placeholder="공연명 검색"
              value={query}
              open={searchOpen || !!query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setPage(0);
                  getPerformance(query, false, 0);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            />
            <s.PerformanceListSearchIcon
              size={18}
              onClick={() => {
                if (!query) setSearchOpen(!searchOpen);
                else {
                  setPage(0);
                  getPerformance(query, false, 0);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            />
            {searchOpen && query && (
              <s.PerformanceListClearIcon
                size={12}
                onClick={() => {
                  setQuery("");
                  getPerformance("", false, 0);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
          </s.PerformanceListSearchWrapper>
        </s.PerformanceListTopRow>

        {/* 지역 칩 */}
        <s.PerformanceListAreaFilter hasChips={arfilter.length > 0}>
          {arfilter.map((item) => (
            <s.PerformanceListAreaFilterItem key={`area-${item}`}>
              <span>{item}</span>
              <s.PerformanceListAreaFilterRemove
                size={14}
                onClick={() => removeFilter("area", item)}
              />
            </s.PerformanceListAreaFilterItem>
          ))}
        </s.PerformanceListAreaFilter>

        {/* 장르 칩 */}
        <s.PerformanceListGenreFilter hasChips={gefilter.length > 0}>
          {gefilter.map((item) => (
            <s.PerformanceListGenreFilterItem key={`genre-${item}`}>
              <span>{item}</span>
              <s.PerformanceListGenreFilterRemove
                size={14}
                onClick={() => removeFilter("genre", item)}
              />
            </s.PerformanceListGenreFilterItem>
          ))}
        </s.PerformanceListGenreFilter>
      </s.PerformanceListSubBox>

      {/* if 결과 없음 */}
      {performances.length === 0 && !loading && (
        <s.PerformanceListErrorMessage className="detail-error">
          공연 정보를 찾을 수 없습니다.
        </s.PerformanceListErrorMessage>
      )}

      {/* 공연 리스트 */}
      {loading && page === 0 ? (
        <PrfList24Skeleton />
      ) : (
        <s.PerformanceListGrid>
          {performances
            .filter((p) => new Date(p.prfEndDt) >= new Date())
            .map((p) => (
                 <s.PerformanceListCard key={p.prfId}>
        
        {/* 이미지 */}
        <s.PosterWrapper onClick={() => navigate(`/performance/${p.prfId}`)}>
          <s.PerformanceListGenreNm>
            <div>{p.genreNm}</div>
          </s.PerformanceListGenreNm>

          <s.PerformanceListPosterImg>
            <img src={p.posterImgUrl} alt={p.prfNm} />
          </s.PerformanceListPosterImg>
        </s.PosterWrapper>

        {/* 텍스트 */}
        <s.InfoWrapper onClick={() => navigate(`/performance/${p.prfId}`)}>
          <s.PerformanceListName>
            {removeRegionTag(p.prfNm)}
          </s.PerformanceListName>

          <s.PerformanceListPlaceDetail>
            <p>
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
                  const normalized = content.replace(/\s+/g, "");
                  const normalizedResult = result.replace(/\s+/g, "");

                  if (
                    seen.has(normalized) ||
                    normalizedResult.includes(normalized)
                  )
                    return;

                  seen.add(normalized);
                  result += `(${content})`;
                });

                return result.trim();
              })()}
            </p>
          </s.PerformanceListPlaceDetail>

          <s.PerformanceListPeriod>
            <p>
              {formatDateRange(
                formatDateDot(p.prfStartDt),
                formatDateDot(p.prfEndDt)
              )}
            </p>
          </s.PerformanceListPeriod>
        </s.InfoWrapper>
      </s.PerformanceListCard>
            ))}
        </s.PerformanceListGrid>
      )}
    </s.PerformanceListFullBox>
  );
}

export default PerformanceList;
