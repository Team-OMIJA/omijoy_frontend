import { queryClient } from './../configs/queryClient';
import { create } from 'zustand';

// 로그인 상태 유지

interface Principal {
  id: number;
  username: string;
  email: string;
  profileImg?: string;
  role: string;
}

interface PrincipalState {
  isAuthenticated: boolean;
  principal: Principal | null;
  login: (userData: Principal) => void;
  logout: () => void;
}

export const usePrincipalState = create<PrincipalState>((set) => ({
  isAuthenticated: false,
  principal: null,

  login: (userData) => set({ isAuthenticated: true, principal: userData }),

  logout: () => {
    localStorage.removeItem("accessToken");
    queryClient.clear();
    set({ isAuthenticated: false, principal: null });
    window.location.href = "/login";
  },
}));
