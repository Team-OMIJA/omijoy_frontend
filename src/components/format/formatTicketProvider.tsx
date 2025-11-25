export function formatTicketProvider(providerUrl?: string): string[] {
  if (!providerUrl) return [];

  return providerUrl
    .split(",") // 콤마로 나누기
    .map((v) => v.trim()) // 앞뒤 공백 제거
    .filter(Boolean) // 빈 값 제거
    .map((url) =>
      url.startsWith("http") // http/https 없으면 붙이기
        ? url
        : `https://${url}`
    );
}
