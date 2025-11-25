import { Route, Routes } from "react-router-dom";
import Layout from "../../components/layout/Layout/Layout";
import PerformanceRouter from "../PerformanceRouter/PerformanceRouter";
import Home from "../../pages/Home/Home";
import Theater from "../../pages/PerformancePlace/PerformancePlace";
import Login from "../../pages/Auth/Login/Login";
import SignUp from "../../pages/Auth/SignUp/SignUp";
import MyPage from "../../pages/MyPage/MyPage";
import OAuth2Redirect from "../../pages/Auth/OAuth2/OAuth2Redirect";
import FavoriteSharedList from "../../pages/MyPage/FavoriteList/FavoriteSharedList";
import AdminDashboard from "../../pages/AdminDashboard/AdminDashboard";
import NavBar from "../../components/layout/NavBar/NavBar";
import DiscountInfo from "../../pages/Home/Banner/DiscountInfo/DiscountInfo";

function MainRouter() {
  return (
    <Routes>
      <Route
        path="/adminpage"
        element={
          <>
            <NavBar />
            <AdminDashboard />
          </>
        }
      />
      <Route
        path="/theater"
        element={
          <>
            <NavBar />
            <Theater />
          </>
        }
      />
      <Route element={<Layout />}>
        {/* index 사용시 기본 경로와 동일합니다. */}
        <Route index element={<Home />} />
        {/* 로그인 엔드포인트 */}
        <Route path="/login" element={<Login />} />
        {/* 퍼포먼스 라우터에서 페이지 전환이 있기 때문에 개별적으로 라우터 만들었습니다. 작업하시는 분이  라우터 대신 useNavigate쓰는게 옳다고 생각할 경우 usenavigate 써도 상관 없습니다.*/}
        <Route path="/performance/*" element={<PerformanceRouter />} />
        {/* 공연장 */}
        <Route path="/discountinfo" element={<DiscountInfo />} />
        <Route path="/theater" element={<Theater />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login/oauth2" element={<OAuth2Redirect />} />
        {/* 공유 페이지 */}
        <Route
          path="/favorites/list/:userId"
          element={<FavoriteSharedList />}
        />
      </Route>
    </Routes>
  );
}

export default MainRouter;
