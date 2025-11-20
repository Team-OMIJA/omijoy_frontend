import { instance } from "./instance";

// 내가 플래그 찍은 공연장 리스트
export const getFlagListReq = async () => {
  try {
    const response = await instance.get("/flag/list");
    console.log("플래그 리스트 가져옴 : " ,response.data)
    return response.data;
  } catch (error) {
    console.error("플래그 리스트 불러오기 실패 : ", error);
    throw error;
  }
};

// 공연장 플래그 토글
export const toggleFlagReq = async (prfPlcId: string) => {
  try {
    const response = await instance.post(`/flag/toggle/${prfPlcId}`);
    console.log("📌 toggleFlag result:", response.data);
    return response.data;
  } catch (error) {
    console.error("플래그 요청 실패 : ", error);
    throw error;
  }
};
