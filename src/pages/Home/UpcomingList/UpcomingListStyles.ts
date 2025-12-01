/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Carousel } from "@mantine/carousel";

export const StyledCarousel = styled(Carousel)`
  .mantine-Carousel-control {
    background: rgba(255, 255, 255, 0.28);
    border: none;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(8px);
    color: #fbfbfb;
  }
`;
