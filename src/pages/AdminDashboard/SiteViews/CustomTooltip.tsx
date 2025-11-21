type TooltipProps = {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
};

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (active && payload && payload.length > 0) {
    return (
      <div
        style={{
          backgroundColor: "rgba(30, 41, 59, 0.85)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "8px",
          padding: "10px 12px",
          backdropFilter: "blur(6px)",
          color: "#e2e8f0",
        }}
      >
        <div style={{ color: "#93c5fd", marginBottom: "6px" }}>{label}</div>
        <div style={{ fontWeight: 500 }}>조회수 : {payload[0].value}회</div>
      </div>
    );
  }
  return null;
}

export default CustomTooltip;
