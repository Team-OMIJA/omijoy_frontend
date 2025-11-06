import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { useFirebaseUpload } from "../../../hooks/useFirebaseUpload";
import axios from "axios";

function EditProfile() {
  const { principal } = usePrincipalState();
  const { uploadFile, isUploading, progress } = useFirebaseUpload();

  const [username, setUsername] = useState(principal?.username || "");
  const [previewImg, setPreviewImg] = useState(principal?.profileImg || "");
  const [file, setfile] = useState<File | null>(null);

  const fileOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setfile(selectedFile);
      setPreviewImg(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = async () => {
    try {
      // 나중에 값이 바뀔 가능성이 있기 때문에 let 사용
      let profileUrl = principal?.profileImg;

      if (file) {
        profileUrl = await uploadFile(file, "profile-img");
      }

      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}users/${principal?.id}`,
        {
          username,
          profileImg: profileUrl,
        }
      );

      alert("프로필이 수정되었습니다!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("프로필 수정 실패");
    }
  };
  return (

    <div>

     <img
        src={previewImg || "/default-profile.png"}
        alt="profile"
        style={{ width: 120, height: 120, borderRadius: "50%" }}
      />
      <input type="file" accept="image/*" onChange={fileOnChangeHandler} />

      {isUploading && <p>업로드 중... {progress}%</p>}

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={handleSave}>저장</button>

    </div>
  );
}

export default EditProfile;
