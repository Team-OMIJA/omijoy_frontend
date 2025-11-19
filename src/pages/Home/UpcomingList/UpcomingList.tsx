import { useEffect, useState } from "react";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import { UpcomingPerformance } from "../../../types/homeTypes";
import { fetchUpcomingPerformances } from "../../../apis/performanceApi";
import PrfListSkeleton from "../../../components/skeleton/PrfListSkeleton";
import {
  formatDateRange,
  formatUIDate,
} from "../../../components/FormatDate/FormatDate";
import { Carousel } from "@mantine/carousel";
import * as s from "../PerformanceStyles";

function UpcomingList() {
  const [performances, setPerformances] = useState<UpcomingPerformance[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedPrfId, setSelectedPrfId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await fetchUpcomingPerformances();
      setPerformances(data);
      setLoading(false);
    })();
  }, []);

  return (
    <s.SectionContainer>
      <s.SectionHeader>
        <s.SectionTitle>전체 공연 예정 (가까운 날짜순)</s.SectionTitle>
      </s.SectionHeader>

      {loading ? (
        <PrfListSkeleton />
      ) : (
        <Carousel
          slideSize="20%"
          slideGap="30px"
          height={430}
          emblaOptions={{
            align: "start",
            slidesToScroll: 1,
            dragFree: true,
          }}
          withControls
          controlSize={40}
          controlsOffset="sm"
        >
          {performances.map((p) => (
            <Carousel.Slide key={p.prfId}>
              <s.PerformanceCard>
                <s.Poster
                  src={p.posterImgUrl}
                  alt={p.prfNm}
                  onClick={() => {
                    setSelectedPrfId(p.prfId);
                    setOpen(true);
                  }}
                />
                <s.PerformanceTitle>{p.prfNm}</s.PerformanceTitle>
                <s.PerformancePlace>{p.prfPlcNm}</s.PerformancePlace>

                <s.PerformancePeriod>
                  {formatDateRange(
                    formatUIDate(p.prfStartDt),
                    formatUIDate(p.prfEndDt)
                  )}
                </s.PerformancePeriod>

                <s.PerformanceGenre>{p.genreNm}</s.PerformanceGenre>
              </s.PerformanceCard>
            </Carousel.Slide>
          ))}
        </Carousel>
      )}

      <PerformanceModal open={open} setOpen={setOpen} prfId={selectedPrfId} />
    </s.SectionContainer>
  );
}

export default UpcomingList;
