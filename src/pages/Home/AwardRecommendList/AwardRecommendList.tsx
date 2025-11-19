import { useEffect, useState } from "react";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import { AwardPerformance } from "../../../types/homeTypes";
import { fetchAwardPerformances } from "../../../apis/performanceApi";
import PrfListSkeleton from "../../../components/skeleton/PrfListSkeleton";
import CachedIcon from "@mui/icons-material/Cached";
import "../PerforamnceStyles.css";

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
      style={{ width: "100%", padding: "40px 60px", boxSizing: "border-box" }}
    >
      <div className="performance-section-header">
        <h2 className="performance-section-title">수상작 추천 5</h2>

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
          onMouseOut={(e) => (e.currentTarget.style.color = "#444")}
        >
          <CachedIcon style={{ fontSize: "25px" }} />
        </button>
      </div>

      {loading ? (
        <PrfListSkeleton />
      ) : (
        <div className="performance-grid">
          {visiblePerformances.map((p, i) => (
            <div key={i} className="performance-card">
              <img
                src={p.poster}
                alt={p.title}
                className="performance-poster"
                onClick={() => {
                  setSelectedPrfId(p.id);
                  setOpen(true);
                }}
              />

              <h4 className="performance-title">{p.title}</h4>
              <p className="performance-place">{p.place}</p>
              <p className="performance-period">
                {p.stDate} ~ {p.edDate}
              </p>
              <p className="performance-genre">{p.genre}</p>
            </div>
          ))}
        </div>
      )}

      <PerformanceModal open={open} setOpen={setOpen} prfId={selectedPrfId} />
    </div>
  );
}

export default AwardRecommendList;
