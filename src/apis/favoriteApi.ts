import axios from "axios";

export type ScrapRank = {
  prfName: string;
  scrapCount: number;
};

export const getTop10Favorites = async (): Promise<ScrapRank[]> => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  try {
    const response = await axios.get(`${BASE_URL}/favorite/top10`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch top10 favorites", error);
    throw error;
  }
};
