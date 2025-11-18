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

//
