/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

/* 순위 카드 */
export const RankCard = styled.div`
  position: relative;
  width: 100%;
  height: 290px;
  margin-bottom: 15px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  }
`;

/* 순위 텍스트 */
export const RankNumber = styled.div`
  position: absolute;
  left: 10px;
  bottom: 5px;
  color: #fbfbfb;
  font-size: 60px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  transform: scaleX(1.25);
  transform-origin: left center;
  pointer-events: none;
`;

/* 아래 검정 그라데이션 */
export const RankOverlay = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0));
`;

/* 랭킹 이미지 */
export const RankImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 더보기 버튼
export const MoreButton = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  color: #9e9e9e;
  transition: color 0.2s ease;
  margin-left: auto;

  &:hover {
    color: #e0e0e0;
  }
`;
