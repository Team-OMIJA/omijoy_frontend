import FavoriteList from './FavoriteList/FavoriteList';
import Flaglist from './Flaglist/Flaglist';
import Profile from './Profile/Profile';
import { MantineProvider } from '@mantine/core';

function MyPage() {
  return (
    <>
      <Profile />
      {/* <EditProfile /> */}
      <MantineProvider>
        <FavoriteList />
         <Flaglist />
      </MantineProvider>
     
    </>
  );
}

export default MyPage;
