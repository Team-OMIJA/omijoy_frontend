/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

/* 전체 레이아웃 */
export const Layout = styled.div`
  display: flex;
  width: 100%;
  background-color: #0d1117;
  min-height: 100vh;
`;

/* 사이드바 */
export const Sidebar = styled.div`
  width: 240px;
  background-color: #0f172a;
  color: white;
  padding: 30px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

/* 로고 */
export const Logo = styled.div`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
`;

/* 메뉴 */
export const Menu = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & li {
    font-size: 16px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    border-radius: 8px;
    transition: 0.2s;

    &:hover {
      background-color: #1e293b;
    }
  }
`;

/* 오른쪽 콘텐츠 영역 */
export const Content = styled.div`
  flex: 1;
  padding: 50px;
  color: white;
`;
