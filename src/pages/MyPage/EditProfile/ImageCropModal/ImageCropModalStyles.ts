/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

// 모달 컨테이너
export const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  height: 420px;
  background-color: #121212;
  border-radius: 3px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;
`;

// 크롭 영역 Wrapper
export const CropWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

// 완료 버튼
export const DoneButton = styled.button`
  margin-top: 12px;
  margin-left: 250px;
  padding: 8px 18px;

  background-color: #181818ff;
  color: #fefefeff;

  border: none;
  border-radius: 20px;
  cursor: pointer;
  z-index: 9999;

  &:hover {
    background-color: #2f2f2fff;
  }
`;
