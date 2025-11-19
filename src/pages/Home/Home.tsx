import AwardRecommendList from "./AwardRecommendList/AwardRecommendList";
import TopRankList from "./TopRankList/TopRankList";
import UpcomingList from "./UpcomingList/UpcomingList";
import CarouselBanner from "./Banner/CarouselBanner";
import { MantineProvider } from "@mantine/core";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

function Home() {
  return (
    <>
      <MantineProvider>
        <CarouselBanner />
        <TopRankList />
      </MantineProvider>

      <AwardRecommendList />

      <MantineProvider>
        <UpcomingList />
      </MantineProvider>

      <AdminDashboard />
    </>
  );
}

export default Home;
