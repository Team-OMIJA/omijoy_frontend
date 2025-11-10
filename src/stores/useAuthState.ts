// src/stores/useAuthState.ts
import { create } from "zustand";

interface UserInfo {
  id: number;
  username: string;
  email?: string;
  role?: string;
  profileImg?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: UserInfo | null;

  login: (token: string, user: UserInfo) => void;
  logout: () => void;

  updateUsername: (newName: string) => void;
  updateProfileImg: (imgUrl: string) => void;
}

export const useAuthState = create<AuthState>((set) => ({
  isAuthenticated: !!sessionStorage.getItem("jwt"),
  token: sessionStorage.getItem("jwt"),
  user: null,

  // ✅ 로그인 시 토큰과 사용자 정보 저장
  login: (token, user) => {
    sessionStorage.setItem("jwt", token);
    set({
      isAuthenticated: true,
      token,
      user,
    });
  },

  // ✅ 로그아웃
  logout: () => {
    sessionStorage.removeItem("jwt");
    set({
      isAuthenticated: false,
      token: null,
      user: null,
    });
    window.location.href = "/login";
  },

  // ✅ 유저 이름 수정
  updateUsername: (newName) =>
    set((state) =>
      state.user ? { user: { ...state.user, username: newName } } : state
    ),

  // ✅ 프로필 이미지 수정
  updateProfileImg: (imgUrl) =>
    set((state) =>
      state.user ? { user: { ...state.user, profileImg: imgUrl } } : state
    ),
}));
