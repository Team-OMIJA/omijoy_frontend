import { useEffect, useState } from "react";
import { getMonthlyNewSignUps } from "../../../apis/adminApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import * as s from "./styles";

function MonthlyNewSignUps() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  // ex. name: "1일", value: 10
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  useEffect(() => {
    const loadData = async () => {
      const today = new Date();
      const year = today.getFullYear();
      const monthNumber = today.getMonth() + 1;
      const todayDate = today.getDate();

      setMonth(monthNumber);

      try {
        const result = await getMonthlyNewSignUps(year, monthNumber);

        const processedData = Array.from({ length: todayDate }, (_, i) => {
          //ex. 오늘 10일이면 length 10 배열 생성
          // (_, i) -> _: 사용 안하는 값, i: index
          const day = i + 1;
          const found = result.find((item) => item.dayOfMonth === day);

          return {
            name: `${day}일`,
            value: found ? found.signUpCount : 0,
          };
        });

        setData(processedData);
      } catch (err) {
        console.error("failed to load monthly newSignUps:", err);
      }
    };

    loadData();
  }, []);

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
            tick={{ fontSize: 12, fill: "#94a3b8" }} // 글자 스타일
            axisLine={false}
            tickLine={false} // 67, 68 -> 줄 없애기
          />
          <YAxis
            allowDecimals={false}
            domain={[0, "dataMax + 1"]} // 최대값보다 1 크게
            tick={{ fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          {/*Hover할 때 나타나는 툴팁*/}
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone" // 부드러운 곡선
            dataKey="value" // "선이 어떤 데이터를 사용할지"
            stroke="#60a5fa"
            strokeWidth={3}
            dot={{ r: 3, fill: "#0ea5e9" }}
            activeDot={{ r: 5, stroke: "#bae6fd", strokeWidth: 1.5 }} // hover 시
          />
        </LineChart>
      </ResponsiveContainer>
    </s.Card>
  );
}

export default MonthlyNewSignUps;
