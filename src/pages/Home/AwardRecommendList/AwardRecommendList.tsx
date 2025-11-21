import { useEffect, useState, useRef } from "react";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import { AwardPerformance } from "../../../types/homeTypes";
import { fetchAwardPerformances } from "../../../apis/performanceApi";
import PrfListSkeleton from "../../../components/skeleton/PrfListSkeleton";
import CachedIcon from "@mui/icons-material/Cached";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
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

  // --- 5초마다 자동 새로고침 ---
  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <s.SectionContainer>
      <s.SectionHeader>
        <s.SectionTitle>수상작 추천</s.SectionTitle>
        <s.SectionSubTitle>RANDOM 5</s.SectionSubTitle>

        <ts.RefreshButton onClick={handleNext}>
          <CachedIcon style={{ fontSize: "25px" }} />
        </ts.RefreshButton>
      </s.SectionHeader>

      {loading ? (
        <PrfListSkeleton />
      ) : (
        <Carousel
          slideSize="20%"
          slideGap="30px"
          height={470}
          withControls={false}
          plugins={[autoplay.current]}
          emblaOptions={{
            align: "start",
            slidesToScroll: 1,
            dragFree: false,
          }}
          onSlideChange={() => handleNext()}
        >
          {visiblePerformances.map((p, i) => (
            <Carousel.Slide key={i}>
              <s.PerformanceCard>
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
            </Carousel.Slide>
          ))}
        </Carousel>
      )}

      <PerformanceModal open={open} setOpen={setOpen} prfId={selectedPrfId} />
    </s.SectionContainer>
  );
}

export default AwardRecommendList;
