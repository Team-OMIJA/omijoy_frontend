import Skeleton from "react-loading-skeleton"; // 스켈레톤 컴포넌트 자체 가져옴
import "react-loading-skeleton/dist/skeleton.css"; // 기본 스타일(CSS 애니메이션, 색상, 하이라이트)을 가져옴

export default function PrfCardSkeleton() {
  return (
    <div style={{ width: "100%" }}>
      <Skeleton
        height={290}
        borderRadius={8}
        baseColor="#2A2A2A"
        highlightColor="#3A3A3A"
      />
      <Skeleton
        height={30}
        style={{ marginTop: 25 }}
        borderRadius={8}
        baseColor="#2A2A2A"
        highlightColor="#3A3A3A"
      />
      <Skeleton
        height={60}
        style={{ marginTop: 10 }}
        borderRadius={8}
        baseColor="#2A2A2A"
        highlightColor="#3A3A3A"
      />
    </div>
  );
}
