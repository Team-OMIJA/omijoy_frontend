/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { Avatar, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { useFirebaseUpload } from "../../../hooks/useFirebaseUpload";
import axios from "axios";

function EditProfile() {
  const { principal } = usePrincipalState();
  const { uploadFile } = useFirebaseUpload();

  const [username, setUsername] = useState(principal?.username || "");
  const [previewImg, setPreviewImg] = useState(principal?.profileImg || "");
  const [file, setFile] = useState<File | null>(null);

  // 🔹 이미지 변경 시
  const fileOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewImg(URL.createObjectURL(selectedFile));
    }
  };

  // 🔹 저장
  const handleSave = async () => {
    try {
      let profileUrl = principal?.profileImg;
      if (file) profileUrl = await uploadFile(file, "omijoy_storage/profile-img");

      await axios.patch(`${import.meta.env.VITE_API_BASE_URL}users/${principal?.id}`, {
        username,
        profileImg: profileUrl,
      });

      alert("프로필이 수정되었습니다!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("프로필 수정 실패");
    }
  };

  return (
    <s.ProfileContainer>
      {/* 🔸 왼쪽 아바타 */}
      <s.AvatarWrapper>
        <Avatar
          src={previewImg || import.meta.env.VITE_PROFILE_DEFAULT_IMG}
          sx={{ width: 100, height: 100 }}
        />
        <s.EditLabel htmlFor="profile-upload">✎</s.EditLabel>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={fileOnChangeHandler}
          style={{ display: "none" }}
        />
      </s.AvatarWrapper>

      {/* 🔸 오른쪽 입력 + 저장 */}
      <s.UserInfo>
        <TextField
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          inputProps={{
            style: {
              fontSize: "1.2rem",
              fontWeight: 500,
              color: "#222",
            },
          }}
          sx={{ width: "200px" }}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={handleSave}
          sx={{
            marginTop: "8px",
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          저장
        </Button>
      </s.UserInfo>
    </s.ProfileContainer>
  );
}

export default EditProfile;
