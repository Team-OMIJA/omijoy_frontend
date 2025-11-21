/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  margin-top: 50px;
  padding: 40px 0px;
  box-sizing: border-box;
`;

export const header = css`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
`;

export const title = css`
  font-size: 1.8em;
  font-weight: 700;
  margin-bottom: 25px;
  color: #e0e0e0;
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
  background: #737373ff;
  padding: 20px 18px;
  border-radius: 16px;
  cursor: pointer;
  transition: background-color 0.25s ease, transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    background-color: #a4a4a4ff; /* 약간 더 밝아지는 느낌 유지 */
    transform: translateY(-4px);

    /* 화이트 톤 그림자 */
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.25),
      0 0 16px rgba(255, 255, 255, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1); /* 깊이감 살짝 */
  }
`;

export const placeName = css`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
  color: #ddddddff;
`;

export const address = css`
  font-size: 14px;
  color: #d0d0d0ff;
`;
