import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 실패 시 재 시도 횟수
      refetchOnWindowFocus: false, // 포커스 시 자동 새로고침 방지
      staleTime: 1000 * 60 * 3, // 3분간 데이터 신선한 상태 유지
    },
  },
});
