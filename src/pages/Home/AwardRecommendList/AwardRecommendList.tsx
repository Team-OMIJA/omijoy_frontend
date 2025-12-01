import { useEffect, useState, useRef } from "react";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import { AwardPerformance } from "../../../types/homePageTypes";
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
  const [selectedPrfId, setSelectedPrfId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const autoplay = useRef(
    Autoplay({
      delay: 8000,
      stopOnInteraction: false, // 클릭, 드래그 등 해도 autoplay 유지
      stopOnMouseEnter: true, // 마우스 올리면 일시정지
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
        <Carousel
          slideSize="20%" // 한 화면에 카드 5개
          slideGap="30px"
          height={470}
          withControls={false} // 왼/오 화살표 숨기기
          plugins={[autoplay.current]} // 오토플레이 연결
          emblaOptions={{
            align: "start", // 왼쪽부터 정렬
            dragFree: false,
            slidesToScroll: 5, // 한 번에 5개씩 이동
          }}
        >
          {allPerformances.map((p, i) => (
            //p = array의 현재 요소 i = array의 현재 index
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
