import styled from "@emotion/styled";

// 전체 Nav
export const NavBar = styled.nav`
  position: sticky;
  top: 0;
  background: #0f0f0f;
  border-bottom: 2px solid #2b2b2b;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: 100;
`;

// 로고
export const Logo = styled.div`
  font-weight: bolder;
  font-size: 1.3em;
  margin-left: 100px;
  margin-right: 60px;
  cursor: pointer;
  color: crimson;
`;

// 네비 리스트
export const NavList = styled.ul`
  font-size: 1em;
  list-style: none;
  display: flex;
  gap: 50px;
  padding: 0;
  margin: 0;
`;

// 링크 스타일
export const StyledLink = styled.div<{ active: boolean }>`
  position: relative;
  text-decoration: none;
  color: ${({ active }) => (active ? "#e0e0e0" : "#cfcfcf")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  transition: color 0.2s ease;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -18px;
    width: 0;
    height: 2px;
    background-color: #e0e0e0;
    transform: translateX(-50%);
    border-radius: 2px;
    transition: width 0.1s ease;
  }

  &:hover::after {
    width: 150%;
  }
`;

// 프로필 컨테이너
export const ProfileContainer = styled.div`
  margin-right: 100px;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

// 프로필 아바타 스타일
export const ProfileAvatar = styled.div<{ hasImg: boolean }>`
  width: 40px;
  height: 40px;
  background-color: ${({ hasImg }) => (hasImg ? "transparent" : "#ccc")};
  font-size: 14px;
  cursor: pointer;
`;
