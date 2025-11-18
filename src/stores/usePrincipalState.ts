import { queryClient } from './../configs/queryClient';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // ✅ 추가

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

export const usePrincipalState = create(
  persist<PrincipalState>(
    (set) => ({
      isAuthenticated: false,
      principal: null,

      login: (userData) => set({ isAuthenticated: true, principal: userData }),

      logout: () => {
        localStorage.removeItem('jwt');
        queryClient.clear();
        set({ isAuthenticated: false, principal: null });
        window.location.href = '/login';
      },
    }),
    {
      name: 'principal-storage', // localStorage에 저장됨 - 이거 있으면 로그아웃 하기 전까지 로그아웃 x
    }
  )
);
