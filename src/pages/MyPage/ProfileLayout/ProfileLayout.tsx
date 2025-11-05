/** @jsxImportSource @emotion/react */
import * as s from "./styles";

// 프로필 화면 혹은 프로필 변경 화면 레이아
function ProfileLayout({ children }) {
  return <div css={s.container}>{children}</div>;
}

export default ProfileLayout;
