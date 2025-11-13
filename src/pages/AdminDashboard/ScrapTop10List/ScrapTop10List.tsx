import { useState, useEffect } from "react";
import { getTop10Favorites, ScrapRank } from "../../../apis/favoriteApi";

function ScrapTop10List() {
  const [ranks, setRanks] = useState<ScrapRank[]>([]);

  useEffect(() => {
    const getTop10 = async () => {
      try {
        const data = await getTop10Favorites();
        setRanks(data);
      } catch {
        console.error("Failed to load favorite data");
      }
    };
    getTop10();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "770px", // 그래프와 동일한 카드 느낌
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}
      >
        누적 스크랩 TOP 10 공연
      </h2>

      {ranks.length === 0 ? (
        <p style={{ color: "#666", textAlign: "center", padding: "10px 0" }}>
          데이터를 불러오는 중...
        </p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "1px solid #e5e7eb",
                background: "#f9fafb",
                color: "#555",
                fontSize: "14px",
              }}
            >
              <th style={{ padding: "10px 16px", width: "60px" }}>순위</th>
              <th style={{ padding: "10px 16px" }}>공연명</th>
              <th
                style={{
                  padding: "10px 16px",
                  width: "80px",
                  textAlign: "right",
                }}
              >
                스크랩 수
              </th>
            </tr>
          </thead>

          <tbody>
            {ranks.map((item, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: "1px solid #f0f0f0",
                  cursor: "default",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#fafafa")
                }
                onMouseOut={(e) => (e.currentTarget.style.background = "white")}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    fontWeight: 600,
                    color:
                      idx === 0
                        ? "#eab308"
                        : idx === 1
                        ? "#9ca3af"
                        : idx === 2
                        ? "#b45309"
                        : "#555",
                  }}
                >
                  {idx + 1}
                </td>
                <td style={{ padding: "12px 16px", color: "#333" }}>
                  {item.prfName}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    textAlign: "right",
                    color: "#666",
                  }}
                >
                  {item.scrapCount}회
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ScrapTop10List;
