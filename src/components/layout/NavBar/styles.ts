// 나중에 emotion css 사용 시 고려
// import { css } from "@emotion/react";

// export const container = css`
//   position: sticky;
//   top: 0;
//   z-index: 100; /* 다른 콘텐츠 위에 보이게 */
//   background-color: white; /* 배경 없으면 스크롤 시 투명해짐 */
//   border-bottom: 1px solid #eee;
//   height: 60px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 16px;
// `;
import { css } from "@emotion/react";



export const navStyle = css`
  position: sticky;
  top: 0;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const logo = css`
font-weight: bolder;
cursor: pointer;
`

export const navListStyle = css`
  list-style: none;
  display: flex;
  gap: 24px;
  padding: 0;
  margin: 0;
`;

export const linkStyle = (active: boolean) => css`
  text-decoration: none;
  color: ${active ? "#0f0f0fff" : "#4f4f4fff"};
  font-weight: ${active ? "bold" : "normal"};
  transition: color 0.2s ease;
  &:hover {
    color: #373737ff;
  }
`;

export const profileContainer = css`
  margin-left: 8px;
  display: flex;
  align-items: center;
`;

// 유저가 가지고있는() 이미지에 적용시킴
export const profileStyle = (hasImg) => css`
  width: 32px;
  height:32px;
  background-color: ${hasImg ? "transparent" : "ccc"};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    transform: secale(1.05);
  }
`
