// 예매처 사이트 이름 포맷팅
export function formatSiteName(url: string): string {
  const lower = url.toLowerCase();

  const mapping: Record<string, string> = {
    interpark: "인터파크",
    ticketlink: "티켓링크",
    yes24: "YES24",
    naver: "네이버 예매",
    wemakeprice: "위메프",
    melon: "멜론티켓",
    lotte: "롯데콘서트홀",
    coffee: "커넥티브 티켓",
    nanumticket: "나눔 티켓",
    coupang: "쿠팡",
    clipservice: "클립서비스",
    timeticket: "타임 티켓",
  };

  for (const key in mapping) {
    if (lower.includes(key)) return mapping[key];
  }

  // Fallback: URL로부터 도메인 자동 추출
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    const main = hostname.split(".")[0];
    return main.charAt(0).toUpperCase() + main.slice(1);
  } catch {
    return "예매처";
  }
}
