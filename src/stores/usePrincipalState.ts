import { queryClient } from "./../configs/queryClient";
import { create } from "zustand";
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

export const usePrincipalState = 
// create<PrincipalState>((set) => ({
//   isAuthenticated: false,
//   principal: null,

//   login: (userData) => set({ isAuthenticated: true, principal: userData }),

//   logout: () => {
//     // jwt 토큰 삭제
//     localStorage.removeItem("jwt");
//     // 캐시 초기화
//     queryClient.clear();
//     // 로그아웃 상태로 만들어줌
//     set({ isAuthenticated: false, principal: null });
//     // 로그인 페이지로 리다이렉트
//     window.location.href = "/login";
//   },
// }),

// );
create(
   persist<PrincipalState>(
    (set) => ({
      isAuthenticated: false,
      principal: null,

      login: (userData) => set({ isAuthenticated: true, principal: userData }),

      logout: () => {
        sessionStorage.removeItem("jwt");
        queryClient.clear();
        set({ isAuthenticated: false, principal: null });
        window.location.href = "/login";
      },
    }),
    {
      name: "principal-storage", // localStorage에 저장될 key 이름 ... 이거 해야함? 꼭?
    }
  )
)
// import { queryClient } from "./../configs/queryClient";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// // 로그인 유저 데이터 인터페이스
// interface Principal {
//   id: number;
//   username: string;
//   email: string;
//   profileImg?: string;
//   role: string;
// }

// interface PrincipalState {
//   isAuthenticated: boolean;
//   principal: Principal | null;
//   login: (userData: Principal, token: string) => void;
//   logout: () => void;
// }

// export const usePrincipalState = create(
//   persist<PrincipalState>(
//     (set) => ({
//       isAuthenticated: false,
//       principal: null,

//       // ✅ 로그인 시
//       login: (userData, token) => {
//         sessionStorage.setItem("jwt", token);
//         set({ isAuthenticated: true, principal: userData });
//       },

//       // ✅ 로그아웃 시
//       logout: () => {
//         sessionStorage.removeItem("jwt");
//         queryClient.clear();
//         set({ isAuthenticated: false, principal: null });
//         window.location.href = "/login";
//       },
//     }),
//     {
//       name: "principal-storage", // 저장 key 이름
//      storage: {
//   getItem: (key) => sessionStorage.getItem(key),
//   setItem: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
//   removeItem: (key) => sessionStorage.removeItem(key),
// },
//     }
//   )
// );