import MonthlyNewSignUps from "../AdminDashboard/MonthlyNewSignUps/MonthlyNewSignUps";
import ScrapTop10List from "../AdminDashboard/ScrapTop10List/ScrapTop10List";
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
      </MantineProvider>

      <TopRankList />
      <AwardRecommendList />

      <MantineProvider>
        <UpcomingList />
      </MantineProvider>

      <ScrapTop10List />
      <MonthlyNewSignUps />
    </>
  );
}

export default Home;
