import { useState, useEffect, useCallback, useRef } from 'react';
import { GrPowerReset } from 'react-icons/gr';
import useInfiniteScroll from '../../../configs/useInfiniteScroll';
import { useNavigate, useNavigationType } from 'react-router-dom';
import ScrollTop from '../../../components/common/Button/ScrollTopButton';
import { formatDateDot, formatDateRange } from '../../../components/FormatDate/FormatDate';
import { removeRegionTag } from '../../../components/removeRegionTag/removeRegionTag';
import PrfList24Skeleton from '../../../components/skeleton/PrfList24Skeleton';
import { Performance } from '../../../types/performancePageTypes';
import * as s from './styles';

function PerformanceList() {
  // 1) 네비게이션 타입 및 초기 마운트 체크
  const navigationType = useNavigationType();
  const isInitialMount = useRef(true);

  // 2) sessionStorage 기반 초기 데이터 로드
  const [performances, setPerformances] = useState<Performance[]>(() => {
    const storedData = sessionStorage.getItem('scroll-performance-data');
    return storedData ? JSON.parse(storedData) : [];
  });
  const [loading, setLoading] = useState(true);

  // 3) 정렬/검색/필터/page 상태값 (sessionStorage 초기값 포함)
  const [sort, setSort] = useState(() => sessionStorage.getItem('scroll-performance-sort') || 'name_asc');
  const navigate = useNavigate();
  const [page, setPage] = useState(() => Number(sessionStorage.getItem('scroll-performance-page') || 0));
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState(() => sessionStorage.getItem('scroll-performance-query') || '');
  const [stFilter, setStFilter] = useState(() =>
    JSON.parse(sessionStorage.getItem('scroll-performance-stfilter') || '"공연중"')
  );
  const [arfilter, setArFilter] = useState<string[]>(() =>
    JSON.parse(sessionStorage.getItem('scroll-performance-arfilter') || '[]')
  );
  const [gefilter, setGeFilter] = useState<string[]>(() =>
    JSON.parse(sessionStorage.getItem('scroll-performance-gefilter') || '[]')
  );
  const [vtFilter, setVtFilter] = useState(() =>
    JSON.parse(sessionStorage.getItem('scroll-performance-vtfilter') || 'false')
  );

  // 4) 공연 정보 불러오기 (검색/필터/정렬 적용)
  const getPerformance = useCallback(
    async (searchQuery: string, append = false, pageToLoad = 0) => {
      setLoading(true);
      try {
        const baseUrl = 'http://localhost:8080/prfDetails';
        const isSearch = searchQuery.trim() !== '';

        const params = new URLSearchParams();
        if (isSearch) params.append('search', searchQuery);
        params.append('sort', sort);
        params.append('page', String(pageToLoad));
        params.append('size', '30');
        if (stFilter) params.append('stFilter', stFilter);
        if (arfilter.length > 0) params.append('arFilter', arfilter.join(','));
        if (gefilter.length > 0) params.append('geFilter', gefilter.join(','));
        if (vtFilter) params.append('vtFilter', 'Y');

        const url = `${baseUrl}${isSearch ? '/search' : ''}?${params.toString()}`;
        const response = await fetch(url);
        const json: Performance[] = await response.json();

        // append 모드(무한스크롤)인지 / 새로 로드인지
        if (append) setPerformances((prev) => [...prev, ...json]);
        else setPerformances(json);

        setHasMore(json.length > 0);
      } catch (err) {
        console.log('공연 정보 불러오는 중 오류 발생', err);
      } finally {
        setLoading(false);
      }
    },
    [sort, stFilter, arfilter, gefilter, vtFilter]
  );

  // 5) 모든 주요 상태값 → sessionStorage 자동 저장
  useEffect(() => {
    sessionStorage.setItem('scroll-performance-sort', sort);
    sessionStorage.setItem('scroll-performance-query', query);
    sessionStorage.setItem('scroll-performance-stfilter', JSON.stringify(stFilter));
    sessionStorage.setItem('scroll-performance-arfilter', JSON.stringify(arfilter));
    sessionStorage.setItem('scroll-performance-gefilter', JSON.stringify(gefilter));
    sessionStorage.setItem('scroll-performance-page', String(page));
    sessionStorage.setItem('scroll-performance-data', JSON.stringify(performances));
    sessionStorage.setItem('scroll-performance-vtfilter', JSON.stringify(vtFilter));
  }, [sort, query, stFilter, arfilter, gefilter, page, performances, vtFilter]);

  // 6) mount 또는 필터/정렬 변경 시 데이터 재요청
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

      // 뒤로가기 시 → 새 fetch 없이 기존 데이터 사용
      if (navigationType === 'POP' && performances.length > 0) {
        setLoading(false);
        return;
      }
    }

    // 필터 변경 시 페이지 초기화 + 새 데이터 로드
    setPage(0);
    getPerformance(query, false, 0);
  }, [sort, stFilter, arfilter, gefilter, vtFilter, getPerformance, navigationType]);

  // 7) 필터 핸들러
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

  const removeFilter = (type: 'area' | 'genre', value: string) => {
    if (type === 'area') setArFilter(arfilter.filter((item) => item !== value));
    else setGeFilter(gefilter.filter((item) => item !== value));
  };

  // 8) 무한 스크롤 loadMore
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      getPerformance(query, true, nextPage);
    }
  }, [loading, hasMore, page, query, getPerformance]);

  useInfiniteScroll(loadMore, hasMore);

  // 9) 필터 옵션 목록
  const AREA_OPTIONS = [
    '서울',
    '부산',
    '인천',
    '대구',
    '대전',
    '광주',
    '울산',
    '세종',
    '경기',
    '강원',
    '경북',
    '경남',
    '충북',
    '충남',
    '전북',
    '전남',
    '제주',
  ];

  const GENRE_OPTIONS = [
    '대중무용',
    '대중음악',
    '무용(서양/한국무용)',
    '뮤지컬',
    '복합',
    '서양음악(클래식)',
    '서커스/마술',
    '연극',
    '한국음악(국악)',
  ];

  // 10) 드롭다운 열림/닫힘 관련 상태
  const [searchOpen, setSearchOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);

  // 11) 정렬 옵션
  const sortOptions = [
    { value: 'name_asc', label: '이름순 ↑' },
    { value: 'name_desc', label: '이름순 ↓' },
    { value: 'date', label: '최신순' },
  ];

  // 12) 초기 query가 있으면 검색창 열기
  useEffect(() => {
    if (query) setSearchOpen(true);
  }, []);

  // 13) 정렬 변경 핸들러
  const handleSortChange = (value: string) => {
    if (value === 'name_asc' || value === 'name_desc') {
      setSort(value);
    } else if (value === 'name') {
      setSort((prev) => (prev === 'name_asc' ? 'name_desc' : 'name_asc'));
    } else {
      setSort('date');
    }
  };

  // 14) 드롭다운 바깥 클릭 감지
  const sortRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const genreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (sortRef.current && !sortRef.current.contains(target)) setSortOpen(false);
      if (statusRef.current && !statusRef.current.contains(target)) setStatusOpen(false);
      if (areaRef.current && !areaRef.current.contains(target)) setAreaOpen(false);
      if (genreRef.current && !genreRef.current.contains(target)) setGenreOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // 15) UI 렌더링
  return (
    <s.FullBox>
      {/* 상단 필터/정렬 옵션 */}
      <s.SubBox>
        <ScrollTop />

        {/* 정렬 드롭다운 */}
        <s.DropdownWrapper ref={sortRef}>
          <s.DropdownButton open={sortOpen} onClick={() => setSortOpen((prev) => !prev)}>
            {sortOptions.find((o) => o.value === (sort.startsWith('name') ? sort : 'date'))?.label || '정렬'}
          </s.DropdownButton>

          {sortOpen && (
            <s.DropdownList>
              {sortOptions.map((option) => (
                <s.DropdownItem
                  key={option.value}
                  onClick={() => {
                    handleSortChange(option.value);
                    setSortOpen(false);
                  }}
                >
                  {option.label}
                </s.DropdownItem>
              ))}
            </s.DropdownList>
          )}
        </s.DropdownWrapper>

        {/* 상태 필터 */}
        <s.DropdownWrapper ref={statusRef}>
          <s.DropdownButton open={statusOpen} onClick={() => setStatusOpen((prev) => !prev)}>
            {stFilter}
          </s.DropdownButton>
          {statusOpen && (
            <s.DropdownList>
              <s.DropdownItem onClick={() => handleStatusChange('공연중')}>공연중</s.DropdownItem>
              <s.DropdownItem onClick={() => handleStatusChange('공연예정')}>공연예정</s.DropdownItem>
            </s.DropdownList>
          )}
        </s.DropdownWrapper>

        {/* 지역 필터 */}
        <s.DropdownWrapper ref={areaRef}>
          <s.DropdownButton open={areaOpen} onClick={() => setAreaOpen((prev) => !prev)}>
            지역
          </s.DropdownButton>

          {areaOpen && (
            <s.DropdownList>
              {AREA_OPTIONS.map((area) => (
                <s.DropdownItem
                  key={area}
                  onClick={() => {
                    handleAreaChange(area);
                    setAreaOpen(false);
                  }}
                >
                  {area}
                </s.DropdownItem>
              ))}
            </s.DropdownList>
          )}
        </s.DropdownWrapper>

        {/* 장르 필터 */}
        <s.DropdownWrapper ref={genreRef}>
          <s.GenreDropdownButton open={genreOpen} onClick={() => setGenreOpen((prev) => !prev)}>
            장르
          </s.GenreDropdownButton>

          {genreOpen && (
            <s.DropdownList>
              {GENRE_OPTIONS.map((genre) => (
                <s.DropdownItem
                  key={genre}
                  onClick={() => {
                    handleGenreChange(genre);
                    setGenreOpen(false);
                  }}
                >
                  {genre}
                </s.DropdownItem>
              ))}
            </s.DropdownList>
          )}
        </s.DropdownWrapper>

        {/* 내한 공연 필터 */}
        <s.PerformancePlace>
          <s.PlaceInner>
            <s.PlaceLabel>
              <input type='checkbox' checked={vtFilter} onChange={(e) => setVtFilter(e.target.checked)} />
              내한 공연
            </s.PlaceLabel>
          </s.PlaceInner>
        </s.PerformancePlace>

        {/* 전체 필터 초기화 */}
        <s.ResetButton
          onClick={() => {
            setSort('name_asc');
            setArFilter([]);
            setGeFilter([]);
            setStFilter('공연중');
            setVtFilter(false);
            setQuery('');
            setPage(0);
            getPerformance('', false, 0);
          }}
        >
          <GrPowerReset />
        </s.ResetButton>

        {/* 검색창 */}
        <s.SearchWrapper>
          <s.SearchInput
            type='text'
            placeholder='공연명 검색'
            value={query}
            open={searchOpen || !!query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') getPerformance(query, false, 0);
            }}
          />

          <s.SearchIcon
            size={18}
            onClick={() => {
              if (!query) setSearchOpen((prev) => !prev);
              else {
                setPage(0);
                getPerformance(query, false, 0);
              }
            }}
          />

          {searchOpen && query && (
            <s.ClearIcon
              size={12}
              onClick={() => {
                setQuery('');
                getPerformance('', false, 0);
              }}
            />
          )}
        </s.SearchWrapper>
      </s.SubBox>

      {/* 지역 필터 태그 */}
      <s.FilterContainerWithTop>
        {arfilter.map((item) => (
          <s.AreaFilterItem key={`area-${item}`}>
            <span>{item}</span>
            <s.AreaFilterRemove size={16} onClick={() => removeFilter('area', item)} />
          </s.AreaFilterItem>
        ))}
      </s.FilterContainerWithTop>

      {/* 장르 필터 태그 */}
      <s.FilterContainer>
        {gefilter.map((item) => (
          <s.GenreFilterItem key={`genre-${item}`}>
            <span>{item}</span>
            <s.GenreFilterRemove size={14} onClick={() => removeFilter('genre', item)} />
          </s.GenreFilterItem>
        ))}
      </s.FilterContainer>

      {/* 결과 없음 메시지 */}
      {performances.length === 0 && !loading && (
        <s.ErrorMessage className='detail-error'>공연 정보를 찾을 수 없습니다.</s.ErrorMessage>
      )}

      {/* 스켈레톤 or 공연 목록 */}
      {loading && page === 0 ? (
        <PrfList24Skeleton />
      ) : (
        <s.PerformanceGrid>
          {performances
            .filter((p) => new Date(p.prfEndDt) >= new Date())
            .map((p) => (
              <s.PerformanceCard key={p.prfId}>
                <s.ClickableWrapper onClick={() => navigate(`/performance/${p.prfId}`)}>
                  {/* 장르명 */}
                  <s.GenreNm>
                    <div>{p.genreNm}</div>
                  </s.GenreNm>

                  {/* 포스터 */}
                  <s.PosterImg>
                    <img src={p.posterImgUrl} alt={p.prfNm} />
                  </s.PosterImg>

                  {/* 제목 (지역 태그 제거 버전) */}
                  <s.PerformanceDetail1>{removeRegionTag(p.prfNm)}</s.PerformanceDetail1>

                  {/* 공연 장소 (중복 괄호 제거 로직 적용 버전) */}
                  <s.PerformancePlace2>
                    <p>
                      {(() => {
                        const original = p.prfPlcNm;
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
                    </p>
                  </s.PerformancePlace2>

                  {/* 공연 기간 */}
                  <s.PerformancePeriod>
                    <p>{formatDateRange(formatDateDot(p.prfStartDt), formatDateDot(p.prfEndDt))}</p>
                  </s.PerformancePeriod>
                </s.ClickableWrapper>
              </s.PerformanceCard>
            ))}
        </s.PerformanceGrid>
      )}
    </s.FullBox>
  );
}

export default PerformanceList;
