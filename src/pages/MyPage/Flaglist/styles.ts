
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  padding: 40px 60px;
  box-sizing: border-box;
`;

export const header = css`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
`;

export const title = css`
  font-size: 22px;
  font-weight: 700;
`;

export const list = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const card = css`
  background: #f7f7f7;
  padding: 20px 18px;
  border-radius: 16px;
  cursor: pointer;
  transition: 
    background-color 0.25s ease, 
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    background-color: #ececec; /* 살짝 짙어짐 */
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const placeName = css`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
  color: #111;
`;

export const address = css`
  font-size: 14px;
  color: #555;
`;