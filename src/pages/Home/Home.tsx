import NearbyRankList from "./NearbyRankList/NearbyRankList";
import TopRankList from "./TopRankList/TopRankList";
import UpcomingList from "./UpcomingList/UpcomingList";

function Home() {
  return (
    <>
      <TopRankList />
      <NearbyRankList />
      <UpcomingList />
    </>
  );
}

export default Home;
