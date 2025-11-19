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
  Area,
} from "recharts";

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

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
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
        📈 {month}월 신규 가입자 수
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          {/* 그라데이션 정의 */}
          <defs>
            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6EC6FF" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#6EC6FF" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} domain={[0, "dataMax + 1"]} />
          <Tooltip formatter={(v: number) => [`${v}명`, "가입자 수"]} />

          {/* 아래 그라데이션 영역 */}
          <Area
            type="linear"
            dataKey="value"
            stroke="#5CC2FF"
            fill="url(#colorBlue)"
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />

          {/* 위 꺾은선 */}
          <Line
            type="linear"
            dataKey="value"
            stroke="#1697F6"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyNewSignUps;
