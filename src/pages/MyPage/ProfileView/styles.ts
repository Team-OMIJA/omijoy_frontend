/** @jsxImportSource @emotion/react */
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

  background-color: #ffffffff;
  border-bottom: 1px solid #eee;
`;

// 프로필 이미지
export const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// ✎ 아이콘
export const EditLabel = styled.label`
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: #1976d2;
  color: #fff;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #125aaa;
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
`