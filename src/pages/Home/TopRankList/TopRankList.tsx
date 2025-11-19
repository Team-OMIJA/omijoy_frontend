import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import { TopRankPerformance } from "../../../types/homeTypes";
import { fetchTopRankPerformances } from "../../../apis/performanceApi";
import PrfListSkeleton from "../../../components/skeleton/PrfListSkeleton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import "../PerforamnceStyles.css";

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
    <div
      style={{
        width: "100%",
        padding: "40px 60px",
        boxSizing: "border-box",
      }}
    >
      {/* 제목 + 이동 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h2 className="performance-section-title">전체 공연 순위 TOP 10</h2>

        <button
          onClick={() => navigate("/performance")}
          style={{
            background: "none",
            border: "none",
            fontSize: "22px",
            fontWeight: "700",
            cursor: "pointer",
            color: "#444",
            transition: "color 0.2s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#000")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#444")}
        >
          <ArrowForwardIosIcon style={{ fontSize: "22px" }} />
        </button>
      </div>

      {/* 로딩 */}
      {loading ? (
        <PrfListSkeleton />
      ) : (
        <div style={{ width: "100%" }}>
          <Carousel
            slideSize="20%" // 5개씩 보여줌
            slideGap="30px"
            height={430}
            withControls={false} // 버튼 없음
            plugins={[autoplay.current]}
            emblaOptions={{
              align: "start",
              slidesToScroll: 1, // 1개씩 자동 넘김
              dragFree: true,
            }}
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
                  {/* 이미지 + 순위 + 그라데이션 */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "250px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 18px rgba(0,0,0,0.15)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <img
                      src={p.poster}
                      alt={p.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedPrfId(p.id);
                        setOpen(true);
                      }}
                    />

                    {/* 하단 오버레이 */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        width: "100%",
                        height: "40%",
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))",
                      }}
                    />

                    {/* 순위 */}
                    <div
                      style={{
                        position: "absolute",
                        left: "10px",
                        bottom: "5px",
                        color: "#fff",
                        fontSize: "60px",
                        fontWeight: "700",
                        fontStyle: "italic",
                        textShadow: "0 3px 6px rgba(0,0,0,0.5)",
                        transform: "scaleX(1.25)",
                        transformOrigin: "left center",
                        pointerEvents: "none",
                      }}
                    >
                      {p.rank}
                    </div>
                  </div>

                  {/* 텍스트 */}
                  <h4 className="performance-title">{p.title}</h4>

                  <p className="performance-place">{p.place}</p>
                  <p className="performance-period">{p.period}</p>
                  <p className="performance-genre">{p.genre}</p>
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

export default TopRankList;
