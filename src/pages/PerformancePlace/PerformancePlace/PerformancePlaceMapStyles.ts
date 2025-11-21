import styled from "@emotion/styled";

export const MapWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  touch-action: none;
  padding: 0;
  margin: 0;
  position: relative;
`;

export const MapContainer = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ErrorMessage = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  background: rgba(255, 255, 255, 0.95);
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  font-weight: bold;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin: 0;
  }
`;

export const MapLoadingPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #c5c5c5ff;
`;

// == 맵 줌 ==
export const MapTypeContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  left: auto;
  z-index: 10;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  pointer-events: auto;
`;

export const MapTypeButton = styled.button<{ active: boolean }>`
  padding: 8px 12px;
  font-size: 13px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  background: ${({ active }) => (active ? "#4285F4" : "white")};
  color: ${({ active }) => (active ? "white" : "#333")};
`;

export const MyLocationButton = styled.button`
  position: absolute;
  top: 70px;
  right: 20px;
  left: auto;
  width: 40px;
  height: 40px;
  color: #121212;
  background: rgb(255, 255, 255);
  border-radius: 4px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 0;
  pointer-events: auto;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const MyLocationButtonIcon = styled.div`
  width: 24px;
  height: 24px;
`;

export const MapZoomControlContainer = styled.div`
  position: absolute;
  bottom: 30px;
  right: 20px;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: row;
  pointer-events: auto;
`;

export const MapLevelLabel = styled.div`
  font-weight: bold;
  min-width: 50px;
  text-align: center;
  color: #555;
`;

export const CustomVSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 150px;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  padding: 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #4285f4;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
`;

// == 마커 클릭 시 공연 모달 ==
export const ModalPerformanceSection = styled.div`
  border-top: 1px solid #333;
  background-color: #121212;
  margin: 24px -24px -24px -24px;
  padding: 30px 24px 40px 24px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin-top: 24px;
`;

export const ModalSubTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 24px;
  color: #ffffff;
  padding-left: 15px;
  border-left: 5px solid #e3002a;
  line-height: 1.2;
`;

export const SliderContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-bottom: 20px;

  .slick-slide > div {
    padding: 0 8px;
    box-sizing: border-box;
  }

  .slick-prev,
  .slick-next {
    width: 40px !important;
    height: 40px !important;
    background-color: rgba(100, 100, 100, 0.5) !important;
    border-radius: 50% !important;
    z-index: 100 !important;
    transition: background-color 0.2s ease;
    display: flex !important;
    align-items: center;
    justify-content: center;
  }

  .slick-prev:hover,
  .slick-next:hover {
    background-color: rgba(100, 100, 100, 0.8) !important;
  }

  .slick-prev:before,
  .slick-next:before {
    content: "" !important;
    display: block !important;
    width: 10px !important;
    height: 10px !important;
    border-top: 2px solid #fff !important;
    border-right: 2px solid #fff !important;
    background: transparent !important;
    opacity: 1 !important;
    font-family: inherit !important;
  }

  .slick-prev:before {
    transform: rotate(-135deg);
    margin-left: 5px;
  }
  .slick-next:before {
    transform: rotate(45deg);
    margin-right: 5px;
  }

  .slick-prev {
    left: -15px !important;
  }
  .slick-next {
    right: -15px !important;
  }

  .slick-dots li {
    margin: 0 5px;
  }
  .slick-dots li button:before {
    font-size: 14px !important;
    color: #888888 !important;
    opacity: 0.5 !important;
  }
  .slick-dots li.slick-active button:before {
    color: #e3002a !important;
    opacity: 1 !important;
  }
`;

export const ModalPerformanceItem = styled.div`
  text-align: center;
  outline: none;
  display: block;
  width: 100%;
  cursor: pointer;
`;

export const ModalPosterImage = styled.img`
  width: 100%;
  max-width: 120px;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
  background-color: #333333; /* 이미지 로딩 전 배경: 다크 그레이 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: block;
  margin: 0 auto;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  }
`;
