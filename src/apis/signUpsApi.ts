import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type NewSignUps = {
  dayOfMonth: number;
  signUpCount: number;
};

export async function getMonthlyNewSignUps(year: number, month: number) {
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
