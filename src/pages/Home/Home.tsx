import AwardRecommendList from "./AwardRecommendList/AwardRecommendList";
import TopRankList from "./TopRankList/TopRankList";
import UpcomingList from "./UpcomingList/UpcomingList";

function Home() {
  return (
    <>
      <TopRankList />
      <AwardRecommendList />
      <UpcomingList />
    </>
  );
}

export default Home;
