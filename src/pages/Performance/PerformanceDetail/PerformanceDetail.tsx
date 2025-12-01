import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SlHeart } from "react-icons/sl";
import { ImHeart } from "react-icons/im";
import { removeRegionTag } from "../../../components/removeRegionTag/removeRegionTag";
import CheckIcon from "@mui/icons-material/Check";
import { PerformanceDetailPage } from "../../../types/performancePageTypes";
import { fetchPerformanceDetail } from "../../../apis/performanceApi";
import * as s from "./styles";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { useDeferredFavorite } from "../../../hooks/useDeferredFavorite";
import { formatTime } from "../../../components/format/formatDate";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { formatSiteName } from "../../../components/format/formatSiteName";
import { formatTicketProvider } from "../../../components/format/formatTicketProvider";

function PerformanceDetail() {
  const { id: prfId } = useParams<{ id: string }>();
  const { principal } = usePrincipalState();
  const navigate = useNavigate();

  const [performance, setPerformance] = useState<PerformanceDetailPage | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [showLinks, setShowLinks] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // 스크랩 로직 커스텀 훅 통합
  const { localLiked, localScrapCount, handleToggleLocalFavorite } =
    useDeferredFavorite(prfId);

  const handleFavoriteClick = () => {
    if (!principal) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
      return;
    }
    handleToggleLocalFavorite();
  };

  // 외부 클릭 감지
  useOutsideClick(wrapperRef, () => {
    setShowLinks(false);
  });

  // 공연 상세 정보 로드
  useEffect(() => {
    const loadData = async () => {
      try {
        if (!prfId) return;
        const data = await fetchPerformanceDetail(prfId);
        setPerformance(data);
      } catch (err) {
        setPerformance(null);
        alert("공연 정보를 불러올 수 없습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [prfId]);

  if (loading) return <div>로딩 중...</div>;
  if (!performance) return <div>공연 정보를 찾을 수 없습니다.</div>;

  const HeartIcon = localLiked ? ImHeart : SlHeart;

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
                onClick={handleFavoriteClick}
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
                <s.Value>{formatTime(performance.dtGuidance)}</s.Value>
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
                <s.Value>
                  {(() => {
                    const original = performance.prfPlcNm;
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
                </s.Value>
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
            {formatTicketProvider(performance.providerUrl).map(
              (validUrl, i) => (
                <s.TicketLink
                  key={i}
                  onClick={() => window.open(validUrl, "_blank")}
                >
                  {formatSiteName(validUrl)}
                </s.TicketLink>
              )
            )}
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
