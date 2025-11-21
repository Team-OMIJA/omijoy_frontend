import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <div className="arrow next" onClick={onClick}>
      <FaChevronRight />
    </div>
  );
}

export function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div className="arrow prev" onClick={onClick}>
      <FaChevronLeft />
    </div>
  );
}