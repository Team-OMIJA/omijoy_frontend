import { useEffect, useState } from "react";
import { getMonthlyNewSignUps } from "../../../apis/signUpsApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import * as s from "./styles";

function MonthlyNewSignUps() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  useEffect(() => {
    const loadData = async () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const todayDate = today.getDate();
      setMonth(month);

      try {
        const data = await getMonthlyNewSignUps(year, month);

        const fullData = Array.from({ length: todayDate }, (_, i) => {
          const day = i + 1;
          const result = data.find((item) => item.dayOfMonth === day);
          return {
            name: `${day}일`,
            value: result ? result.signUpCount : 0,
          };
        });

        setData(fullData);
      } catch (err) {
        console.error("failed to load monthly newSignUps:", err);
      }
    };

    loadData();
  }, []);

  // Custom Tooltip
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active: boolean;
    payload: any[];
    label: string;
  }) => {
    if (active && payload && payload.length > 0) {
      const value = payload[0].value;
      return (
        <div
          style={{
            backgroundColor: "rgba(51, 65, 85, 0.9)",
            backdropFilter: "blur(6px)",
            padding: "12px 16px",
            borderRadius: "3px",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#e2e8f0",
            fontSize: "14px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          }}
        >
          <div style={{ marginBottom: "6px", color: "#93c5fd" }}>{label}</div>
          <div style={{ fontWeight: 500 }}>가입자 수 : {value}명</div>
        </div>
      );
    }
    return null;
  };

  return (
    <s.Card>
      <s.Title>📈 {month}월 신규 가입자 수</s.Title>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(148,163,184,0.15)"
          />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            domain={[0, "dataMax + 1"]}
            tick={{ fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#60a5fa"
            strokeWidth={3}
            dot={{
              r: 3,
              fill: "#0ea5e9",
            }}
            activeDot={{ r: 5, stroke: "#bae6fd", strokeWidth: 1.5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </s.Card>
  );
}

export default MonthlyNewSignUps;
