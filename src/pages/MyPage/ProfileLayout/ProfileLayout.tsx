/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import * as s from "./ProfileLayoutStyles";

// 프로필 화면 공통 레이아웃
function ProfileLayout({ children }: { children: ReactNode }) {
  return <s.Container>{children}</s.Container>;
}

export default ProfileLayout;
