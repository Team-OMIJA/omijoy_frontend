
// function NavBar() {
//   return (
//     <div>NavBar</div>
//   )
// }

// export default NavBar

/** @jsxImportSource @emotion/react */
import { Link, useLocation } from "react-router-dom";
import * as s from "./styles";

function NavBar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "홈" },
    { path: "/performance", label: "공연" },
    { path: "/theater", label: "공연장" },
    { path: "/login", label: "로그인" },
  ];

  return (
    <nav css={s.navStyle}>
      <ul css={s.navListStyle}>
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
      </ul>
    </nav>
  );
}

export default NavBar;


