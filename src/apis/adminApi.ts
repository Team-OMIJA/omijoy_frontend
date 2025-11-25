import axios from "axios";
import { WeeklyView, NewSignUps, ScrapRank } from "../types/adminPageTypes";

// 월별 신규 가입자 수
export async function getMonthlyNewSignUps(year: number, month: number) {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  try {
    const response = await axios.get(`${BASE_URL}/newsignups`, {
      params: { year, month },
    });
    return response.data as NewSignUps[];
  } catch (err) {
    console.error("failed to get monthly new sign ups:", err);
    throw err;
  }
}

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

// Top10 스크랩 공연
export const getTop10Favorites = async (): Promise<ScrapRank[]> => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  try {
    const response = await axios.get(`${BASE_URL}/favorite`);
    return response.data;
  } catch (error) {
    console.error("Failed to get top10 favorites", error);
    throw error;
  }
};

// 배너에서 쓸 스크랩 1위
export const getTop1FavoriteForBanner = async (): Promise<ScrapRank> => {
  const list = await getTop10Favorites();
  return list[0];
};
