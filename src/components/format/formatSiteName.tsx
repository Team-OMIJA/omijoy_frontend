export function formatSiteName(url: string): string {
  const lower = url.toLowerCase();

  const mapping: Record<string, string> = {
    interpark: "인터파크",
    ticketlink: "티켓링크",
    yes24: "YES24",
    naver: "네이버 예매",
    wemakeprice: "위메프 티켓",
    melon: "멜론 티켓",
    lotte: "롯데콘서트홀",
    coffee: "커피첨가 티켓",
    nanuicket: "나누티켓",
    coupang: "쿠팡",
    clipsservice: "클립서비스",
    timeticket: "타임티켓",
    maketicket: "메이크티켓",
    playticket: "플레이티켓",
    tonon: "티몬",
    yesplan: "예스플랜",
    sejongpac: "세종문화회관",
  };

  // 1) 사전 매칭
  for (const key in mapping) {
    if (lower.includes(key)) return mapping[key];
  }

  // 2) URL에서 domain 자동 추출 (fallback)
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    const main = hostname.split(".")[0];
    return main.charAt(0).toUpperCase() + main.slice(1);
  } catch (err) {
    return "예매처";
  }
}
