import ScrapTop10List from "../AdminDashboard/ScrapTop10List/ScrapTop10List";
import AwardRecommendList from "./AwardRecommendList/AwardRecommendList";
import TopRankList from "./TopRankList/TopRankList";
import UpcomingList from "./UpcomingList/UpcomingList";

function Home() {
  return (
    <>
      <TopRankList />
      <AwardRecommendList />
      <UpcomingList />
      <ScrapTop10List />
    </>
  );
}

export default Home;
