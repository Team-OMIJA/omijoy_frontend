import PrfCardSkeleton from "./PrfCardSkeleton";

export default function PrfList24Skeleton() {
  return (
    <div
      style={{
        width: "1350px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        columnGap: "30px",
        rowGap: "40px",
      }}
    >
      {/* 카드 스켈레톤 24개 */}
      {Array.from({ length: 24 }).map((_, i) => (
        <PrfCardSkeleton key={i} />
      ))}
      {/*[undefined, undefined, undefined, undefined, undefined] 이런 배열 생성 -> .map()으로 PrfCardSkeleton을 5번 렌더링 */}
    </div>
  );
}
