import { useEffect, useState } from "react";
import axios from "axios";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";

type Performance = {
  prfId: string;
  posterImgUrl: string;
  prfNm: string;
  prfPlcNm: string;
  prfStartDt: string;
  prfEndDt: string;
  genreNm: string;
};

function UpcomingList() {
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [open, setOpen] = useState(false); // 모달 열림/닫힘 상태
  const [selectedPrfId, setSelectedPrfId] = useState<string | null>(null); // 선택된 공연 ID

  // 날짜 포맷 함수 (Date 객체로 yyyy.mm.dd 변환)
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}.${m}.${d}`;
  };

  // API 요청
  useEffect(() => {
    const getPerformances = async () => {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;

      try {
        const response = await axios.get(`${BASE_URL}/performances/upcoming`);
        setPerformances(response.data);
      } catch (err) {
        console.error("Failed to fetch data from server", err);
      }
    };
    getPerformances();
  }, []);

  return (
    <div
      style={{ width: "100%", padding: "40px 80px", boxSizing: "border-box" }}
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
            {/* 🔹 포스터 클릭 시 모달 열기 */}
            <img
              src={p.posterImgUrl}
              alt={p.prfNm}
              onClick={() => {
                setSelectedPrfId(p.prfId);
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
                {p.prfNm}
              </h4>

              <p
                style={{
                  fontSize: "13px",
                  color: "#555",
                  margin: "2px 0",
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
                {formatDate(p.prfStartDt)} ~ {formatDate(p.prfEndDt)}
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

      {/* 🔹 공연 상세 모달 (공통 모달) */}
      <PerformanceModal open={open} setOpen={setOpen} prfId={selectedPrfId} />
    </div>
  );
}

export default UpcomingList;
