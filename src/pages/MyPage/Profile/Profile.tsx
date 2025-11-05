import { Avatar } from "@mui/material";
import { useState } from "react";
import ProfileLayout from "../ProfileLayout/ProfileLayout";
import EditProfile from "../EditProfile/EditProfile";
import ProfileView from "../ProfileView/ProfileView";

function Profile() {
  const [isEditing, setisEditing] = useState(false);

  return (
    <>
      <ProfileLayout>
        {isEditing ? <EditProfile /> : <ProfileView />}
      </ProfileLayout>
    </>
  );
}

export default Profile;
