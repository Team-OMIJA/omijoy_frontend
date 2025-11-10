import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 실패 시 재 시도 횟수 1 ~ 3회로 조정할 가능성 있음
      refetchOnWindowFocus: false, // 포커스 시 자동 새로고침 방지(다시 창으로 돌아와도 캐싱된 데이터 그대로 보여줌 - 재요청 방지)
      staleTime: 1000 * 60 * 3, // 3분간 데이터 신선한 상태 유지(불필요한 재요청 방지)
    },
  },
});
