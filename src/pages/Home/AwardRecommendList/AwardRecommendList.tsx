import { useEffect, useState, useRef } from "react";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import { AwardPerformance } from "../../../types/homeTypes";
import { fetchAwardPerformances } from "../../../apis/performanceApi";
import PrfListSkeleton from "../../../components/skeleton/PrfListSkeleton";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as s from "../PerformanceStyles";

function AwardRecommendList() {
  const [allPerformances, setAllPerformances] = useState<AwardPerformance[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const [selectedPrfId, setSelectedPrfId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const autoplay = useRef(
    Autoplay({
      delay: 8000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAwardPerformances();
      setAllPerformances(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <s.SectionContainer>
      <s.SectionHeader>
        <s.SectionTitle>수상작 추천</s.SectionTitle>
        <s.SectionSubTitle>AWARDS</s.SectionSubTitle>
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
              dragFree: false,
              slidesToScroll: 5,
            }}
          >
            {allPerformances.map((p, i) => (
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
        </div>
      )}

      <PerformanceModal open={open} setOpen={setOpen} prfId={selectedPrfId} />
    </s.SectionContainer>
  );
}

export default AwardRecommendList;
