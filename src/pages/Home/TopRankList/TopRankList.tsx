import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import { TopRankPerformance } from "../../../types/homeTypes";
import { fetchTopRankPerformances } from "../../../apis/performanceApi";

function TopRankList() {
  const [performances, setPerformances] = useState<TopRankPerformance[]>([]);
  const [open, setOpen] = useState(false); // 모달 상태
  const [selectedPrfId, setSelectedPrfId] = useState<string | null>(null);
  const navigate = useNavigate(); // 더보기

  useEffect(() => {
    (async () => {
      const data = await fetchTopRankPerformances();
      setPerformances(data);
    })(); // useEffect안에서 async 바로 사용 불가기 때문 비동기 함수 정의하고 마지막 () 통해 즉시 실행
  }, []);

  return (
    <div
      style={{ width: "100%", padding: "40px 80px", boxSizing: "border-box" }}
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
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "700",
            margin: 0,
          }}
        >
          전체 공연 순위 TOP 5
        </h2>

        {/* /performance로 이동 버튼 */}
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
          &gt;
        </button>
      </div>

      {/* 카드 리스트 */}
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
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.1)";
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

            {/* 텍스트 정보 */}
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
                {p.rank}위 : {p.title}
              </h4>
              <p
                style={{
                  fontSize: "13px",
                  color: "#555",
                  margin: "2px 0",
                }}
              >
                {p.place}
              </p>
              <p
                style={{
                  fontSize: "12.5px",
                  color: "#777",
                  margin: "1px 0",
                }}
              >
                {p.period}
              </p>
              <p
                style={{
                  fontSize: "12.5px",
                  color: "#999",
                  margin: "3px 0",
                }}
              >
                {p.genre}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 공연 상세 모달 (공통 모달) */}
      <PerformanceModal open={open} setOpen={setOpen} prfId={selectedPrfId} />
    </div>
  );
}

export default TopRankList;
