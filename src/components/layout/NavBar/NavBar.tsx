/** @jsxImportSource @emotion/react */
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as s from "./NavBarStyles";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import React, { useState } from "react";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { principal, logout } = usePrincipalState();

  // MUI menu 컴포넌트가 어디 붙어서 열릴지 결정
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navItems = [
    { path: "/", label: "홈" },
    { path: "/performance", label: "공연" },
    { path: "/theater", label: "공연장" },
  ];

  // 로그인 유저 정보로 교체될 이미지
  const userProfileImg = principal?.profileImg;

  // 기본 프로필 이미지 (환경변수 or public 이미지)
  const defaultProfileImg =
    import.meta.env.VITE_PROFILE_DEFAULT_IMG || "/default-profile.png";

  // 메뉴 열기 / 닫기
  const menuOpenHandler = (event: React.MouseEvent<HTMLElement>) => {
    // 클릭 시 열림
    setAnchorEl(event.currentTarget);
  };

  const menuCloseHandler = () => {
    setAnchorEl(null);
  };

  const menuOnClickHandler = (path: string) => {
    menuCloseHandler();

    // 로그인 안되어있을 시 로그인 페이지로
    if (!principal) {
      navigate("/login");
      return;
    }

    // 로그아웃
    if (path === "logout") {
      logout();
      return;
    }
    //
    navigate(path);
  };

  return (
    <s.NavBar>
      {/* 로고 왼쪽 */}
      <s.Logo onClick={() => navigate("/")}>OMIJOY</s.Logo>

      <s.NavList>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>
              <s.StyledLink active={location.pathname === item.path}>
                {item.label}
              </s.StyledLink>
            </Link>
          </li>
        ))}
      </s.NavList>

      {/* 프로필 클릭 시 드롭다운 */}
      <s.ProfileContainer>
        <Avatar
          alt="user-profile"
          src={userProfileImg || defaultProfileImg} //  기본 이미지 적용
          sx={{ cursor: "pointer" }}
          onClick={menuOpenHandler}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={menuCloseHandler}
          slotProps={{
            paper: {
              sx: {
                backgroundColor: "#0f0f0f",
                color: "#e0e0e0",
                border: "2px solid rgba(255,255,255,0.08)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                mt: "5px",
                borderRadius: "5px",
              },
            },
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          {principal ? (
            <>
              {principal.role === "ADMIN" ? (
                <MenuItem onClick={() => menuOnClickHandler("/adminpage")}>
                  관리페이지
                </MenuItem>
              ) : (
                <MenuItem onClick={() => menuOnClickHandler("/mypage")}>
                  마이페이지
                </MenuItem>
              )}
              {/* 구분선 */}
              <div
                style={{
                  height: "2px",
                  background: "rgba(255,255,255,0.15)",
                  margin: "4px 10px",
                }}
              />
              <MenuItem onClick={() => menuOnClickHandler("logout")}>
                로그아웃
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={() => menuOnClickHandler("/login")}>
                로그인
              </MenuItem>
            </>
          )}
        </Menu>
      </s.ProfileContainer>
    </s.NavBar>
  );
}

export default NavBar;
