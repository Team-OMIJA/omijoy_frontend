import styled from "@emotion/styled";

export const KakaoMapContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 65px);
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

export const KakaoMapDiv = styled.div`
  width: 100%;
  height: 100%;
  touch-action: none;
`;

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
