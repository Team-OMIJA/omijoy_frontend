import { useEffect, useState } from "react";
import axios from "axios";

type Performance = {
  poster: string;
  title: string;
  place: string;
  period: string;
  genre: string;
  rank: string;
};

function NearbyRankList() {
  const [performances, setPerformances] = useState<Performance[]>([]);

  useEffect(() => {
    const fetchPerformances = async () => {
      const API_KEY = import.meta.env.VITE_KOPIS_API_KEY;

      // ✅ 지역 코드 지정 (예: 26 = 부산, 11 = 서울)
      const areaCode = "26"; // 🔹 나중에 CurrentPosition에서 전달받게 바꿔도 됨

      const today = new Date();
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 30);

      // 날짜 포맷팅 (YYYYMMDD)
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}${month}${day}`;
      };

      const stDate = formatDate(pastDate);
      const edDate = formatDate(today);

      // URL에 area 추가
      // const url = `http://localhost:4000/kopis?service=${API_KEY}&stdate=${stDate}&eddate=${edDate}&catecode=&area=${areaCode}`;
      const url = `http://www.kopis.or.kr/openApi/restful/boxoffice?service=559a96813a624cd9945e863a0a57e2d6&stdate=20251010&eddate=20251105&catecode=&area=26`;

      try {
        const response = await axios.get(url, { responseType: "text" });
        const parser = new DOMParser();
        const xmlData = parser.parseFromString(response.data, "text/xml");
        const boxList = xmlData.getElementsByTagName("boxof");
        console.log(response.data);
        // XML → JS 객체 변환
        const result = Array.from(boxList).map((box) => ({
          title: box.getElementsByTagName("prfnm")[0]?.textContent || "",
          place: box.getElementsByTagName("prfplcnm")[0]?.textContent || "",
          poster: box.getElementsByTagName("poster")[0]?.textContent || "",
          period: box.getElementsByTagName("prfpd")[0]?.textContent || "",
          rank: box.getElementsByTagName("rnum")[0]?.textContent || "",
          genre: box.getElementsByTagName("cate")[0]?.textContent || "",
        }));

        setPerformances(result.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch KOPIS API", err);
      }
    };

    fetchPerformances();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>지역별 공연 순위 TOP 5</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {performances.map((p, i) => (
          <div
            key={i}
            style={{
              width: 200,
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={p.poster}
              alt={p.title}
              width="180"
              style={{ borderRadius: "8px" }}
            />
            <h4>
              {p.rank}위 : {p.title}
            </h4>
            <p>{p.place}</p>
            <p>{p.period}</p>
            <p>{p.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NearbyRankList;
