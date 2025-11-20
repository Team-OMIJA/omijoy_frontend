/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

/* 전체 섹션 컨테이너 */
export const SectionContainer = styled.div`
  width: 1350px;
  margin: 0 auto;
  padding: 40px 0;
  box-sizing: border-box;
`;

/* 섹션 헤더 */
export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

/* 제목 */
export const SectionTitle = styled.h2`
  font-size: 23px;
  font-weight: 700;
  margin: 0;
  color: #e0e0e0;
`;

/* 그리드 */
export const PerformanceGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 30px;
  row-gap: 40px;
`;

/* 카드 전체 */
export const PerformanceCard = styled.div`
  text-align: left;
  padding: 8px;
  border-radius: 14px;
`;

/* 포스터 이미지 */
export const Poster = styled.img`
  width: 100%;
  height: 290px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  }
`;

/* 공연 제목 */
export const PerformanceTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #e0e0e0;
  margin-bottom: 6px;
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: normal;
`;

/* 공연장 */
export const PerformancePlace = styled.div`
  color: #dbdbdb;
  font-size: 13px;
  margin: 2px 0;
  word-break: keep-all;
`;

/* 기간 */
export const PerformancePeriod = styled.div`
  color: #a3a3a3;
  font-size: 12.5px;
  margin: 1px 0;
`;

/* 장르 */
export const PerformanceGenre = styled.div`
  color: #a3a3a3;
  font-size: 12.5px;
  margin: 3px 0;
`;

/* 순위 오버레이 카드 */
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

  &:hover {
    color: #e0e0e0;
  }
`;

// 새로고침 버튼
export const RefreshButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  color: #9e9e9e;
  transition: color 0.2s ease;

  &:hover {
    color: #e0e0e0;
  }
`;
