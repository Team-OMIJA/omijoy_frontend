import styled from "@emotion/styled";

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 420px;
  background: #2b2b2b;
  z-index: 2000;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  box-shadow: ${({ isOpen }) =>
    isOpen ? "4px 0 10px rgba(0,0,0,0.3)" : "none"};
  display: flex;
  flex-direction: column;
`;

export const SidebarToggleButton = styled.button`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 50px;
  background: #2b2b2b;
  border: 1px solid #444;
  border-left: none;
  border-radius: 0 6px 6px 0;
  color: #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 2001;
  outline: none;

  &:hover {
    background-color: #444;
    color: white;
  }
`;

export const SidebarHeader = styled.div`
  flex-shrink: 0;
  height: 60px;
  padding: 0 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: white;
  border-bottom: 1px solid #444;
  background-color: #252525;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SidebarContent = styled.div`
  flex: 0 1 auto;
  overflow-y: auto;
  min-height: 0;
  padding: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const SidebarFooter = styled.div`
  flex-shrink: 0;
  padding: 15px 20px;
  border-top: 1px solid #444;
  background-color: #252525;
  z-index: 10;
`;

export const FilterSection = styled.div`
  margin-bottom: 25px;
`;

export const SectionTitle = styled.h3`
  font-size: 14px;
  color: #d1d1d1;
  margin-bottom: 12px;
  font-weight: bold;
  border-left: 3px solid #af1c1c;
  padding-left: 8px;
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
`;

export const FilterButton = styled.button<{ active?: boolean }>`
  padding: 6px 0;
  background: ${({ active }) => (active ? "#a91c1c" : "#3a3a3a")};
  border: 1px solid ${({ active }) => (active ? "#a91c1c" : "#444")};
  border-radius: 4px;
  font-size: 11px;
  color: ${({ active }) => (active ? "#dbdbdb" : "#ccc")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: ${({ active }) => (active ? "#a11717" : "#505050")};
    color: white;
  }
`;

export const ApplyButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #af1c1c;
  color: #dbdbdb;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  letter-spacing: 1px;

  &:hover {
    background-color: #9f1717;
  }
`;
