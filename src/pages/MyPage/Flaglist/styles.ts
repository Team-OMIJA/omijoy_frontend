/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  margin-top: 50px;
  padding: 40px 0px;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
`;

export const Title = styled.h2`
  font-size: 1.8em;
  font-weight: 700;
  margin-bottom: 25px;
  color: #e0e0e0;
`;

// 공연 스크랩 없을 시
export const Empty = styled.div`
  font-size: 16px;
  text-align: center;
  padding: 40px 0;
  color: #e0e0e0;
`;

// 로딩 중
export const Loading = styled.div`
  font-size: 16px;
  text-align: center;
  padding: 40px 0;
`;


// 공연장 정보 리스트
export const Card = styled.li`
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

export const PlaceName = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
  color: #ddddddff;
`;

export const Address = styled.div`
  font-size: 14px;
  color: #d0d0d0ff;
`;

// 5 * 3 그리드
export const SlideGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 20px;
  padding: 10px 0;
`;

