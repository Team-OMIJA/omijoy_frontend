/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

/* 전체 감싸는 영역 */
export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

/* 배너 전체 영역 */
export const BannerWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 380px;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  background-color: #111;
`;

/* 흐린 배경 */
export const BackgroundBlur = styled.div<{ img: string }>`
  position: absolute;
  inset: 0;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  filter: blur(14px);
  transform: scale(1.1);
`;

/* 어두운 오버레이 */
export const DarkOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
`;

/* 왼쪽 텍스트 영역 */
export const LeftTextArea = styled.div`
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  color: #fff;
  max-width: 60%;
`;

/* "누적 스크랩 1위" */
export const SubLabel = styled.div`
  font-size: 17px;
  font-weight: 500;
  opacity: 0.9;
  margin-bottom: 6px;
`;

/* 공연 제목 */
export const Title = styled.div`
  font-size: 28px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 10px;
  text-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: normal;
`;

/* 날짜 텍스트 */
export const DateText = styled.div`
  font-size: 16px;
  color: #ddd;
`;

/* 오른쪽 포스터 이미지 */
export const PosterImage = styled.img`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 200px;
  height: 260px;
  object-fit: cover;
  border-radius: 10px;
  z-index: 2;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
`;
