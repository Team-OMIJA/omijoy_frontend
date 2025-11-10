import { queryClient } from './../configs/queryClient';
import { create } from 'zustand';

// 로그인 상태 유지

// 로그인 유저의 핵심 데이터 - 로그인 성공 시 반환된 유저 정보 json으로 담음
interface Principal {
  id: number;
  username: string;
  email: string;
  profileImg?: string;
  role: string;
}

interface PrincipalState {
  isAuthenticated: boolean; // 로그인 여부
  principal: Principal | null; // 로그인 사용자 정보 
  login: (userData: Principal) => void; // 로그인 시
  logout: () => void; // 로그아웃 시
}

export const usePrincipalState = create<PrincipalState>((set) => ({
  isAuthenticated: false,
  principal: null,

  login: (userData) => set({ isAuthenticated: true, principal: userData }),

  logout: () => {
    // jwt 토큰 삭제
    localStorage.removeItem("accessToken");
    // 캐시 초기화
    queryClient.clear();
    // 로그아웃 상태로 만들어줌
    set({ isAuthenticated: false, principal: null });
    // 로그인 페이지로 리다이렉트
    window.location.href = "/login";
  },
}));
