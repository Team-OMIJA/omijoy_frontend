import MonthlyNewSignUps from "../AdminDashboard/MonthlyNewSignUps/MonthlyNewSignUps";
import ScrapTop10List from "../AdminDashboard/ScrapTop10List/ScrapTop10List";
import AwardRecommendList from "./AwardRecommendList/AwardRecommendList";
import TopRankList from "./TopRankList/TopRankList";
import UpcomingList from "./UpcomingList/UpcomingList";
import Banner from "./Banner/Banner";

function Home() {
  return (
    <>
      <Banner />
      <TopRankList />
      <AwardRecommendList />
      <UpcomingList />
      <ScrapTop10List />
      <MonthlyNewSignUps />
    </>
  );
}

export default Home;
