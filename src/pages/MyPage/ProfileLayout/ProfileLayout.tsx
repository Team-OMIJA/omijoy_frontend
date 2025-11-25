/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import * as s from "./styles";

// 프로필 화면 공통 레이아웃
function ProfileLayout({ children }: { children: ReactNode }) {
  return <div css={s.container}>{children}</div>;
}

export default ProfileLayout;
