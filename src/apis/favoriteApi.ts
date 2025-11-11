// 스크랩(좋아요) 관련 api

import { instance } from "./instance"

// 공연 스크랩 토글
export const toggleFavoriteReq = async (prfId: string) => {
  try {
    const response = await instance.post(`/favorite/${prfId}/like`)
    return response.data;
  } catch (error) {
    console.error("스크랩 요청 실패 : ", error)
    throw error;
  }
}

// 내가 스크랩한 공연 리스트
export const getFavoritePrfListReq = async () => {
  try {
    const response = await instance.get("/favorite/list")
    return response.data;
  } catch (error) {
    console.error("스크랩 리스트 불러오기 실패 : ", error)
    throw error;
  }
}