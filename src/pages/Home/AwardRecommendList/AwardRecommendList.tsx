import axios from "axios";
import { useEffect, useState } from "react";

type Performance = {
  poster: string;
  title: string;
  place: string;
  stDate: string;
  edDate: string;
  genre: string;
  awards: string;
};

function AwardRecommendList() {
  const [allPerformances, setAllPerformances] = useState<Performance[]>([]);
  const [visiblePerformances, setVisiblePerformances] = useState<Performance[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  // 🎲 Fisher–Yates shuffle (진짜 랜덤)
  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // ✅ 5개 랜덤 선택
  const pickRandomFive = (arr: Performance[]) => {
    if (arr.length <= 5) return arr;
    return shuffleArray(arr).slice(0, 5);
  };

  // ✅ API 요청
  const fetchPerformances = async () => {
    try {
      setIsLoading(true);
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
          poster: item.getElementsByTagName("poster")[0]?.textContent || "",
          title: item.getElementsByTagName("prfnm")[0]?.textContent || "",
          place: item.getElementsByTagName("fcltynm")[0]?.textContent || "",
          stDate: item.getElementsByTagName("prfpdfrom")[0]?.textContent || "",
          edDate: item.getElementsByTagName("prfpdto")[0]?.textContent || "",
          genre: item.getElementsByTagName("genrenm")[0]?.textContent || "",
          awards: item.getElementsByTagName("awards")[0]?.textContent || "",
        })
      );

      setAllPerformances(allPrfsList);
      setVisiblePerformances(pickRandomFive(allPrfsList)); // 초기 표시
    } catch (err) {
      console.error("❌ Failed to fetch award data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ 버튼 클릭 시 랜덤 5개 다시 표시
  const handleNext = () => {
    if (allPerformances.length === 0) return;
    const newSet = pickRandomFive(allPerformances);
    setVisiblePerformances(newSet);
  };

  // ✅ 컴포넌트 로드 시 API 호출
  useEffect(() => {
    fetchPerformances();
  }, []);

  // ✅ 렌더링
  return (
    <div
      style={{ width: "100%", padding: "40px 80px", boxSizing: "border-box" }}
    >
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
        <button
          onClick={handleNext}
          disabled={isLoading || allPerformances.length === 0}
          style={{
            backgroundColor: isLoading ? "#f0f0f0" : "#fff",
            color: isLoading ? "#aaa" : "#000",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "6px 14px",
            fontSize: "14px",
            cursor: isLoading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            if (!isLoading) e.currentTarget.style.backgroundColor = "#f5f5f5";
          }}
          onMouseOut={(e) => {
            if (!isLoading) e.currentTarget.style.backgroundColor = "#fff";
          }}
        >
          🔄 다른 추천 보기
        </button>
      </div>

      {isLoading ? (
        <p>로딩 중...</p>
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
              <img
                src={p.poster}
                alt={p.title}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px",
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
    </div>
  );
}

export default AwardRecommendList;
