/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export const Card = styled.div`
  width: 50%;
  height: 650px;
  background-color: #111827;
  margin-top: 40px;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.03);
  color: #e0e0e0;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #e0e0e0;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const Thead = styled.thead`
  background: #1e293b;
  color: #cbd5e1;

  & th {
    padding: 12px 16px;
    font-size: 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

export const Tbody = styled.tbody`
  & tr {
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    transition: 0.2s;
  }

  & tr:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  & td {
    padding: 12px 16px;
    color: #cbd5e1;
    font-size: 14px;
  }
`;
