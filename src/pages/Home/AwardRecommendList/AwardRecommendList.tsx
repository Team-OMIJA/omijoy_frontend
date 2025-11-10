import axios from "axios";
import { useEffect, useState } from "react";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";

type Performance = {
  id: string;
  poster: string;
  title: string;
  place: string;
  stDate: string;
  edDate: string;
  genre: string;
  awards: string;
};

function AwardRecommendList() {
  const [allPerformances, setAllPerformances] = useState<Performance[]>([]); // API 호출로 100개 받아옴
  const [visiblePerformances, setVisiblePerformances] = useState<Performance[]>(
    []
  ); // 실제로 프론트에 보여줄 5개

  const [open, setOpen] = useState(false); // 모달 열림/닫힘 상태
  const [selectedPrfId, setSelectedPrfId] = useState<string | null>(null); // 🔹 선택된 공연 ID

  // Math.random() - 0.5 -> 정렬 순서 랜덤
  const pickRandomFive = (arr: Performance[]) => {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, 5);
  };

  // API 요청
  const fetchPerformances = async () => {
    try {
      const API_KEY = import.meta.env.VITE_KOPIS_API_KEY;

      const today = new Date();
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + 6);

      const formatDate = (d: Date) =>
        `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
          d.getDate()
        ).padStart(2, "0")}`;

      const url = `http://localhost:4000/kopis/awards?service=${API_KEY}&stdate=${formatDate(
        today
      )}&eddate=${formatDate(futureDate)}&cpage=1&rows=100`;

      const res = await axios.get(url, { responseType: "text" });
      const parser = new DOMParser();
      const xml = parser.parseFromString(res.data, "text/xml");

      const allPrfsList = Array.from(xml.getElementsByTagName("db")).map(
        (item) => ({
          id: item.getElementsByTagName("mt20id")[0]?.textContent || "",
          poster: item.getElementsByTagName("poster")[0]?.textContent || "",
          title: item.getElementsByTagName("prfnm")[0]?.textContent || "",
          place: item.getElementsByTagName("fcltynm")[0]?.textContent || "",
          stDate: item.getElementsByTagName("prfpdfrom")[0]?.textContent || "",
          edDate: item.getElementsByTagName("prfpdto")[0]?.textContent || "",
          genre: item.getElementsByTagName("genrenm")[0]?.textContent || "",
          awards: item.getElementsByTagName("awards")[0]?.textContent || "",
        })
      );

      setAllPerformances(allPrfsList); // 전체 100개 저장
      setVisiblePerformances(pickRandomFive(allPrfsList)); // 초기 5개 저장
    } catch (err) {
      console.error("Failed to fetch award data:", err);
    }
  };

  // 버튼 클릭 시 랜덤 5개 다시 표시
  const handleNext = () => {
    const newSet = pickRandomFive(allPerformances);
    setVisiblePerformances(newSet);
  };

  // 컴포넌트 로드 시 API 호출
  useEffect(() => {
    fetchPerformances();
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

        {/* 🔁 다른 추천 보기 버튼 */}
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
            {/* 🔹 포스터 클릭 시 모달 열기 */}
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
              <p style={{ color: "#777", fontSize: "12.5px", margin: "1px 0" }}>
                {p.stDate} ~ {p.edDate}
              </p>
              <p style={{ color: "#999", fontSize: "12.5px", margin: "3px 0" }}>
                {p.genre}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 공연 상세 모달 */}
      <PerformanceModal open={open} setOpen={setOpen} prfId={selectedPrfId} />
    </div>
  );
}

export default AwardRecommendList;
