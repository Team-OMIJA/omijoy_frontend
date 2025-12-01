import { useEffect, useState } from "react";
import { fetchKidsPrfsThisMonth } from "../../../../apis/performanceApi";
import { KidsNewPerformancs } from "../../../../types/homePageTypes";
import { removeRegionTag } from "../../../../components/removeRegionTag/removeRegionTag";
import {
  formatDateRange,
  formatDateDot,
} from "../../../../components/format/formatDate";
import { useNavigate } from "react-router-dom";
import * as s from "./styles";

function KidsNewPerformances() {
  //eslint-disable-next-line
  const [_allData, setAllData] = useState<KidsNewPerformancs[]>([]);
  const [visibleData, setVisibleData] = useState<KidsNewPerformancs[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const pickRandomThree = (arr: KidsNewPerformancs[]) => {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, 3);
  };
  // [...arr] 한 후 sort() -> 복사본을 만들어서 정렬
  // sort의 공식 규칙 -> 음수(a가 b보다 앞), 양수(b가 a보다 앞), 0(순서 유지)
  //  Math.random() - 0.5 -> -0.5 ~ 0.5 사이의 값이 나오므로 랜덤하게 섞임

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchKidsPrfsThisMonth();

      if (data && data.length > 0) {
        setAllData(data);
        setVisibleData(pickRandomThree(data));
      }
      setLoading(false);
    };

    loadData();
  }, []);

  // --- 로딩 중이면 아무것도 안 보여줌 ---
  if (loading || visibleData.length < 3) return null;

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
          {visibleData.map((item, i) => {
            const title = removeRegionTag(item.prfNm);
            const dateRange = formatDateRange(
              formatDateDot(item.prfStartDt),
              formatDateDot(item.prfEndDt)
            );

            return (
              <s.Card key={i}>
                <s.Poster
                  src={item.posterImgUrl}
                  alt={item.prfNm}
                  onClick={() => navigate(`/performance/${item.prfId}`)}
                />
                <s.Title>{title}</s.Title>
                <s.DateText>{dateRange}</s.DateText>
              </s.Card>
            );
          })}
        </s.CardContainer>
      </s.BackgroundWrapper>
    </s.Container>
  );
}

export default KidsNewPerformances;
