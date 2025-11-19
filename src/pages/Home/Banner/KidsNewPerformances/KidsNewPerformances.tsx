import { useEffect, useState } from "react";
import { fetchKidsPrfsThisMonth } from "../../../../apis/performanceApi";
import { KidsNewPerformancs } from "../../../../types/homeTypes";
import { removeRegionTag } from "../../../../apis/performanceApi";
import {
  formatDateRange,
  formatDateDot,
} from "../../../../components/FormatDate/FormatDate";
import * as s from "./styles";

function KidsNewPerformances() {
  const [allData, setAllData] = useState<KidsNewPerformancs[]>([]);
  const [visibleData, setVisibleData] = useState<KidsNewPerformancs[]>([]);

  // 랜덤 3개 선택 (수상작의 pickRandomFive와 동일한 방식)
  const pickRandomThree = (arr: KidsNewPerformancs[]) => {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, 3);
  };

  // 첫 로딩 시 한 번만 랜덤 3개 선택
  useEffect(() => {
    (async () => {
      const data = await fetchKidsPrfsThisMonth();

      if (data && data.length > 0) {
        setAllData(data); // 전체 저장
        setVisibleData(pickRandomThree(data)); // 랜덤 3개 뽑기
      }
    })();
  }, []);

  // 데이터 준비 전에 렌더링 방지
  if (visibleData.length < 3) return null;

  const backgroundPoster = visibleData[0].posterImgUrl;

  return (
    <s.Container>
      <s.BackgroundWrapper>
        <s.BackgroundBlur img={backgroundPoster} />
        <s.DarkOverlay />

        <s.HeaderText>
          이번 달 아이들이랑 보러가기 좋은 신규 공연 추천
        </s.HeaderText>

        <s.CardContainer>
          {visibleData.map((item, i) => (
            <s.Card key={i}>
              <s.Poster src={item.posterImgUrl} alt={item.prfNm} />

              <s.Title>{removeRegionTag(item.prfNm)}</s.Title>

              <s.DateText>
                {formatDateRange(
                  formatDateDot(item.prfStartDt),
                  formatDateDot(item.prfEndDt)
                )}
              </s.DateText>
            </s.Card>
          ))}
        </s.CardContainer>
      </s.BackgroundWrapper>
    </s.Container>
  );
}

export default KidsNewPerformances;
