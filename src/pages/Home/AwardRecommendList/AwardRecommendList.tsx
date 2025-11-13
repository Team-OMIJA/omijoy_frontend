import { useEffect, useState } from "react";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import { AwardPerformance } from "../../../types/homeTypes";
import { fetchAwardPerformances } from "../../../apis/performanceApi";
import PrfListSkeleton from "../../../components/skeleton/PrfListSkeleton";

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

  // 랜덤 5개 선택 함수
  const pickRandomFive = (arr: AwardPerformance[]) => {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, 5);
  };

  const handleNext = () => {
    setVisiblePerformances(pickRandomFive(allPerformances));
  };

  useEffect(() => {
    (async () => {
      const data = await fetchAwardPerformances();
      setAllPerformances(data);
      setVisiblePerformances(pickRandomFive(data));
      setLoading(false);
    })();
  }, []);

  return (
    <div
      style={{ width: "100%", padding: "40px 80px", boxSizing: "border-box" }}
    >
      {/* 제목 + 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: "700", margin: 0 }}>
          수상작 추천 5
        </h2>

        {/* 다른 추천 보기 버튼 */}
        <button
          onClick={handleNext}
          style={{
            background: "none",
            border: "none",
            fontSize: "20px",
            fontWeight: "600",
            cursor: "pointer",
            color: "#555",
            transition: "color 0.2s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#000")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#555")}
          title="다른 추천 보기"
        >
          🔁
        </button>
      </div>
      {/* 카드 리스트 */}
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
          {visiblePerformances.map((p, i) => (
            <div
              key={i}
              style={{
                textAlign: "left",
                padding: "5px", // hover 여유 공간
                borderRadius: "14px", // 카드 둥글게
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* 포스터 클릭 시 모달 열기 */}
              <img
                src={p.poster}
                alt={p.title}
                onClick={() => {
                  setSelectedPrfId(p.id);
                  setOpen(true);
                }}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
              />

              <div>
                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#111",
                    marginBottom: "6px",
                    lineHeight: "1.4",
                  }}
                >
                  {p.title}
                </h4>
                <p style={{ color: "#555", fontSize: "13px", margin: "2px 0" }}>
                  {p.place}
                </p>
                <p
                  style={{ color: "#777", fontSize: "12.5px", margin: "1px 0" }}
                >
                  {p.stDate} ~ {p.edDate}
                </p>
                <p
                  style={{ color: "#999", fontSize: "12.5px", margin: "3px 0" }}
                >
                  {p.genre}
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

export default AwardRecommendList;
