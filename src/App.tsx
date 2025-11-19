import { BrowserRouter } from "react-router-dom";
import MainRouter from "./routes/MainRouter/MainRouter";
import { useEffect } from "react";
import { increaseSiteViews } from "./apis/weeklySiteViewsApi";
import { usePrincipalState } from "./stores/usePrincipalState";
import ScrollBack from "./components/common/Render/ScrollBack";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./configs/queryClient";

// 페이지 이동해도 캐시 유지하기위해 QuertClientProvider 사용했습니다.
// 상태 업데이트를 획일화 

function App() {
  // const { login } = usePrincipalState();

  // useEffect(() => {
  // 더미 로그인 유저 (프론트 전용)
  //   login({
  //     id: 2,
  //     username: "테스트유저",
  //     email: "test@example.com",
  //     profileImg:
  //       "https://firebasestorage.googleapis.com/v0/b/omijoy-project.firebasestorage.app/o/omijoy_storage%2Fprofile-img%2Ff07b29c9-0252-4347-a351-e2c2c286d454.png?alt=media&token=67d04ac8-25b4-44c1-a1dc-fae9c408b265",
  //     role: "USER",
  //   });
  // }, [login]);
  // if ('scrollRestoration' in history) {
  //   history.scrollRestoration = 'manual';
  // }

  // Site view 증가
  useEffect(() => {
    const visited = sessionStorage.getItem("visited");

    if (!visited) {
      increaseSiteViews();
      sessionStorage.setItem("visited", "true");
    }
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollBack />
          <MainRouter />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
