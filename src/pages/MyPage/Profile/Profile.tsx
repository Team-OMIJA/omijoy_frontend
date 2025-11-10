import { useState } from "react";
import ProfileLayout from "../ProfileLayout/ProfileLayout";
import EditProfile from "../EditProfile/EditProfile";
import ProfileView from "../ProfileView/ProfileView";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { useAuthState } from "../../../stores/useAuthState";

function Profile() {
  // const { principal } = usePrincipalState();
  const [isEditing, setIsEditing] = useState(false);
     const { isAuthenticated} = useAuthState();

  if (!isAuthenticated) return <div>Loading...</div>;

  if (!isEditing) {
    return (
      <ProfileLayout>
        <ProfileView onEdit={() => setIsEditing(true)} />
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      <EditProfile
        onCancel={() => setIsEditing(false)}
        onSave={() => setIsEditing(false)}
      />
    </ProfileLayout>
  );
}

export default Profile;
