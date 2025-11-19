import { useEffect, useState } from "react";
import {
  getTop1FavoriteForBanner,
  ScrapRank,
} from "../../../../apis/favoriteApi";
import { formatDateRange } from "../../../../components/FormatDate/FormatDate";
import { formatDateDot } from "../../../../components/FormatDate/FormatDate";
import { removeRegionTag } from "../../../../apis/performanceApi";
import * as s from "./styles";

function Top1Favorite() {
  const [data, setData] = useState<ScrapRank | null>(null);

  useEffect(() => {
    (async () => {
      const top1 = await getTop1FavoriteForBanner();
      setData(top1);
    })();
  }, []);

  if (!data) return null;

  return (
    <s.Container>
      <s.BannerWrapper>
        {/* 흐린 배경 */}
        <s.BackgroundBlur img={data.posterImgUrl} />

        {/* 어두운 오버레이 */}
        <s.DarkOverlay />

        {/* 왼쪽 텍스트 */}
        <s.LeftTextArea>
          <s.SubLabel>누적 스크랩 수 1위</s.SubLabel>

          <s.Title>{removeRegionTag(data.prfName)}</s.Title>

          <s.DateText>
            {formatDateRange(
              formatDateDot(data.prfStartDt),
              formatDateDot(data.prfEndDt)
            )}
          </s.DateText>
        </s.LeftTextArea>

        {/* 오른쪽 포스터 */}
        <s.PosterImage src={data.posterImgUrl} alt={data.prfName} />
      </s.BannerWrapper>
    </s.Container>
  );
}

export default Top1Favorite;
