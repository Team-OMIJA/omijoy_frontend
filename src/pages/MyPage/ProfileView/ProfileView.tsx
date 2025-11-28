/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { Avatar } from "@mui/material";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { IoMdSettings } from "react-icons/io";

interface ProfileViewProps {
  onEdit: () => void;
}

// 프로필 일반 화면
function ProfileView({ onEdit }: ProfileViewProps) {
  const { principal } = usePrincipalState();

  return (
    <s.ProfileContainer>
      <s.AvatarWrapper>
        <Avatar
          src={
            principal?.profileImg || import.meta.env.VITE_PROFILE_DEFAULT_IMG
          }
          sx={{ width: 100, height: 100 }}
        />
      </s.AvatarWrapper>

      <s.UserInfo>
        <s.UsernameRow>
          <s.Username>{principal?.username}</s.Username>
          <s.EditBtn onClick={onEdit}>
            <IoMdSettings />
          </s.EditBtn>
        </s.UsernameRow>
        <s.Email>{principal?.email}</s.Email>
      </s.UserInfo>
    </s.ProfileContainer>
  );
}

export default ProfileView;
