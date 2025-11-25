import { useState, useEffect } from "react";
import { getTop10Favorites } from "../../../apis/adminApi";
import { ScrapRank } from "../../../types/adminPageTypes";
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

  // 순위 색상
  const getRankColor = (index: number) => {
    if (index === 0) return "#facc15";
    if (index === 1) return "#a1a1aa";
    if (index === 2) return "#d97706";
    return "#e2e8f0";
  };

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
            {ranks.map((item, i) => (
              <tr key={i}>
                <td
                  style={{
                    fontWeight: 700,
                    color: getRankColor(i),
                  }}
                >
                  {i + 1}
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
