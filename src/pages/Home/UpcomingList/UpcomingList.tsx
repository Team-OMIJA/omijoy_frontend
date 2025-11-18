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
      style={{ width: "100%", padding: "40px 60px", boxSizing: "border-box" }}
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
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "700",
            margin: 0,
          }}
        >
          전체 공연 예정 (가까운 날짜순)
        </h2>
      </div>

      {/* 로딩일 때: 리스트 전체를 스켈레톤으로 교체 */}
      {loading ? (
        <PrfListSkeleton />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "30px",
          }}
        >
          {performances.map((p, i) => (
            <div
              key={i}
              style={{
                textAlign: "left",
                padding: "5px",
                borderRadius: "14px",
              }}
            >
              {/* 포스터 (포스터만 hover 효과 적용) */}
              <img
                src={p.posterImgUrl}
                alt={p.prfNm}
                onClick={() => {
                  setSelectedPrfId(p.prfId);
                  setOpen(true);
                }}
                style={{
                  width: "100%",
                  height: "260px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  cursor: "pointer",
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
              />

              {/* 텍스트 정보 */}
              <div>
                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#111",
                    marginBottom: "6px",
                    lineHeight: "1.4",
                    wordBreak: "keep-all",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {p.prfNm}
                </h4>

                <p
                  style={{
                    fontSize: "13px",
                    color: "#555",
                    margin: "2px 0",
                    wordBreak: "keep-all",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {p.prfPlcNm}
                </p>

                <p
                  style={{
                    fontSize: "12.5px",
                    color: "#777",
                    margin: "1px 0",
                  }}
                >
                  {formatDateRange(
                    formatUIDate(p.prfStartDt),
                    formatUIDate(p.prfEndDt)
                  )}
                </p>

                <p
                  style={{
                    fontSize: "12.5px",
                    color: "#999",
                    margin: "3px 0",
                  }}
                >
                  {p.genreNm}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* 공연 상세 모달 */}
      <PerformanceModal open={open} setOpen={setOpen} prfId={selectedPrfId} />
    </div>
  );
}

export default UpcomingList;
