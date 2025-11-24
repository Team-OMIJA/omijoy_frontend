/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Carousel } from "@mantine/carousel";
import { styled } from "@mui/material";

export const container = css`
  width: 100%;
  margin-top: 100px;
  padding: 40px 0px;
  box-sizing: border-box;
  /* position: relative; */
`;

export const title = css`
  font-size: 1.8em;
  font-weight: 700;
  margin-bottom: 25px;
  color: #e0e0e0;
`;

/* 공유 버튼 */
export const shareButtonWrapper = css`
  position: absolute;
  top: 40px;
  right: 60px;
`;

// 공연 스크랩 없을 시
export const empty = css`
  font-size: 16px;
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
  text-align: left;
  padding: 5px;
  border-radius: 14px;
  cursor: pointer;
`;

/* 포스터 hover 효과 */
export const poster = css`
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  }
`;

export const info = css`
  text-align: left;
`;

/* 제목 */
export const name = css`
  font-size: 15px;
  font-weight: 600;
  color: #e0e0e0;
  margin-bottom: 6px;
  line-height: 1.4;
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: normal;
`;

/* 장소 */
export const place = css`
  font-size: 13px;
  color: #dbdbdb;
  margin: 2px 0;
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: normal;
`;

/* 날짜 */
export const date = css`
  font-size: 12.5px;
  color: #a3a3a3;
  margin: 1px 0;
`;

/* 장르 */
export const genre = css`
  font-size: 12.5px;
  color: #a3a3a3;
  margin: 3px 0;
`;

// 슬라이드
export const sliderWrapper = css`
  /* margin-top: 20px;
  width: 100%; */
  position: relative;
  overflow: hidden;
  padding: 0 20px; /* 좌우 여백 살짝 */
`;

/* 왼쪽 페이드 (투명 → 배경색) */
export const gradientLeft = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100%;
  z-index: 5;
  pointer-events: none;

  background: linear-gradient(
    to right,

    rgba(18, 18, 18, 1) 0%,
    rgba(18, 18, 18, 0.8) 30%,
    rgba(18, 18, 18, 0.4) 60%,
    rgba(18, 18, 18, 0) 100%
  );
`;

/* 오른쪽 페이드 (배경색 → 투명) */
export const gradientRight = css`
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100%;
  z-index: 5;
  pointer-events: none;

  background: linear-gradient(
    to left,

    rgba(18, 18, 18, 1) 0%,
    rgba(18, 18, 18, 0.8) 30%,
    rgba(18, 18, 18, 0.4) 60%,
    rgba(18, 18, 18, 0) 100%
  );
`;

export const StyledCarousel = styled(Carousel)`
  .mantine-Carousel-control {
    background: rgba(255, 255, 255, 0.28);
    border: none;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(8px);
    color: #fbfbfb;
    z-index: 20;
  }
`;
