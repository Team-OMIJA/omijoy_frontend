import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";

import * as s from "../PerformanceStyles";
import * as ts from "./styles";

import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import PrfListSkeleton from "../../../components/skeleton/PrfListSkeleton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { fetchTopRankPerformances } from "../../../apis/performanceApi";
import { TopRankPerformance } from "../../../types/homeTypes";

function TopRankList() {
  const [performances, setPerformances] = useState<TopRankPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedPrfId, setSelectedPrfId] = useState<string | null>(null);

  const navigate = useNavigate();

  const autoplay = useRef(
    Autoplay({
      delay: 4000,
    })
  );

  useEffect(() => {
    const load = async () => {
      const data = await fetchTopRankPerformances();
      setPerformances(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <s.SectionContainer>
      <s.SectionHeader>
        <s.SectionTitle>전체 공연 순위</s.SectionTitle>
        <s.SectionSubTitle>TOP 10</s.SectionSubTitle>

        <ts.MoreButton onClick={() => navigate("/performance")}>
          <ArrowForwardIosIcon style={{ fontSize: 22 }} />
        </ts.MoreButton>
      </s.SectionHeader>

      {loading ? (
        <PrfListSkeleton />
      ) : (
        <div style={{ width: "100%", position: "relative" }}>
          {/* <s.gradientLeft style={{ height: "300px" }} />
          <s.gradientRight style={{ height: "300px" }} /> */}
          <Carousel
            slideSize="20%"
            slideGap="30px"
            height={470}
            withControls={false}
            plugins={[autoplay.current]}
            emblaOptions={{
              align: "start",
              dragFree: true,
              slidesToScroll: 1,
            }}
          >
            {performances.map((p, i) => (
              <Carousel.Slide key={i}>
                <s.PerformanceCard>
                  <ts.RankCard
                    onClick={() => {
                      setSelectedPrfId(p.id);
                      setOpen(true);
                    }}
                  >
                    <ts.RankImage src={p.poster} alt={p.title} />
                    <ts.RankOverlay />
                    <ts.RankNumber>{p.rank}</ts.RankNumber>
                  </ts.RankCard>

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
