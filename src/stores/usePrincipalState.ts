//여기 나중에 zustand 사용시 상태 관리 가능한 ts 파일 작성하면 됩니다.
// zustand, queryClient 사용
// 상태 관리이기 때문에 파일 명 000State.js

// 예시 코드
// import { create } from "zustand";
// import { queryClient } from "../configs/queryClient";

// export const usePrincipalState = create((set) => ({
//   isAuthenticated: false, //더 직관적인 명명(isLoggedIn)
//   principal: null,

//   login: (userData) => set({ isAuthenticated: true, principal: userData }),

//   logout: () => {
//     localStorage.removeItem("accessToken");
//     queryClient.removeQueries({ queryKey: ["getPrincipal"], exact: true });
//     queryClient.removeQueries({ queryKey: ["currentLocation"], exact: true });
//     queryClient.clear(); //캐시 제거
//     set({ isAuthenticated: false, principal: null });
//     window.location.href = "/login";
//   },
// }));