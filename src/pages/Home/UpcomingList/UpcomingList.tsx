import { useEffect, useState } from "react";
import axios from "axios";

type Performance = {
  posterImgUrl: string;
  prfNm: string;
  prfPlcNm: string;
  prfStartDt: string;
  prfEndDt: string;
  genreNm: string;
};

function UpcomingList() {
  const [performances, setPerformances] = useState<Performance[]>([]);

  useEffect(() => {
    const getPerformances = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/performances/upcoming"
        );
        setPerformances(response.data);
      } catch (err) {
        console.error("Failed to fetch data from server", err);
      }
    };
    getPerformances();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>전체 공연 예정 (가까운 날짜순)</h2>
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
              src={p.posterImgUrl}
              alt={p.prfNm}
              width="180"
              style={{ borderRadius: "8px" }}
            />
            <h4>{p.prfNm}</h4>
            <p>{p.prfPlcNm}</p>
            <p>
              {p.prfStartDt} ~ {p.prfEndDt}
            </p>
            <p>{p.genreNm}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingList;
