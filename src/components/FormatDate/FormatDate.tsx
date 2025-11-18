//  같은 날짜는 한 번만 반환
export function formatDateRange(
  start?: string | null,
  end?: string | null
): string {
  const s = start ?? "";
  const e = end ?? "";
  if (s === e) return s;
  return `${s} ~ ${e}`;
}

// - to .
export function formatDateDot(dateStr?: string | null) {
  if (!dateStr) return "";
  return dateStr.replace(/-/g, ".");
}

// YYYYMMDD
export function formatNewDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

// UI 용 날짜 포맷 함수 (Date 객체로 yyyy.mm.dd 변환)
export function formatUIDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}
