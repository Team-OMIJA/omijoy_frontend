import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";

type Performance = {
  id: string;
  poster: string;
  title: string;
  place: string;
  period: string;
  genre: string;
  rank: string;
};

function TopRankList() {
  const [performances, setPerformances] = useState<Performance[]>([]);
  const navigate = useNavigate();

  // 모달 상태
  const [open, setOpen] = useState(false);
  const [selectedPrfId, setSelectedPrfId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerformances = async () => {
      const API_KEY = import.meta.env.VITE_KOPIS_API_KEY;

      const today = new Date();
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 30);
      today.getDate();

      // 날짜 포맷팅 (YYYYMMDD)
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}${month}${day}`;
      };

      const stDate = formatDate(pastDate);
      const edDate = formatDate(today);

      const url = `http://localhost:4000/kopis/boxoffice?service=${API_KEY}&stdate=${stDate}&eddate=${edDate}&catecode=&area=`;

      try {
        const response = await axios.get(url, { responseType: "text" });
        const parser = new DOMParser();
        const xmlData = parser.parseFromString(response.data, "text/xml");
        const boxList = xmlData.getElementsByTagName("boxof");

        // XML → JS 객체 변환
        const result = Array.from(boxList).map((box) => ({
          id: box.getElementsByTagName("mt20id")[0]?.textContent || "",
          title: box.getElementsByTagName("prfnm")[0]?.textContent || "",
          place: box.getElementsByTagName("prfplcnm")[0]?.textContent || "",
          poster: box.getElementsByTagName("poster")[0]?.textContent || "",
          period: box.getElementsByTagName("prfpd")[0]?.textContent || "",
          rank: box.getElementsByTagName("rnum")[0]?.textContent || "",
          genre: box.getElementsByTagName("cate")[0]?.textContent || "",
        }));

        // 1~5위까지만 표시
        setPerformances(result.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch KOPIS API", err);
      }
    };

    fetchPerformances();
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

        {/* 🔹 /performance로 이동 버튼 */}
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

      {/* 🔹 공연 상세 모달 (공통 모달) */}
      <PerformanceModal open={open} setOpen={setOpen} prfId={selectedPrfId} />
    </div>
  );
}

export default TopRankList;
