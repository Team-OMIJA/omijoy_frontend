import { create } from "zustand";

interface UserInfo {
  id: number;                // ✅ 추가
  username: string;
  email?: string;            // 선택사항
  role?: string;             // 선택사항
  profileImg?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: UserInfo | null;

  // 로그인 / 로그아웃
  login: (token: string, user: UserInfo) => void;
  logout: () => void;

  // 프로필 수정 관련
  updateUsername: (newName: string) => void;
  updateProfileImg: (imgUrl: string) => void;
}

export const useAuthState = create<AuthState>((set) => ({
  isAuthenticated: !!sessionStorage.getItem("jwt"),
  token: sessionStorage.getItem("jwt"),
  user: null,

  // ✅ 로그인
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
  },

  // ✅ 유저명 변경
  updateUsername: (newName) =>
    set((state) =>
      state.user ? { user: { ...state.user, username: newName } } : state
    ),

  // ✅ 프로필 이미지 변경
  updateProfileImg: (imgUrl) =>
    set((state) =>
      state.user ? { user: { ...state.user, profileImg: imgUrl } } : state
    ),
}));
