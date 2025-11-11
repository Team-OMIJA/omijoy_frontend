import { useState, useEffect } from "react";
import { getTop10Favorites, ScrapRank } from "../../../apis/favoriteApi";

function ScrapTop10List() {
  const [ranks, setRanks] = useState<ScrapRank[]>([]);

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        const data = await getTop10Favorites();
        setRanks(data);
      } catch {
        console.error("Failed to load favorite data");
      }
    };
    fetchTop10();
  }, []);

  return (
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-8 mx-auto">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        누적 스크랩 TOP 10 공연
      </h2>

      {ranks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          데이터를 불러오는 중...
        </p>
      ) : (
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 text-sm">
              <th className="py-3 px-4 w-16">순위</th>
              <th className="py-3 px-4">공연명</th>
              <th className="py-3 px-4 text-right w-24">스크랩 수</th>
            </tr>
          </thead>
          <tbody>
            {ranks.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td
                  className={`py-3 px-4 font-semibold ${
                    idx === 0
                      ? "text-yellow-500"
                      : idx === 1
                      ? "text-gray-400"
                      : idx === 2
                      ? "text-amber-700"
                      : "text-gray-700"
                  }`}
                >
                  {idx + 1}
                </td>
                <td className="py-3 px-4 text-gray-800 truncate max-w-[380px]">
                  {item.prfName}
                </td>
                <td className="py-3 px-4 text-gray-600 text-right">
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
