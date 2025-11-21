/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

// 전체 래퍼
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 상단 박스
export const TopBox = styled.div`
  display: flex;
  padding: 40px;
  border-radius: 16px;
  width: 75%;
  margin-right: 120px;
  margin-top: 25px;
  align-items: center;
  position: relative;
`;

// 포스터 이미지
export const Poster = styled.img`
  width: 400px;
  height: 500px;
  border-radius: 10px;
  object-fit: cover;
`;

// 오른쪽 텍스트 구역
export const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: -95px;
  margin-left: 100px;
  position: relative;
`;

// 제목
export const Title = styled.h1`
  position: absolute;
  margin-top: -210px;
`;

// 정보 텍스트 영역
export const InfoBox = styled.div`
  position: absolute;
  margin-top: -10px;
  line-height: 1;
`;

// 좋아요 아이콘
export const HeartButton = styled.div`
  position: absolute;
  top: 40px;
  right: -70px;
  font-size: 40px;
  color: crimson;
  cursor: pointer;
`;

// 예매 버튼
export const TicketButton = styled.button`
  position: absolute;
  bottom: 40px;
  right: -100px;
  padding: 0 30px;
  line-height: 60px;
  font-size: 23px;
  cursor: pointer;
  border-radius: 30px;
  background-color: black;
  color: white;
`;

// 구분선
export const Divider = styled.hr`
  width: 100%;
  border: 1px solid #ccc;
  margin: 50px 0;
`;

// 상세 이미지 영역
export const DetailImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DetailImg = styled.img`
  width: 100%;
  max-width: 800px;
`;
