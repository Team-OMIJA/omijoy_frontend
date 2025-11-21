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
  gap: 5px;
  align-items: center;
  margin-bottom: 20px;
`;

/* 제목 */
export const SectionTitle = styled.h2`
  font-size: 25px;
  font-weight: 700;
  margin: 0;
  color: #e0e0e0;
`;

/* 소제목 */
export const SectionSubTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  margin: 0;
  color: #acacac;
`;

/* 그리드 */
export const PerformanceGrid = styled.div`
  width: 100%;
  height: 470px;
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
  font-size: 17px;
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
  font-size: 14px;
  margin: 2px 0;
  word-break: keep-all;
`;

/* 기간 */
export const PerformancePeriod = styled.div`
  color: #a3a3a3;
  font-size: 13px;
  margin: 1px 0;
`;

/* 장르 */
export const PerformanceGenre = styled.div`
  color: #a3a3a3;
  font-size: 13px;
  margin: 3px 0;
`;

/* 상세1 */
export const PerformanceDetail1 = styled.div`
  color: #dbdbdb;
  font-size: 15px;
  margin: 3px 0;
`;

/* 상세2 */
export const PerformanceDetail2 = styled.div`
  color: #a3a3a3;
  font-size: 15px;
  margin: 3px 0;
`;

/* 상세3 */
export const PerformanceDetail3 = styled.div`
  color: #dbdbdb;
  font-size: 15px;
  margin: 3px 0;
`;
