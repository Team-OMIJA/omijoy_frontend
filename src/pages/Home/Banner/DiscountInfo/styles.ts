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
  background: rgba(0, 0, 0, 0.8);
`;

export const FullImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 2;
  opacity: 0.9;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0 80px 0;
  background-color: #121212;
`;

export const ContentBox = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
`;

export const InfoImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  background: #000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
`;
