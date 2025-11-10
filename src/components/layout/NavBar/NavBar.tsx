/** @jsxImportSource @emotion/react */
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as s from "./styles";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import React, { useState } from "react";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { principal, logout } = usePrincipalState();
  // MUI menu 컴포넌트가 어디 붙어서 열릴지 결정
  const [anchorE1, setAnchorE1] = useState<null | HTMLElement>(null);

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
    // 현재 상태값에 따라 바뀜 - 마우스 갖다대면 열림
    setAnchorE1(event.currentTarget);
  };

  const menuCloseHandler = () => {
    setAnchorE1(null);
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
    <nav css={s.navStyle}>
      <div css={s.logo} onClick={() => navigate("/")}>
        OMIJOY
      </div>

      <div css={s.navListStyle}>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              css={s.linkStyle(location.pathname === item.path)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </div>

      {/* 프로필 클릭 시 드롭다운 */}
      <div css={s.profileContainer}>
        <Avatar
          alt="user-profile"
          src={userProfileImg || defaultProfileImg} //  기본 이미지 적용
          css={s.profileStyle(userProfileImg)}
          onClick={menuOpenHandler}
        />
        <Menu
          anchorEl={anchorE1}
          open={Boolean(anchorE1)}
          onClose={menuCloseHandler}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {principal ? (
            <>
              <MenuItem onClick={() => menuOnClickHandler("logout")}>
                로그아웃
              </MenuItem>
              <MenuItem onClick={() => menuOnClickHandler("/mypage")}>
                마이페이지
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={() => menuOnClickHandler("/login")}>
                로그인
              </MenuItem>
              <MenuItem onClick={() => menuOnClickHandler("/login")}>
                마이페이지
              </MenuItem>
            </>
          )}
        </Menu>
      </div>
    </nav>
  );
}

export default NavBar;
