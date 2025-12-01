import * as s from "./MonthlyNewSignUpsStyles";

type CustomTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: {
    value: number;
    name: string;
  }[];
};

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length > 0) {
    const value = payload[0].value;

    return (
      <s.TooltipBox>
        <s.TooltipLabel>{label}</s.TooltipLabel>
        <s.TooltipValue>가입자 수 : {value}명</s.TooltipValue>
      </s.TooltipBox>
    );
  }

  return null;
}

export default CustomTooltip;
