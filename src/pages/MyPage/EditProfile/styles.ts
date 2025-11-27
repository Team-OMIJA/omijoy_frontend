/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

// 전체 영역: 가로 배치, 그림자 없음
export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  min-height: 300px;
  width: 100%;
  max-width: 1450px;
  border-radius: 20px;
  margin-top: 5rem;
  padding: 2rem 7rem;
  /* background-color: #121212; */
  background-color: #151515;
`;

// 프로필 이미지
export const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 아이콘 (중앙정렬 시키기)
export const EditLabel = styled.label`
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: #4b4b4bff;
  color: #fff;
  border-radius: 50%;
  width: 26px;
  height: 26px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #202020ff;
  }
`;

// 오른쪽 영역 (닉네임 + 저장 버튼)
export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 11px;
`;

export const SaveBtn = styled.button`
  margin-left: 3px;
  width: 60px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2b2b2b;
  border: none;
  border-radius: 8px;
  color: #dbdbdb;
  font-size: 15px;
  cursor: pointer;
  font-weight: 470;
  transition: 0.2s ease;

  &:hover {
    background-color: #222222ff;
  }

  /* disabled 상태 스타일 */
  &:disabled {
    background-color: #565656; /* 비활성화 배경색 */
    color: #cccccc; /* 비활성화 텍스트색 */
    cursor: not-allowed; /* 마우스 커서 변경 */
    opacity: 0.6; /* 조금 흐려보이게 */
  }
`;

// 취소버튼
export const CancelBtn = styled.button`
  width: 60px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b01c1c;
  border: none;
  border-radius: 8px;
  color: #dbdbdb;
  font-size: 15px;
  cursor: pointer;
  font-weight: 470;
  transition: 0.2s ease;
  margin-left: 0.5rem;

  &:hover {
    background-color: #8f1515;
  }
`;


export const inputWrapper = css`
  display: flex;
  flex-direction: column;
`;

export const inputStyle = css`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #1a1a1a;
  color: #dbdbdb;
  font-size: 1.6rem;
  /* font-weight: 500; */
  transition: 0.2s ease;

  &:focus {
    outline: none;
    border-color: #919191ff;
  }

  &::placeholder {
    color: #777;
  }

  /* 비활성화, 에러 등 원하는 추가 스타일도 가능 */
`;

export const helperTextStyle = css`
  color: #ff6b6b;
  font-size: 13px;
  margin-top: 6px;
`;
