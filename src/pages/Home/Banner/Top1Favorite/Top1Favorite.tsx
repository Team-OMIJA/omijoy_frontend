import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTop1FavoriteForBanner } from "../../../../apis/adminApi";
import { ScrapRank } from "../../../../types/adminPageTypes";
import {
  formatDateRange,
  formatDateDot,
} from "../../../../components/FormatDate/FormatDate";
import { removeRegionTag } from "../../../../components/removeRegionTag/removeRegionTag";
import * as s from "./styles";

function Top1Favorite() {
  const [data, setData] = useState<ScrapRank | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const top1 = await getTop1FavoriteForBanner();
      setData(top1);
      setLoading(false);
    };

    loadData();
  }, []);

  // 로딩 중 또는 데이터 없음
  if (loading || !data) return null;

  const title = removeRegionTag(data.prfName);
  const dateRange = formatDateRange(
    formatDateDot(data.prfStartDt),
    formatDateDot(data.prfEndDt)
  );

  return (
    <s.Container>
      <s.BannerWrapper
        onClick={() => navigate(`/performance/${data.prfId}`)}
        style={{ cursor: "pointer" }}
      >
        {/* 흐린 배경 */}
        <s.BackgroundBlur img={data.posterImgUrl} />

        {/* 어두운 오버레이 */}
        <s.DarkOverlay />

        {/* 왼쪽 텍스트 */}
        <s.LeftTextArea>
          <s.SubLabel>누적 스크랩 수 1위</s.SubLabel>
          <s.Title>{title}</s.Title>
          <s.DateText>{dateRange}</s.DateText>
        </s.LeftTextArea>

        {/* 오른쪽 포스터 */}
        <s.PosterImage src={data.posterImgUrl} alt={data.prfName} />
      </s.BannerWrapper>
    </s.Container>
  );
}

export default Top1Favorite;
