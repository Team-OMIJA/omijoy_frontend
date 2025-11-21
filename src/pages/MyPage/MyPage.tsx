import EditProfile from "./EditProfile/EditProfile";
import FavoriteList from "./FavoriteList/FavoriteList";
import Flaglist from "./Flaglist/Flaglist";
import Profile from "./Profile/Profile";

function MyPage() {
  return (
    <>
      <Profile />
      {/* <EditProfile /> */}
      <FavoriteList />
      <Flaglist />
    </>
  );
}

export default MyPage;
