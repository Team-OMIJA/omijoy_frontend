import styled from "@emotion/styled";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalBody = styled.div`
  position: relative;
  background: #121212;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  z-index: 10000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 16px 0;
  color: #ffffff;
`;

export const ModalInfoItem = styled.p`
  font-size: 0.9rem;
  color: #cccccc;
  margin: 8px 0;
  line-height: 1.5;
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
`;

export const ModalUrlButton = styled.button`
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  background-color: #333333;
  color: #eeeeee;

  &:hover {
    background-color: #444444;
  }

  &:disabled {
    background-color: #252525;
    color: #555555;
    cursor: not-allowed;
  }
`;

export const ModalKakaoDirectionsButton = styled.button`
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  background-color: #d4af37;
  color: #121212;

  &:hover {
    background-color: #c7a006;
  }
`;

export const ModalCloseXButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: #aaaaaa;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10001;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: #ffffff;
    transform: scale(1.1);
  }
`;

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
  /* =====포스터 밑 점 부분===== */
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

  .slick-dots li button:before {
    font-size: 12px !important; 
    color: #888888 !important;
  }
  .slick-dots li.slick-active button:before {
    font-size: 12px !important; 
    color: #e3002a !important; 
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
  background-color: #333333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: block;
  margin: 0 auto;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  }
`;
