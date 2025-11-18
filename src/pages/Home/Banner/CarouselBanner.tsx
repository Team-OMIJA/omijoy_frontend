import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Box } from "@mui/material";

import Top1Favorite from "./Top1Favorite";
import KidsNewPerformances from "./KidsNewPerformances";

function CarouselBanner() {
  const autoplay = useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
    })
  );

  const components = [<Top1Favorite />, <KidsNewPerformances />];

  const slides = components.map((component, index) => (
    <Carousel.Slide key={index}>
      <Box sx={{ height: "370px", marginTop: "40px", marginBottom: "50px" }}>
        {component}
      </Box>
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="100%"
      plugins={[autoplay.current]}
      emblaOptions={{ align: "start", slidesToScroll: 1 }}
    >
      {slides}
    </Carousel>
  );
}

export default CarouselBanner;
