import styled from "@emotion/styled";

export const DropdownWrapper = styled.div<{ open?: boolean }>`
  position: relative;
  display: inline-block;
  border-radius: 10px;
  border: 1px solid #ccc;
  min-width: 120px;
`;

export const DropdownButton = styled.div<{ open?: boolean }>`
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

export const DropdownList = styled.ul`
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

export const DropdownItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: #f0f0f0;
  }
`;