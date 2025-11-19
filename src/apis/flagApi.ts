import { instance } from "./instance";

// 내가 플래그 찍은 공연장 리스트
export const getFlagListReq = async () => {
  try {
    const response = await instance.get("/flag/list");
    return response.data;
  } catch (error) {
    console.error("플래그 리스트 불러오기 실패 : ", error);
    throw error;
  }
};
