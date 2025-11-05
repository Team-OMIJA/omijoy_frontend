import { Route, Routes } from "react-router-dom";
import Layout from "../../components/layout/Layout/Layout";
import PerformanceRouter from "../PerformanceRouter/PerformanceRouter";
import Home from "../../pages/Home/Home";
import Theater from "../../pages/PerformancePlace/PerformancePlace";
import Login from "../../pages/Auth/Login/Login";
import MyPage from "../../pages/MyPage/MyPage";

function MainRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* index 사옹시 기본 경로와 동일합니다. */}
        <Route index element={<Home />} />
        {/* 로그인 엔드포인트 */}
        <Route path="/login" element={
          // <Login />
          <MyPage />
          } />
        {/* 퍼포먼스 라우터에서 페이지 전환이 있기 때문에 개별적으로 라우터 만들었습니다. 작업하시는 분이  라우터 대신 useNavigate쓰는게 옳다고 생각할 경우 usenavigate 써도 상관 없습니다.*/}
        <Route path="/performance/*" element={<PerformanceRouter />} />
        {/* 공연장 */}
        <Route path="/theater" element={<Theater />} />
      </Route>
    </Routes>
  );
}

export default MainRouter;
