// [지역] 제거
export const removeRegionTag = (text: string) => {
  return text.replace(/\[.*?\]/g, "").trim();
};
