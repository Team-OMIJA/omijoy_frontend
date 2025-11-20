/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

/* 전체 영역 */
export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

/* 메인 배경 + 블러 + 카드 포함 */
export const BackgroundWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 370px;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
`;

/* 흐린 배경 이미지 */
export const BackgroundBlur = styled.div<{ img: string }>`
  position: absolute;
  inset: 0;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  filter: blur(12px);
  transform: scale(1.1);
`;

/* 어두운 오버레이 */
export const DarkOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
`;

/* 상단 제목 */
export const HeaderText = styled.div`
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 22px;
  font-weight: 600;
  z-index: 5;
  text-align: center;
  white-space: nowrap;
  color: #dbdbdb;
`;

/* 카드 wrapper */
export const CardContainer = styled.div`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

/* 개별 카드 */
export const Card = styled.div`
  width: 33%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
`;

/* 포스터 이미지 */
export const Poster = styled.img`
  height: 180px;
  width: 125px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
`;

/* 제목 */
export const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 6px;
  text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: normal;
  color: #e0e0e0;
`;

/* 날짜 */
export const DateText = styled.div`
  font-size: 14px;
  opacity: 0.9;
  color: #dbdbdb;
`;
