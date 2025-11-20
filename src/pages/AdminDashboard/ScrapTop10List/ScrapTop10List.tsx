/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { getTop10Favorites, ScrapRank } from "../../../apis/favoriteApi";
import * as s from "./styles";

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
    <s.Card>
      <s.Title>누적 스크랩 TOP 10 공연</s.Title>

      {ranks.length === 0 ? (
        <p style={{ color: "#94a3b8", textAlign: "center", padding: "12px 0" }}>
          데이터를 불러오는 중...
        </p>
      ) : (
        <s.Table>
          <s.Thead>
            <tr>
              <th style={{ width: "60px" }}>순위</th>
              <th>공연명</th>
              <th style={{ width: "80px", textAlign: "right" }}>스크랩 수</th>
            </tr>
          </s.Thead>

          <s.Tbody>
            {ranks.map((item, idx) => (
              <tr key={idx}>
                <td
                  style={{
                    fontWeight: 700,
                    color:
                      idx === 0
                        ? "#facc15" // gold
                        : idx === 1
                        ? "#a1a1aa" // silver
                        : idx === 2
                        ? "#d97706" // bronze
                        : "#e2e8f0",
                  }}
                >
                  {idx + 1}
                </td>

                <td>{item.prfName}</td>

                <td style={{ textAlign: "right", color: "#94a3b8" }}>
                  {item.scrapCount}회
                </td>
              </tr>
            ))}
          </s.Tbody>
        </s.Table>
      )}
    </s.Card>
  );
}

export default ScrapTop10List;
