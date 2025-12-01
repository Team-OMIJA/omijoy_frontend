import styled from "@emotion/styled";
import { PiMagnifyingGlass, PiXCircle } from "react-icons/pi";
import { GrClose } from "react-icons/gr";

export const PerformanceListFullBox = styled.div`
  width: 100%;
  padding: 0px 60px;
  box-sizing: border-box;
  background: #121212; 
`;

export const PerformanceListSubBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  position: sticky;
  top: 65px;
  background: #121212;
  z-index: 100;

  &::before {
    content: "";
    display: block;
    height: 30px; 
    background: #121212;
  }
`;

export const PerformanceListTopRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const PerformanceListDropdownWrapper = styled.div<{ open?: boolean }>`
  position: relative;
  display: inline-block;
  border-radius: 10px;
  border: 1px solid #ccc;
  min-width: 120px;
`;

export const PerformanceListDropdownButton = styled.div<{ open?: boolean }>`
  background-color: #fbfbfb;
  color: #777;
  padding: 8px 12px;
  border-radius: ${({ open }) => (open ? "10px 10px 0 0" : "10px")};
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:after {
    content: "▼";
    margin-left: 8px;
    font-size: 12px;
    transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.2s;
  }
`;

  export const PerformanceListGenreDropdownButton = styled(PerformanceListDropdownButton)`
    width: 200px;
  `;

export const PerformanceListDropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fbfbfb;
  border-radius: 0 0 10px 10px;
  border: 1px solid #ccc;
  border-top: none;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`;

export const PerformanceListDropdownItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: #f0f0f0;
  }
`;

export const PerformanceListResetButton = styled.div`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #f0f0f0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 10px;
    height: 10px;
  }
`;

export const PerformanceListSearchWrapper = styled.div`
  position: relative;
  margin-left: auto;
`;

export const PerformanceListSearchInput = styled.input<{ open?: boolean }>`
  background-color: #fbfbfb;
  padding: 8px 36px 8px 24px;
  width: ${({ open }) => (open ? "250px" : "0")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  border-radius: 10px;
  border: 2px solid #ccc;
  outline: none;
  box-sizing: border-box;
  transition: width 0.3s, opacity 0.3s;
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
`;

export const PerformanceListSearchIcon = styled(PiMagnifyingGlass)`
  position: absolute;
  right: 10px;
  top: 13px;
  color: grey;
  cursor: pointer;
`;

export const PerformanceListClearIcon = styled(GrClose)`
  position: absolute;
  right: 40px;
  top: 16px;
  color: grey;
  cursor: pointer;
`;

export const PerformanceListErrorMessage = styled.div`
  color: white;
  marginTop: 20px;
`;


export const PerformanceListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 30px;
`;

export const PerformanceListCard = styled.div`
  text-align: left;
  padding: 5px;
  border-radius: 14px;
`;

export const PerformanceListClickableWrapper = styled.div`
  cursor: pointer;
  position: relative;
`;

/* 공연장 */
export const PerformanceListPlaceFilter = styled.div`
  color: #dbdbdb;
  font-size: 14px;
  margin: 2px 0;
`;

export const PerformanceListPlaceInner = styled.div`
  margin-left: 10px;
`;

export const PerformanceListPlaceLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const PerformanceListPlaceDetail = styled.div`
  color: #dbdbdb;
  font-size: 13px;
  margin: 2px 0;
  wordBreak: "keep-all";
  overflowWrap: "break-word";
  whiteSpace: "normal";
`;

/* 기간 */
export const PerformanceListPeriod = styled.div`
  color: #a3a3a3;
  font-size: 13px;
  margin: 1px 0;
`;

export const PerformanceListPosterImg = styled.div`
  width: 100%;
  height: 260px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 30px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;

/* 상세1 */
export const PerformanceListName = styled.h4`
  color: #dbdbdb;
  font-size: 15px;
  font-weight: 600;
  margin: 3px 0 4px 0;
  line-height: 1.4;
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: normal;
  cursor: pointer;
`;


/* 상세2 */
export const PerformanceListPlace = styled.div`
  color: #a3a3a3;
  font-size: 15px;
  margin: 3px 0;
`;

export const PerformanceListGenreNm = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 12px;
  z-index: 2;
  pointer-events: none;
`;

export const PerformanceListAreaFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const PerformanceListGenreFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 25px;
`;

export const PerformanceListAreaFilterItem = styled.div`
  color: #dbdbdb;
  display: flex;
  align-items: center;
  background: #3a3a3a;
  border-radius: 16px;
  padding: 4px 8px;
`;

export const PerformanceListAreaFilterRemove = styled(PiXCircle)`
  margin-left: 6px;
  cursor: pointer;
`;

export const PerformanceListGenreFilterItem = styled.div`
  color: #dbdbdb;
  display: flex;
  align-items: center;
  background: #3a3a3a;
  border-radius: 16px;
  padding: 4px 8px;
`;

export const PerformanceListGenreFilterRemove = styled(PiXCircle)`
  margin-left: 6px;
  cursor: pointer;
`;