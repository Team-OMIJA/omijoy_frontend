import styled from "@emotion/styled";

/* 페이지 전체 배경 */
export const PageBackground = styled.div`
  width: 100%;
  background-color: #121212;
  padding-bottom: 60px;
`;

/* 전체 컨테이너 */
export const Container = styled.div`
  display: flex;
  gap: 50px;
  padding: 30px;
  max-width: 1100px;
  margin: 0 auto;
  border-radius: 16px;
  background-color: #121212;
  position: relative;
  margin-top: 20px;
`;

/* 포스터 */
export const Poster = styled.img`
  width: 380px;
  height: 500px;
  border-radius: 12px;
  margin-top: 10px;
  margin-right: 10px;
  object-fit: cover;
`;

/* 오른쪽 섹션 */
export const Content = styled.div`
  flex: 1;
  color: #dbdbdb;
  position: relative;
`;

/* 제목 */
export const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: #dbdbdb;
  line-height: 1.3;
  padding-right: 60px;
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: normal;
`;

/* 2컬럼 레이아웃 추가 */
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 왼쪽 / 오른쪽 */
  column-gap: 50px;
  row-gap: 18px;
  margin-top: 20px;
`;

/* 정보 그룹 (왼쪽/오른쪽 각각 묶음) */
export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

/* 정보 섹션 */
export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.div`
  font-size: 16px;
  color: #b01c1c;
  font-weight: 600;
  margin-top: 14px;
`;

export const Value = styled.div`
  font-size: 17px;
  color: #dbdbdb;
  white-space: pre-line;
  font-weight: 400;
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: normal;
`;

/* 예매 버튼 */
export const TicketWrapper = styled.div`
  position: relative;
  margin-top: 20px;
  width: fit-content;
  margin-left: auto;
  margin-right: 210px;
`;

export const TicketButton = styled.button`
  width: 220px;
  height: 55px;
  background-color: #b01c1c;
  border: none;
  border-radius: 10px;
  color: #dbdbdb;
  font-size: 17px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #8f1515;
  }
`;

export const TicketDropdown = styled.div`
  position: absolute;
  top: 65px;
  right: 0;
  width: 210px;
  background-color: #1e1e1e;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 10;
`;

export const TicketLink = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #b01c1c;
  border: none;
  border-radius: 8px;
  color: #f3f3f3;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: #8f1515;
  }
`;

export const Divider = styled.hr`
  width: 100%;
  border: 1px solid #222;
  margin: 40px 0;
`;

export const DetailImage = styled.img`
  width: 100%;
  max-width: 800px;
  margin: 0 auto 40px;
  display: block;
`;

export const TopRightButtons = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 25px;
`;

export const HeartWrapper = styled.div`
  /* position: relative; */
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ScrapCountText = styled.p`
  /* position: absolute; */
  /* right: -4px;       */
  /* bottom: -6px;       */
  font-size: 1rem;
  color: #a3a3a3;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
`;

export const HeartIconButton = styled.div<{ liked: boolean }>`
  font-size: 28px;
  cursor: pointer;
  transition: 0.2s ease;
  color: ${(props) => (props.liked ? "red" : "#888")};
  &:hover {
    color: red;
    transform: scale(1.15);
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  gap: 8px;
`;

export const CheckIconStyle = styled.div`
  display: flex;
  align-items: center;

  svg {
    font-size: 22px;
    color: #b01c1c;
  }

  path {
    stroke: #b01c1c;
    stroke-width: 1.3;
  }
`;

export const CheckText = styled.div`
  color: #dbdbdb;
  font-weight: 400;
`;
