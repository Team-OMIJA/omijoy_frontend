/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  padding: 40px 80px;
  box-sizing: border-box;
`;

export const title = css`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 25px;
`;

export const empty = css`
  font-size: 16px;
  color: #777;
  text-align: center;
  padding: 40px 0;
`;

export const list = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 30px;
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const card = css`
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  }
`;

export const poster = css`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const info = css`
  text-align: left;
`;

export const name = css`
  font-size: 15px;
  font-weight: 600;
  color: #111;
  margin-bottom: 6px;
  line-height: 1.4;
`;

export const place = css`
  font-size: 13px;
  color: #555;
  margin: 2px 0;
`;

export const date = css`
  font-size: 12.5px;
  color: #777;
  margin: 1px 0;
`;

export const genre = css`
  font-size: 12.5px;
  color: #999;
  margin: 3px 0;
`;
