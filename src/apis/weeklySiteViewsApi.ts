import axios from "axios";

export type WeeklyView = {
  createDt: string;
  views: number;
};

// 조회수 증가
export const increaseSiteViews = async (): Promise<void> => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  try {
    const response = await axios.post(`${BASE_URL}/views/increase`);
    return response.data;
  } catch (err) {
    console.error("failed to increase site views:", err);
    throw err;
  }
};

// 최근 7일 조회수
export const getWeeklySiteViews = async (): Promise<WeeklyView[]> => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  try {
    const response = await axios.get(`${BASE_URL}/views/weekly`);
    return response.data as WeeklyView[];
  } catch (err) {
    console.error("failed to get weekly site views:", err);
    throw err;
  }
};
