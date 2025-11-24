import type { CSSProperties, MouseEventHandler } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type ArrowProps = {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export function NextArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div
      className={["arrow", "next", className].filter(Boolean).join(" ")}
      style={style}
      onClick={onClick}
    >
      <FaChevronRight />
    </div>
  );
}

export function PrevArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div
      className={["arrow", "prev", className].filter(Boolean).join(" ")}
      style={style}
      onClick={onClick}
    >
      <FaChevronLeft />
    </div>
  );
}
