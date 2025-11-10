/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { Avatar, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { useFirebaseUpload } from "../../../hooks/useFirebaseUpload";
import axios from "axios";
import { useAuthState } from "../../../stores/useAuthState";

function EditProfile({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: () => void;
}) {
  // const { principal, login } = usePrincipalState();

  const { uploadFile } = useFirebaseUpload();
  const { principal, login } = usePrincipalState();
  const [username, setUsername] = useState(principal?.username || "");
  const [previewImg, setPreviewImg] = useState(principal?.profileImg || "");
  const [file, setFile] = useState<File | null>(null);

  // 이미지 변경 시
  const fileOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewImg(URL.createObjectURL(selectedFile));
    }
  };

  // 저장
  const onSaveHandler = async () => {
    try {
      console.log("1️⃣ 저장 버튼 클릭됨");
      let profileUrl = principal?.profileImg;

      if (file) {
        console.log("2️⃣ 파일 업로드 시작");
        profileUrl = await uploadFile(file, "omijoy_storage/profile-img");
        console.log("3️⃣ 업로드 완료:", profileUrl);
      }

      console.log("4️⃣ 서버 패치 요청 전송");
      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/users/${principal?.id}`,
        { username, profileImg: profileUrl }
      );
      console.log("5️⃣ 서버 응답:", res);

      login({
        ...principal!,
        username,
        profileImg: profileUrl,
      });

      alert("프로필이 수정되었습니다!");
      onSave();
    } catch (error) {
      console.error("❌ 에러 발생:", error);
      alert("프로필 수정 실패");
    }
  };

  return (
    <s.ProfileContainer>
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

      <s.UserInfo>
        <TextField
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          css={s.textFieldStyle}
        />
        <s.BtnContainer>
          <Button
            variant="outlined"
            size="small"
            onClick={onSaveHandler}
            sx={{ marginRight: "3px" }}
          >
            저장
          </Button>
          <Button variant="outlined" size="small" onClick={onCancel}>
            취소
          </Button>
        </s.BtnContainer>
      </s.UserInfo>
    </s.ProfileContainer>
  );
}

export default EditProfile;
