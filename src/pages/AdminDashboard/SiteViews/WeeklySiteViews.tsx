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
import * as s from "../SiteViews/styles";

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
    <s.Card>
      <s.Title>📊 최근 7일 사이트 조회수</s.Title>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={views}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(148,163,184,0.15)"
          />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(30, 41, 59, 0.85)", // 다크네이비 블러
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              backdropFilter: "blur(6px)",
              color: "#e2e8f0",
            }}
            labelStyle={{ color: "#93c5fd" }}
            formatter={(v: number) => [`${v}회`, "조회수"]}
          />

          <Bar
            dataKey="views"
            fill="#0ea5e9"
            barSize={35}
            radius={[1, 1, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </s.Card>
  );
}

export default WeeklySiteViews;
