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
  background: #0f0f0f;
  border-bottom: 2px solid #2b2b2b;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  z-index: 100;
`;

export const logo = css`
  font-weight: bolder;
  font-size: 1.2em;
  margin-left: 100px;
  margin-right: 60px;
  cursor: pointer;
  color: crimson;
`;

export const navListStyle = css`
  font-size: 1em;
  list-style: none;
  display: flex;
  gap: 50px;

  padding: 0;
  margin: 0;
`;

export const linkStyle = (active: boolean) => css`
  position: relative;
  text-decoration: none;
  color: ${active ? "#e0e0e0" : "#cfcfcf"};
  font-weight: ${active ? "bold" : "normal"};
  transition: color 0.2s ease;

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

export const profileContainer = css`
  margin-right: 100px;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

// 유저가 가지고있는() 이미지에 적용시킴
export const profileStyle = (hasImg) => css`
  width: 40px;
  height: 40px;
  background-color: ${hasImg ? "transparent" : "ccc"};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;
