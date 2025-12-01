/** @jsxImportSource @emotion/react */
import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";

export const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #0f0f0f;
  color: #e0e0e0;
  border-radius: 10px;
  padding: 32px;
  width: 100%;
  max-width: 650px;
  display: flex;
  gap: 32px;
  overflow-y: auto;

  &:focus {
    outline: none;
  }
`;

export const Poster = styled("img")`
  width: 200px;
  height: 280px;
  object-fit: cover;
  border-radius: 12px;
`;

export const InfoWrapper = styled(Box)`
  flex: 1;
  position: relative;
`;

export const TopRightButtons = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const HeartWrapper = styled(Box)`
  position: relative;
`;

export const ScrapCountText = styled(Typography)`
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: 600;
  color: #a3a3a3;
  white-space: nowrap;
`;

export const Title = styled(Typography)`
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 1.5rem;
  font-weight: bold;
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: normal;
  max-width: calc(100% - 100px);
`;

export const InfoText = styled(Typography)`
  color: #a3a3a3;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

export const PriceText = styled(Typography)`
  color: #a3a3a3;
  white-space: pre-line;
  font-size: 0.8rem;
`;

export const BottomButtons = styled(Box)`
  margin-top: 24px;
  display: flex;
  gap: 16px;
`;

export const DetailButton = styled(Button)`
  background-color: #3a3a3a;
  color: #dbdbdb;
  text-transform: none;
  border-radius: 5px;
  font-weight: 500;

  &:hover {
    background-color: #2c2c2c;
  }
`;

export const TicketButton = styled(Button)`
  background-color: #bf1c1c;
  color: #dbdbdb;
  padding-left: 24px;
  padding-right: 24px;
  text-transform: none;
  border-radius: 5px;
  font-weight: 500;

  &:hover {
    background-color: #9f1717;
  }
`;
