// [지역] 제거
// export const removeRegionTag = (text: string) => {
//   return text.replace(/\[.*?\]/g, "").trim();
// };
export const removeRegionTag = (text?: string | null) => {
  if (!text) return ""; // null / undefined / 빈문자 모두 처리
  return text.replace(/\[.*?\]/g, "").trim();
};