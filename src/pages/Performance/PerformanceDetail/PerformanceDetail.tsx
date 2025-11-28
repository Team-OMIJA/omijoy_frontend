import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SlHeart } from "react-icons/sl";
import { ImHeart } from "react-icons/im";
import { useFavoriteState } from "../../../stores/useFavoriteState";
import { removeRegionTag } from "../../../components/removeRegionTag/removeRegionTag";
import CheckIcon from "@mui/icons-material/Check";
import { PerformanceDetailPage } from "../../../types/performancePageTypes";
import { fetchPerformanceDetail } from "../../../apis/performanceApi";
import * as s from "./styles";
import { usePrincipalState } from "../../../stores/usePrincipalState";

function PerformanceDetail() {
  const { id: prfId } = useParams<{ id: string }>();
  const { principal } = usePrincipalState();
  const [performance, setPerformance] = useState<PerformanceDetailPage | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [showLinks, setShowLinks] = useState(false);
  const { toggleFavorite, fetchFavoriteState, fetchFavoriteCount } =
    useFavoriteState();

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // const liked = id ? favorites[id] ?? false : false;

  // UI 상태 변경(DB반영 X)
  const [localLiked, setLocalLiked] = useState(false);
  const [localScrapCount, setLocalScrapCount] = useState(0);

  // 최초 좋아요 상태 기억 (페이지 떠날 때 비교함)
  const initialLiked = useRef(false);
  const initialScrapCount = useRef(0);

  // 페이지 이동 시 값 비교
  // useLocation = ReactRouter에서 현재 URL 정보 줌
  const location = useLocation();
  const prevLocation = useRef(location.pathname);

  const navigate = useNavigate();

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowLinks(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 상세 정보 + 좋아요 여부 + 스크랩 count 불러오기
  useEffect(() => {
    const loadData = async () => {
      try {
        if (!prfId) return;
        const data = await fetchPerformanceDetail(prfId);
        setPerformance(data);

        // 서버 좋아요 여부 가져오기
        const serverLiked = await fetchFavoriteState(prfId);

        // 서버 카운트 가져오기 null 이면 0
        await fetchFavoriteCount(prfId);
        const count = useFavoriteState.getState().favoriteCount[prfId] ?? 0;

        setLocalLiked(serverLiked);
        setLocalScrapCount(count);

        // 최초 상태 저장
        initialLiked.current = serverLiked;
        initialScrapCount.current = count;
      } catch (err) {
        setPerformance(null);
        alert("공연 정보를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [prfId]);

  // UI 즉시 토글
  const handleToggleLocalFavorite = () => {
    if (!principal) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
      return;
    }
    setLocalLiked((prev) => !prev);
    setLocalScrapCount((prev) =>
      localLiked ? Math.max(prev - 1, 0) : prev + 1
    );
  };

  // 아래 useEffect 로직 2개 중에 하나라도 없으면 반영 안됨
  // 컴포넌트 기반 / 라우팅 pathname 기반이라서...
  // 커스텀 훅 도입도 생각해볼 것

  // 반영이 늦다? 아닌듯 - 뭔가 지금
  // 공연 -> 마이페이지 흐름에서 이상한 부분 있는지 확인할 것 - 상태 바로 못받는듯

  // 페이지 떠날 때 서버에 딱 1번만 반영
  // 페이지 이동 감지 못해서 다른 로직 사용
  useEffect(() => {
    return () => {
      const likedChanged = localLiked !== initialLiked.current;

      if (likedChanged) {
        toggleFavorite(prfId!);
      }
    };
  }, [prfId, localLiked]);

  // cleanUp 함수 - 이전 페이지에서 벗어날 때 무조건 호출됨
  // 페이지 떠날 때만 DB 저장
  // React Router 이동 시 cleanup 실행이 보장되지 않아서 사용
  useEffect(() => {
    return () => {
      // 페이지 이동했을 때
      if (prevLocation.current !== location.pathname) {
        const likedChanged = localLiked !== initialLiked.current;
        if (likedChanged) {
          toggleFavorite(prfId!);
        }
      }
    };
  }, [location.pathname, prfId, localLiked]);

  if (loading) return <div>로딩 중...</div>;
  if (!performance) return <div>공연 정보를 찾을 수 없습니다.</div>;

  const HeartIcon = localLiked ? ImHeart : SlHeart;

  // 예매처 사이트 이름 추출
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
    if (lower.includes("coupang")) return "쿠팡";
    if (lower.includes("clipservice")) return "클립서비스";
    if (lower.includes("timeticket")) return "타임 티켓";
    if (lower.includes("maketicket")) return "마켓 티켓";
    if (lower.includes("playicket")) return "플레이 티켓";
    if (lower.includes("tmon")) return "티몬";
    if (lower.includes("sejongpac")) return "세종문화회관";
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
    <s.PageBackground>
      <s.Container>
        <s.Poster src={performance.posterImgUrl} />

        {/* 오른쪽 내용 섹션 */}
        <s.Content>
          <s.TopRightButtons>
            <s.HeartWrapper>
              <s.HeartIconButton
                liked={localLiked}
                onClick={handleToggleLocalFavorite}
              >
                <HeartIcon />
              </s.HeartIconButton>

              {/* 스크랩 카운트 표시 */}
              {localScrapCount > 0 && (
                <s.ScrapCountText>{localScrapCount}</s.ScrapCountText>
              )}
            </s.HeartWrapper>
          </s.TopRightButtons>

          {/* 제목 */}
          <s.Title>{removeRegionTag(performance.prfNm)}</s.Title>

          {/* 2 컬럼 정보 레이아웃 */}
          <s.InfoGrid>
            {/* 왼쪽 컬럼 */}
            <s.InfoGroup>
              <s.InfoItem>
                <s.Label>공연 장소</s.Label>
                <s.Value>{performance.prfPlcNm}</s.Value>
              </s.InfoItem>

              <s.InfoItem>
                <s.Label>지역</s.Label>
                <s.Value>{performance.area}</s.Value>
              </s.InfoItem>

              <s.InfoItem>
                <s.Label>공연 기간</s.Label>
                <s.Value>
                  {performance.prfStartDt} ~ {performance.prfEndDt}
                </s.Value>
              </s.InfoItem>

              <s.InfoItem>
                <s.Label>공연 시간</s.Label>
                <s.Value>
                  {performance.dtGuidance
                    ?.split("),")
                    .map((t) => (t.endsWith(")") ? t : t + ")"))
                    .join("\n")}
                </s.Value>
              </s.InfoItem>

              {performance.child === "Y" && (
                <s.InfoItem>
                  <s.CheckRow>
                    <s.CheckIconStyle>
                      <CheckIcon />
                    </s.CheckIconStyle>
                    <s.CheckText>미취학 아동 입장 가능</s.CheckText>
                  </s.CheckRow>
                </s.InfoItem>
              )}

              {performance.visit === "Y" && (
                <s.InfoItem>
                  <s.CheckRow>
                    <s.CheckIconStyle>
                      <CheckIcon />
                    </s.CheckIconStyle>
                    <s.CheckText>내한 공연</s.CheckText>
                  </s.CheckRow>
                </s.InfoItem>
              )}
            </s.InfoGroup>

            {/* 오른쪽 컬럼 */}
            <s.InfoGroup>
              <s.InfoItem>
                <s.Label>장르</s.Label>
                <s.Value>{performance.genreNm}</s.Value>
              </s.InfoItem>

              <s.InfoItem>
                <s.Label>관람등급</s.Label>
                <s.Value>{performance.prfAge}</s.Value>
              </s.InfoItem>

              <s.InfoItem>
                <s.Label>관람시간</s.Label>
                <s.Value>{performance.runtime}</s.Value>
              </s.InfoItem>

              <s.InfoItem>
                <s.Label>가격</s.Label>
                <s.Value>
                  {performance.ticketPrice
                    ?.toString()
                    .split(", ")
                    .map((p, i) => (
                      <div key={i}>{p}</div>
                    ))}
                </s.Value>
              </s.InfoItem>
            </s.InfoGroup>
          </s.InfoGrid>
        </s.Content>
      </s.Container>

      {/* 예매 버튼 + dropdown */}
      <s.TicketWrapper ref={wrapperRef}>
        <s.TicketButton onClick={() => setShowLinks((prev) => !prev)}>
          예매 바로가기 →
        </s.TicketButton>

        {showLinks && (
          <s.TicketDropdown>
            {performance.providerUrl?.split(",").map((raw, i) => {
              const url = raw.trim();
              if (!url) return null;

              const validUrl = url.startsWith("http") ? url : `https://${url}`;

              return (
                <s.TicketLink
                  key={i}
                  onClick={() => window.open(validUrl, "_blank")}
                >
                  {getSiteName(validUrl)}
                </s.TicketLink>
              );
            })}
          </s.TicketDropdown>
        )}
      </s.TicketWrapper>

      <s.Divider />

      {/* 상세 이미지들 */}
      {performance.detailImgUrl &&
        performance.detailImgUrl
          .split(",")
          .map((url, i) => <s.DetailImage key={i} src={url.trim()} />)}
    </s.PageBackground>
  );
}

export default PerformanceDetail;