import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import { TopRankPerformance } from "../../../types/homeTypes";
import { fetchTopRankPerformances } from "../../../apis/performanceApi";
import PrfListSkeleton from "../../../components/skeleton/PrfListSkeleton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as s from "../PerformanceStyles";

function TopRankList() {
  const [performances, setPerformances] = useState<TopRankPerformance[]>([]);
  const [open, setOpen] = useState(false); // 모달 상태
  const [selectedPrfId, setSelectedPrfId] = useState<string | null>(null);
  const navigate = useNavigate(); // 더보기
  const [loading, setLoading] = useState(true); // skeleton ui

  const autoplay = useRef(
    Autoplay({
      delay: 5000, // 5초 자동 넘김
      stopOnInteraction: false,
      stopOnMouseEnter: true, // 마우스 올리면 멈춤
    })
  );

  useEffect(() => {
    (async () => {
      const data = await fetchTopRankPerformances();
      setPerformances(data);
      setLoading(false);
    })(); // useEffect안에서 async 바로 사용 불가기 때문 비동기 함수 정의하고 마지막 () 통해 즉시 실행
  }, []);

  return (
    <s.SectionContainer>
      <s.SectionHeader>
        <s.SectionTitle>전체 공연 순위 TOP 10</s.SectionTitle>

        <s.MoreButton onClick={() => navigate("/performance")}>
          <ArrowForwardIosIcon style={{ fontSize: "22px" }} />
        </s.MoreButton>
      </s.SectionHeader>

      {loading ? (
        <PrfListSkeleton />
      ) : (
        <div style={{ width: "100%" }}>
          <Carousel
            slideSize="20%"
            slideGap="30px"
            height={430}
            withControls={false}
            plugins={[autoplay.current]}
            emblaOptions={{
              align: "start",
              slidesToScroll: 1,
              dragFree: true,
            }}
          >
            {performances.map((p, i) => (
              <Carousel.Slide key={i}>
                <s.PerformanceCard>
                  <s.RankCard
                    onClick={() => {
                      setSelectedPrfId(p.id);
                      setOpen(true);
                    }}
                  >
                    <s.RankImage src={p.poster} alt={p.title} />
                    <s.RankOverlay />
                    <s.RankNumber>{p.rank}</s.RankNumber>
                  </s.RankCard>

                  <s.PerformanceTitle>{p.title}</s.PerformanceTitle>
                  <s.PerformancePlace>{p.place}</s.PerformancePlace>
                  <s.PerformancePeriod>{p.period}</s.PerformancePeriod>
                  <s.PerformanceGenre>{p.genre}</s.PerformanceGenre>
                </s.PerformanceCard>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      )}

      <PerformanceModal open={open} setOpen={setOpen} prfId={selectedPrfId} />
    </s.SectionContainer>
  );
}

export default TopRankList;
