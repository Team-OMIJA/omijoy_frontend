/** @jsxImportSource @emotion/react */
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as s from "./styles";
import { Avatar } from "@mui/material";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", label: "홈" },
    { path: "/performance", label: "공연" },
    { path: "/theater", label: "공연장" },
    // { path: "/login", label: "로그인" },
  ];

  // 나중에 Firebase 로그인 시 교체될 프로필 이미지
  const userProfileImg = null;

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

      {/* 로그인/프로필 아이콘 */}
      <div css={s.profileContainer}>
        <Link to="/login">
          <Avatar
            alt="user-profile"
            src={userProfileImg || ""}
            css={s.profileStyle(userProfileImg)}
          ></Avatar>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
