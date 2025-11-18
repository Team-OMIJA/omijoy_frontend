import PrfCardSkeleton from "./PrfCardSkeleton";

export default function PrfList10Skeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "30px",
        width: "100%",
      }}
    >
      {/* 카드 스켈레톤 5개 */}
      {Array.from({ length: 20 }).map((_, i) => (
        <PrfCardSkeleton key={i} />
      ))}
      {/*[undefined, undefined, undefined, undefined, undefined] 이런 배열 생성 -> .map()으로 PrfCardSkeleton을 5번 렌더링 */}
    </div>
  );
}
