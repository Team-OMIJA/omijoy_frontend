import { useEffect, useState } from "react";
import {
  getWeeklySiteViews,
  WeeklyView,
} from "../../../apis/weeklySiteViewsApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { formatMonthDay } from "../../../components/FormatDate/FormatDate";

function WeeklySiteViews() {
  const [views, setViews] = useState<WeeklyView[]>([]);

  useEffect(() => {
    const getViews = async () => {
      try {
        const data = await getWeeklySiteViews();

        const formatted = data.map((date) => ({
          ...date,
          date: formatMonthDay(date.createDt),
        }));

        setViews(formatted);
      } catch (err) {
        console.error("failed to load weekly site views:", err);
      }
    };

    getViews();
  }, []);

  return (
    <div
      style={{
        width: "50%",
        backgroundColor: "white",
        marginTop: "40px",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}
      >
        📊 최근 7일 사이트 조회수
      </h2>

      <ResponsiveContainer width="100%" height={600}>
        <BarChart data={views}>
          {/* 배경 그리드 */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          {/* X축 날짜 */}
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />

          {/* Y축 (정수만 표시) */}
          <YAxis allowDecimals={false} />

          {/* 툴팁 */}
          <Tooltip formatter={(v: number) => [`${v}회`, "조회수"]} />

          {/* 막대 그래프 */}
          <Bar
            dataKey="views"
            fill="#4AA7FF"
            stroke="#1697F6"
            strokeWidth={2}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeeklySiteViews;
