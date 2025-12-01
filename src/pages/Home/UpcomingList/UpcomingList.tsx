import { useEffect, useState } from "react";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import { UpcomingPerformance } from "../../../types/homePageTypes";
import { getUpcomingPerformances } from "../../../apis/performanceApi";
import PrfListSkeleton from "../../../components/skeleton/PrfListSkeleton";
import {
  formatDateRange,
  formatUIDate,
} from "../../../components/format/formatDate";
import { Carousel } from "@mantine/carousel";
import * as s from "../PerformanceStyles";
import * as ts from "./styles";

function UpcomingList() {
  const [performances, setPerformances] = useState<UpcomingPerformance[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedPrfId, setSelectedPrfId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await getUpcomingPerformances();
      setPerformances(data);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <s.SectionContainer>
      <s.SectionHeader>
        <s.SectionTitle>전체 공연 예정</s.SectionTitle>
        <s.SectionSubTitle>가까운 날짜순</s.SectionSubTitle>
      </s.SectionHeader>

      {loading ? (
        <PrfListSkeleton />
      ) : (
        <div style={{ width: "100%", position: "relative" }}>
          {/* <s.gradientLeft style={{ height: "300px" }} />
          <s.gradientRight style={{ height: "300px" }} /> */}
          <ts.StyledCarousel
            slideSize="20%"
            slideGap="30px"
            height={470}
            emblaOptions={{
              align: "start",
              slidesToScroll: 1,
              dragFree: true,
            }}
            withControls
            controlSize={50}
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
          </ts.StyledCarousel>
        </div>
      )}

      <PerformanceModal open={open} setOpen={setOpen} prfId={selectedPrfId} />
    </s.SectionContainer>
  );
}

export default UpcomingList;
