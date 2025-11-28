import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { SlHeart } from 'react-icons/sl';
import { ImHeart } from 'react-icons/im';
import { useFavoriteState } from '../../../stores/useFavoriteState';
import { removeRegionTag } from '../../../components/removeRegionTag/removeRegionTag';
import CheckIcon from '@mui/icons-material/Check';
import { PerformanceDetailPage } from '../../../types/performancePageTypes';
import { fetchPerformanceDetail } from '../../../apis/performanceApi';
import * as s from './styles';

function PerformanceDetail() {
  const { id } = useParams<{ id: string }>();
  const [performance, setPerformance] = useState<PerformanceDetailPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLinks, setShowLinks] = useState(false);
  const { favorites, toggleFavorite, fetchFavoriteState } = useFavoriteState();

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const liked = id ? favorites[id] ?? false : false;

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowLinks(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 상세 정보
  useEffect(() => {
    const loadData = async () => {
      try {
        if (!id) return;
        const data = await fetchPerformanceDetail(id);
        setPerformance(data);
      } catch (err) {
        setPerformance(null);
        alert('공연 정보를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadData();

    if (id) fetchFavoriteState(id);
  }, [id, fetchFavoriteState]);

  // 좋아요 토글
  const handleToggleFavorite = async () => {
    if (!id) return;

    await toggleFavorite(id);
  };

  if (loading) return <div>로딩 중...</div>;
  if (!performance) return <div>공연 정보를 찾을 수 없습니다.</div>;

  const HeartIcon = liked ? ImHeart : SlHeart;

  // 예매처 사이트 이름 추출
  const getSiteName = (url: string) => {
    const lower = url.toLowerCase();
    if (lower.includes('interpark')) return '인터파크';
    if (lower.includes('ticketlink')) return '티켓링크';
    if (lower.includes('yes24')) return 'YES24';
    if (lower.includes('naver')) return '네이버 예매';
    if (lower.includes('wemakeprice')) return '위메프';
    if (lower.includes('melon')) return '멜론티켓';
    if (lower.includes('lotte')) return '롯데콘서트홀';
    if (lower.includes('coffee')) return '커넥티브 티켓';
    if (lower.includes('nanumticket')) return '나눔 티켓';
    if (lower.includes('coupang')) return '쿠팡';
    if (lower.includes('clipservice')) return '클립서비스';
    if (lower.includes('timeticket')) return '타임 티켓';
    if (lower.includes('maketicket')) return '마켓 티켓';
    if (lower.includes('playicket')) return '플레이 티켓';
    if (lower.includes('tmon')) return '티몬';
    if (lower.includes('sejongpac')) return '세종문화회관';
    try {
      const hostname = new URL(url).hostname;
      const parts = hostname.replace('www.', '').split('.');
      const mainDomain = parts[0];

      return mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);
    } catch {
      return '예매처';
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
              <s.HeartIconButton liked={liked} onClick={handleToggleFavorite}>
                <HeartIcon />
              </s.HeartIconButton>

              {/* 스크랩 카운트 표시 */}
              {/* {performance.scrapCount > 0 && (
                <s.ScrapCountText>{performance.scrapCount}</s.ScrapCountText>
              )} */}
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
                    ?.split('),')
                    .map((t) => (t.endsWith(')') ? t : t + ')'))
                    .join('\n')}
                </s.Value>
              </s.InfoItem>

              {performance.child === 'Y' && (
                <s.InfoItem>
                  <s.CheckRow>
                    <s.CheckIconStyle>
                      <CheckIcon />
                    </s.CheckIconStyle>
                    <s.CheckText>미취학 아동 입장 가능</s.CheckText>
                  </s.CheckRow>
                </s.InfoItem>
              )}

              {performance.visit === 'Y' && (
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
                    .split(', ')
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
        <s.TicketButton onClick={() => setShowLinks((prev) => !prev)}>예매 바로가기 →</s.TicketButton>

        {showLinks && (
          <s.TicketDropdown>
            {performance.providerUrl?.split(',').map((raw, i) => {
              const url = raw.trim();
              if (!url) return null;

              const validUrl = url.startsWith('http') ? url : `https://${url}`;

              return (
                <s.TicketLink key={i} onClick={() => window.open(validUrl, '_blank')}>
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
        performance.detailImgUrl.split(',').map((url, i) => <s.DetailImage key={i} src={url.trim()} />)}
    </s.PageBackground>
  );
}

export default PerformanceDetail;