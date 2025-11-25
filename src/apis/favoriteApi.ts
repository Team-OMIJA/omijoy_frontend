import { instance } from "./instance";

// 공연 스크랩 토글
export const toggleFavoriteReq = async (prfId: string) => {
  try {
    const response = await instance.post(`/favorite/toggle/${prfId}`);
    return response.data;
  } catch (error) {
    console.error("스크랩 요청 실패 : ", error);
    throw error;
  }
};

// 내가 스크랩한 공연 리스트
export const getFavoritePrfListReq = async () => {
  try {
    const response = await instance.get("/favorite/list");
    return response.data;
  } catch (error) {
    console.error("스크랩 리스트 불러오기 실패 : ", error);
    throw error;
  }
};

// 공유 리스트
export const getSharedFavoritePrfListReq = async (userId: string) => {
  try {
    const response = await instance.get(`/favorite/list/${userId}`);
    return response.data;
  } catch (error) {
    console.error("공유 스크랩 리스트 불러오기 실패 : ", error);
    throw error;
  }
};
