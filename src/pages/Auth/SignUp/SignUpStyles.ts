/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Typography, TypographyProps } from "@mui/material";

// 전체 페이지 컨테이너
export const SignupPage = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 48px 16px 80px;
  background-color: #121212;
`;

// 회원가입 패널 박스
export const SignupPanel = styled.div`
  width: 100%;
  max-width: 440px;
  background: linear-gradient(135deg, #171717 0%, #1f1f1f 100%);
  border-radius: 20px;
  padding: 40px 36px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
  color: #f2f2f2;
  border: 1px solid rgba(255, 255, 255, 0.04);
  @media (max-width: 480px) {
    padding: 28px 20px 32px;
  }
`;

// 제목
export const SignupTitle = styled(Typography)<TypographyProps>`
  font-weight: 400;
  text-align: center;
  color: #f5f5f5;
`;

// 회원가입 소개글
export const SignupCaption = styled.p`
  margin: 10px 0 28px;
  font-size: 0.8rem;
  color: #c3c3c3;
  text-align: center;
  line-height: 1.45;
`;

// 회원가입 버튼
export const SignupSubmitButton = styled.button`
  background: linear-gradient(90deg, #dc143c, #88021d);
  border: none !important;
  color: #fff !important;
  font-weight: 450;
  font-size: 0.9rem;
  border-radius: 3px;
  text-transform: none;
  padding: 6.5px 0;
  cursor: pointer;

  &:hover {
    background: linear-gradient(90deg, #b31131, #5c0214);
  }
`;

// 회원가입 정보 입력 input
export const SigupForm = styled.div`
  /* MUI TextField / Button 스타일 오버라이드 */
  .MuiTextField-root,
  .MuiButton-root {
    width: 100%;
  }

  .MuiOutlinedInput-root {
    background-color: #181818;
    border-radius: 12px;
    color: #f4f4f4;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: #2a2a2a !important;
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #5c7cfa !important;
  }

  .MuiInputLabel-root {
    color: #9c9c9c;
  }

  .MuiFormLabel-root.Mui-error {
    color: #ff4d4f;
  }

  .MuiInputLabel-root.Mui-focused {
    color: #d0d0d0;
  }
`;

// 이미 계정이 있는 회원 로그인 화면으로 보내는 버튼
export const SignupLinkButton = styled.button`
  margin: 18px auto 0;
  display: block;
  background: none;
  border: none;
  color: #e0e0e0;
  font-size: 0.8rem;
  cursor: pointer;
  text-align: center;
  text-decoration: underline;
`;
