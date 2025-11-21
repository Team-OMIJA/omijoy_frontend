import { useEffect, useState } from "react";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import { AwardPerformance } from "../../../types/homeTypes";
import { fetchAwardPerformances } from "../../../apis/performanceApi";
import PrfListSkeleton from "../../../components/skeleton/PrfListSkeleton";
import CachedIcon from "@mui/icons-material/Cached";
import * as s from "../PerformanceStyles";
import * as ts from "./styles";

function AwardRecommendList() {
  const [allPerformances, setAllPerformances] = useState<AwardPerformance[]>(
    []
  );
  const [visiblePerformances, setVisiblePerformances] = useState<
    AwardPerformance[]
  >([]);
  const [open, setOpen] = useState(false);
  const [selectedPrfId, setSelectedPrfId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // --- 랜덤 5개 선택 ---
  const pickRandomFive = (arr: AwardPerformance[]) => {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, 5);
  };

  // --- "새로고침" 버튼 ---
  const handleNext = () => {
    setVisiblePerformances(pickRandomFive(allPerformances));
  };

  // --- 초기 데이터 요청 ---
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAwardPerformances();
      setAllPerformances(data);
      setVisiblePerformances(pickRandomFive(data));
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <s.SectionContainer>
      <s.SectionHeader>
        <s.SectionTitle>수상작 추천 5</s.SectionTitle>

        <ts.RefreshButton onClick={handleNext}>
          <CachedIcon style={{ fontSize: "25px" }} />
        </ts.RefreshButton>
      </s.SectionHeader>

      {loading ? (
        <PrfListSkeleton />
      ) : (
        <s.PerformanceGrid>
          {visiblePerformances.map((p, i) => (
            <s.PerformanceCard key={i}>
              <s.Poster
                src={p.poster}
                alt={p.title}
                onClick={() => {
                  setSelectedPrfId(p.id);
                  setOpen(true);
                }}
              />

              <s.PerformanceTitle>{p.title}</s.PerformanceTitle>
              <s.PerformancePlace>{p.place}</s.PerformancePlace>
              <s.PerformancePeriod>
                {p.stDate} - {p.edDate}
              </s.PerformancePeriod>
              <s.PerformanceGenre>{p.genre}</s.PerformanceGenre>
            </s.PerformanceCard>
          ))}
        </s.PerformanceGrid>
      )}

      <PerformanceModal open={open} setOpen={setOpen} prfId={selectedPrfId} />
    </s.SectionContainer>
  );
}

export default AwardRecommendList;
