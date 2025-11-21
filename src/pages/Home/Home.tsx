import AwardRecommendList from "./AwardRecommendList/AwardRecommendList";
import TopRankList from "./TopRankList/TopRankList";
import UpcomingList from "./UpcomingList/UpcomingList";
import CarouselBanner from "./Banner/CarouselBanner";
import { MantineProvider } from "@mantine/core";

function Home() {
  return (
    <>
      <MantineProvider>
        <CarouselBanner />
        <TopRankList />
        <AwardRecommendList />
        <UpcomingList />
      </MantineProvider>
    </>
  );
}

export default Home;
