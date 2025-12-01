import { create } from "zustand";
import { instance } from "../apis/instance";

// 나중에 types로 분리
type Performance = {
  prfId: string;
  posterImgUrl: string;
  prfNm: string;
  prfPlcNm: string;
  prfStartDt: string;
  prfEndDt: string;
  genreNm: string;
};

type FavoriteStore = {
  favorites: Record<string, boolean>; // { [prfId]: true/false }
  favoriteList: Performance[];
  // Record 알아볼 것
  favoriteCount: Record<string, number>;

  setFavoriteList: (list: Performance[]) => void;
  removeFromFavoriteList: (prfId: string) => void;

  toggleFavorite: (prfId: string) => Promise<void>;
  fetchFavoriteState: (prfId: string) => Promise<boolean>;

  // 상태 바로 업데이트 시 필요
  fetchFavoriteCount: (prfId: string) => Promise<void>;
};

export const useFavoriteState = create<FavoriteStore>((set, get) => ({
  // 좋아요 객체
  favorites: {},
  // 좋아요 리스트
  favoriteList: [],
  // 좋아요 갯수
  favoriteCount: {},

  // 좋아요 리스트에 넣어줄 값
  setFavoriteList: (list) => set({ favoriteList: list }),

  removeFromFavoriteList: (prfId) =>
    set((state) => ({
      favoriteList: state.favoriteList.filter((item) => item.prfId !== prfId),
    })),

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
      await instance.post(`/favorite/toggle/${prfId}`);

      set((state) => {
        const prev = state.favorites[prfId] ?? false;

        return {
          favorites: { ...state.favorites, [prfId]: !prev },
        };
      });

      // 좋아요 취소라면 favoriteList에서도 바로 제거
      if (get().favorites[prfId] === true) {
        set((state) => ({
          favoriteList: state.favoriteList.filter(
            (item) => item.prfId !== prfId
          ),
        }));
      }
    } catch (err) {
      alert("로그인 후 이용가능합니다.");
      window.location.href = "/login";
    }
  },

  // 좋아요 카운트
  fetchFavoriteCount: async (prfId: string) => {
    try {
      const response = await instance.get(`/favorite/count/${prfId}`)
      const count = response.data;

      set((state) => ({
        favoriteCount: {
          ...state.favoriteCount,
          [prfId]: count
        }
      }))
    } catch (error) {
      console.error("좋아요 개수 조회 실패 : ", error)

    }
  }
}));


