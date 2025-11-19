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
    <div
      style={{
        width: "100%",
        padding: "40px 60px",
        boxSizing: "border-box",
      }}
    >
      {/* 제목 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h2 className="performance-section-title">
          전체 공연 예정 (가까운 날짜순)
        </h2>
      </div>

      {/* 로딩일 때: skeleton */}
      {loading ? (
        <PrfListSkeleton />
      ) : (
        <div style={{ width: "100%" }}>
          <Carousel
            slideSize="20%" // 한 화면에 5개
            slideGap="30px"
            emblaOptions={{
              align: "start",
              slidesToScroll: 1,
              dragFree: true,
            }}
            height={430} // 전체 카드 높이
            withControls // 양 옆 화살표 표시
            controlSize={40} // 버튼 크기
            controlsOffset="sm" // 버튼 위치 조금 조절
          >
            {performances.map((p, i) => (
              <Carousel.Slide key={i}>
                <div
                  style={{
                    textAlign: "left",
                    padding: "5px",
                    borderRadius: "14px",
                  }}
                >
                  {/* 포스터 */}
                  <img
                    src={p.posterImgUrl}
                    alt={p.prfNm}
                    onClick={() => {
                      setSelectedPrfId(p.prfId);
                      setOpen(true);
                    }}
                    className="performance-poster"
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 18px rgba(0,0,0,0.15)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />

                  <h4 className="performance-title">{p.prfNm}</h4>
                  <p className="performance-place">{p.prfPlcNm}</p>
                  <p className="performance-period">
                    {formatDateRange(
                      formatUIDate(p.prfStartDt),
                      formatUIDate(p.prfEndDt)
                    )}
                  </p>

                  <p className="performance-genre">{p.genreNm}</p>
                </div>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      )}

      <PerformanceModal open={open} setOpen={setOpen} prfId={selectedPrfId} />
    </div>
  );
}

export default UpcomingList;
