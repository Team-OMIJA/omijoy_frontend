/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

// 전체 영역: 가로 배치, 그림자 없음
export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  min-height: 160px;
  width: 100%;
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem 2.5rem;
    /* background-color: #121212; */
    background-color: #8e8e8eff ;
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
  margin-top: 8px;
`;
export const SaveBtn = styled.button`
  margin-left: 3px;
`;

export const CancelBtn = styled.button``;

export const textFieldStyle = css`
  width: 200px;
  background-color: #f5f5f5;
  border-radius: 8px;

  .MuiOutlinedInput-root {
    fieldset {
      border-color: #ccc;
    }
    &:hover fieldset {
      border-color: #888;
    }
    &.Mui-focused fieldset {
      border-color: #555;
    }
  }

  .MuiInputBase-input {
    font-size: 1rem;
    font-weight: 500;
    color: #747474ff;
    padding: 9px 12px;
  }
`;
