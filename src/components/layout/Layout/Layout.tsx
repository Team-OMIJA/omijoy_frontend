/** @jsxImportSource @emotion/react */
import * as s from './LayoutStyles';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { usePrincipalState } from '../../../stores/usePrincipalState';
import { useEffect } from 'react';
import { getPrincipalReq } from '../../../apis/authApi';

function Layout() {
  const { login, logout } = usePrincipalState();

  useEffect(() => {
    const fetchPrincipal = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) return; // 토큰 없으면 스킵

      try {
        const data = await getPrincipalReq(); // 백엔드에서 principal 요청
        login(data); // 전역 상태 업데이트
      } catch (error) {
        console.error('principal 불러오기 실패:', error);
        localStorage.removeItem('jwt');
        logout(); // 토큰 만료나 에러 시 로그아웃
      }
    };

    fetchPrincipal();
  }, [login, logout]);

  return (
    <>
      <NavBar />
      <s.Container>
        <Outlet />
      </s.Container>
    </>
  );
}

export default Layout;
