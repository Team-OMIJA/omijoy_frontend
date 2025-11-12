import { create } from "zustand";
import { instance } from "../apis/instance";

type FavoriteStore = {
  favorites: Record<string, boolean>; // { [prfId]: true/false }
  toggleFavorite: (prfId: string) => Promise<void>;
  fetchFavoriteState: (prfId: string) => Promise<boolean>;
};

export const useFavoriteState = create<FavoriteStore>((set, get) => ({
  favorites: {},

  // 서버에서 현재 스크랩 여부 가져오기
  fetchFavoriteState: async (prfId) => {
    try {
      const res = await instance.get(`/commonmodal/${prfId}`);
      const favorited = res.data.favorited;
      set((state) => ({
        favorites: { ...state.favorites, [prfId]: favorited },
      }));
      return favorited;
    } catch (err) {
      console.error("스크랩 상태 조회 실패:", err);
      return false;
    }
  },

  // 서버에 토글 요청 + 전역 상태 갱신
  toggleFavorite: async (prfId) => {
    try {
      await instance.post(`/favorite/${prfId}/like`);
      set((state) => {
        const prev = state.favorites[prfId] ?? false;
        return {
          favorites: { ...state.favorites, [prfId]: !prev },
        };
      });
    } catch (err) {
      console.error("스크랩 토글 실패:", err);
    }
  },
}));
