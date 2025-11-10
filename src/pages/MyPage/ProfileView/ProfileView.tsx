/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { Avatar, Button } from "@mui/material";
import { usePrincipalState } from "../../../stores/usePrincipalState";

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
          src={principal?.profileImg || import.meta.env.VITE_PROFILE_DEFAULT_IMG}
          sx={{ width: 100, height: 100 }}
        />
      </s.AvatarWrapper>

      <s.UserInfo>
        <p
          css={{
            fontSize: "1.2rem",
            fontWeight: 500,
            color: "#222",
            marginBottom: "8px",
          }}
        >
          {principal?.username}
        </p>

        <Button
          variant="outlined"
          size="small"
          onClick={onEdit}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            padding: "4px 16px",
          }}
        >
          프로필 수정
        </Button>
      </s.UserInfo>
    </s.ProfileContainer>
  );
}

export default ProfileView;
