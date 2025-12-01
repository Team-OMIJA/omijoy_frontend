import { useEffect, useState } from "react";
import { getWeeklySiteViews } from "../../../apis/adminApi";
import { WeeklyView } from "../../../types/adminPageTypes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatMonthDay } from "../../../components/FormatDate/FormatDate";
import * as s from "../SiteViews/styles";
import CustomTooltip from "./CustomTooltip";

function WeeklySiteViews() {
  const [views, setViews] = useState<WeeklyView[]>([]);

  useEffect(() => {
    const loadViews = async () => {
      try {
        const data = await getWeeklySiteViews();

        const formatted = data.map((item) => ({
          ...item,
          date: formatMonthDay(item.createDt),
        }));

        setViews(formatted);
      } catch (err) {
        console.error("failed to load weekly site views:", err);
      }
    };

    loadViews();
  }, []);

  return (
    <s.Card>
      <s.Title>📊 최근 7일 사이트 조회수</s.Title>

      <div style={{ width: "100%", height: "80%" }}>
        <ResponsiveContainer width="100%" height="100%">
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

            <Tooltip content={<CustomTooltip />} />

            <Bar
              dataKey="views"
              fill="#0ea5e9"
              barSize={35}
              radius={[1, 1, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </s.Card>
  );
}

export default WeeklySiteViews;
