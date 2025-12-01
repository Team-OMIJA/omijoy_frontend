/** @jsxImportSource @emotion/react */
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
  /* margin: 0 2rem auto  0 0; */
  margin-top: 5rem;
  padding: 2rem 7rem;

  background-color: #151515;
`;

// 프로필 이미지
export const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

//  아이콘
export const EditLabel = styled.label`
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: #1e1e1eff;
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
    background: #4e4e4eff;
  }
`;

// 유저명 + 수정버튼 + 이메일
export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// 유저 이름
export const Username = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  color: #e0e0e0;
  margin: 0px;
`;
// 유저 이메일
export const Email = styled.p`
  font-size: 1rem;
  color: #8e8e8e;
  margin: 0px;
  padding-bottom: 5px;
`;


// 유저명 - 수정버튼 컨테이너
export const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 이름과 버튼 사이 간격 */
`;

// 수정 버튼
export const EditBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 6px;
  margin-top: 6px;
  background-color: #b01c1c;
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
    background-color: #8f1515;
  }
`;
