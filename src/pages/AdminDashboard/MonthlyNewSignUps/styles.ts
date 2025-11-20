/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export const Card = styled.div`
  width: 100%;
  height: 600px;
  background-color: #111827;
  margin-top: 40x;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.03);
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #e0e0e0;
`;

/* Tooltip 박스 */
export const TooltipBox = styled.div`
  background-color: rgba(51, 65, 85, 0.95);
  backdrop-filter: blur(6px);
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #e2e8f0;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
`;

/* Tooltip 라벨(날짜) */
export const TooltipLabel = styled.div`
  margin-bottom: 6px;
  color: #93c5fd;
  font-weight: 500;
`;

/* Tooltip 값(가입자 수) */
export const TooltipValue = styled.div`
  font-weight: 600;
  color: #f1f5f9;
`;
