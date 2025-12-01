/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Typography, TypographyProps } from "@mui/material";

/* 전체 페이지 컨테이너 */
export const LoginPage = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 48px 16px 80px;
  background-color: #121212;
`;

/* 로그인 패널 박스 */
export const LoginPanel = styled.div`
  width: 100%;
  max-width: 420px;
  background: linear-gradient(135deg, #171717 0%, #1e1e1e 100%);
  border-radius: 15px;
  padding: 36px 32px 40px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
  color: #e0e0e0;

  @media (max-width: 480px) {
    padding: 28px 20px 32px;
  }
`;

/* 제목 */
export const LoginTitle = styled(Typography)<TypographyProps>`
  padding-bottom: 30px;
  font-weight: 400;
  text-align: center;
  color: #f5f5f5;
`;

/* 폼 래퍼 */
export const LoginForm = styled.div`
  margin-bottom: 24px;

  /* MUI TextField / Button 스타일 오버라이드 */
  .MuiTextField-root,
  .MuiButton-root {
    width: 100%;
  }

  .MuiOutlinedInput-root {
    background-color: #151515;
    border-radius: 12px;
    color: #f2f2f2;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: #2b2b2b !important;
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #5c7cfa !important;
  }

  .MuiInputLabel-root {
    color: #9c9c9c;
  }

  .MuiInputLabel-root.Mui-focused {
    color: #c6c6c6;
  }
`;

/* 로그인 버튼 */
export const LoginSubmitButton = styled.button`
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

/* 구분선 */
export const OAuthDivider = styled.div`
  position: relative;
  text-align: center;
  color: #858585;
  font-size: 0.85rem;
  margin: 12px 0;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background-color: #242424;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

/* SNS 텍스트 */
export const OAuthCaption = styled.p`
  margin: 8px 0 16px;
  font-size: 0.9rem;
  color: #b8b8b8;
  text-align: center;
`;

/* SNS 버튼 리스트 */
export const OAuthButtonList = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
`;

/* SNS 버튼 */
interface OAuthButtonProps {
  provider: "google" | "naver" | "kakao";
}

export const OAuthButton = styled.a<OAuthButtonProps>`
  flex: 1;
  height: 58px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  text-decoration: none;
  color: #f5f5f5;
  border: 1px solid #2d2d2d;
  background: #1a1a1a;
  transition: transform 0.15s ease, box-shadow 0.15s ease,
    border-color 0.15s ease;

  .oauth-icon {
    font-size: 1.35rem;
    font-weight: 700;
    color: ${({ provider }) =>
      provider === "google"
        ? "#7f9cff"
        : provider === "naver"
        ? "#4fd85c"
        : "#ffd54b"};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 18px rgba(0, 0, 0, 0.35);
    border-color: #3c3c3c;
  }
`;

/* 회원가입 버튼 */
export const SignupLink = styled.button`
  margin: 16px auto 0;
  display: block;
  background: none;
  border: none;
  color: #e0e0e0;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
    color: #ffffff;
  }
`;
