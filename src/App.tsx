import { BrowserRouter } from "react-router-dom";
import MainRouter from "./routes/MainRouter/MainRouter";
import { useEffect } from "react";
import { increaseSiteViews } from "./apis/adminApi";
// import { usePrincipalState } from "./stores/usePrincipalState";
import ScrollBack from "./components/common/Render/ScrollBack";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./configs/queryClient";
import Footer from "./components/Footer/Footer";

// 페이지 이동해도 캐시 유지하기위해 QuertClientProvider 사용했습니다.
// 상태 업데이트를 획일화

function App() {
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
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
