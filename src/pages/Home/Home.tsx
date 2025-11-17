import MonthlyNewSignUps from "../AdminDashboard/MonthlyNewSignUps/MonthlyNewSignUps";
import ScrapTop10List from "../AdminDashboard/ScrapTop10List/ScrapTop10List";
import AwardRecommendList from "./AwardRecommendList/AwardRecommendList";
import TopRankList from "./TopRankList/TopRankList";
import UpcomingList from "./UpcomingList/UpcomingList";
import CarouselBanner from "./Banner/CarouselBanner";
import { MantineProvider } from "@mantine/core";
import Top1Favorite from "./Banner/Top1Favorite";
import KidsNewPerformances from "./Banner/KidsNewPerformances";

function Home() {
  return (
    <>
      <MantineProvider>
        <CarouselBanner />
      </MantineProvider>
      {/* <Top1Favorite />
      <KidsNewPerformances /> */}
      <TopRankList />
      <AwardRecommendList />
      <UpcomingList />
      <ScrapTop10List />
      <MonthlyNewSignUps />
    </>
  );
}

export default Home;
