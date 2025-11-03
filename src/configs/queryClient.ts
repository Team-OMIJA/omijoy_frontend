// tanstack 사용할거면 사용
// import { QueryClient } from "@tanstack/react-query";

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: Infinity,
//       cacheTime: Infinity,
//       //로그인 되어있는 동안 refetch 방지(성능 향상)
//       //사용자 정보 변경 시 queryClient.invalidateQueries(["getPrincipal"]); => refetch 필수
//     },
//   },
// });
