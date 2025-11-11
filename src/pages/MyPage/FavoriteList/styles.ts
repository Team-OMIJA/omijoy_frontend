import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  padding: 50px 80px;
  box-sizing: border-box;
`;

export const title = css`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 25px;
`;

export const empty = css`
  font-size: 15px;
  color: #666;
`;

export const list = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 30px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const card = css`
  text-align: left;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;

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
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const name = css`
  font-size: 15px;
  font-weight: 600;
  color: #111;
  line-height: 1.4;
`;

export const place = css`
  font-size: 13px;
  color: #555;
`;