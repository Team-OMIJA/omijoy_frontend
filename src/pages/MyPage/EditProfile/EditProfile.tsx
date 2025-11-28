/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { Avatar } from "@mui/material";
import React, { useRef, useState } from "react";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { useFirebaseUpload } from "../../../hooks/useFirebaseUpload";
import axios from "axios";
import ImageCropModal from "./ImageCropModal/ImageCropModal";
import { instance } from "../../../apis/instance";
import { IoMdSettings } from "react-icons/io";

function EditProfile({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: () => void;
}) {
  const { uploadFile } = useFirebaseUpload();
  // 기본 상태 로딩(현재 저장된 프로필)
  const { principal, login } = usePrincipalState();
  const [username, setUsername] = useState(principal?.username || "");
  const [previewImg, setPreviewImg] = useState(principal?.profileImg || "");
  const [file, setFile] = useState<File | null>(null);

  const [isChanged, setIsChanged] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // 크롭 모달 상태
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 이미지 변경 시
  const fileOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 프로필 사진 선택
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // 이미지 파일을 미리보기용 URL로 변환
      const url = URL.createObjectURL(selectedFile);
      // 모달에 보낼 이미지
      // 모달에서 수정 후 이미지를 넘겨야하기 때문에 이렇게 처리
      setCropImageSrc(url);
      setCropModalOpen(true);

      // 이미지만 변경 해도 저장버튼 활성화
      setIsChanged(true);
    }
    // 동일한 파일을 다시 선택해도 onChange 일어나게 만들어줌
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // 크롭 완료 후 최종 파일 set
  const cropDoneHandler = (croppedFile: File) => {
    setFile(croppedFile);
    setPreviewImg(URL.createObjectURL(croppedFile)); // 미리보기
    setCropModalOpen(false);
  };

  // 저장
  const onSaveHandler = async () => {
    // 이미 요청 중이면 더이상 실행되지 않음
    if (isLoading) return;
    setIsLoading(true);

    try {
      // username 비어있으면 저장 막음
      if (!username || username.trim() === "") {
        alert("이름은 공백일 수 없습니다.");
        return;
      }

      // 저장 버튼 클릭
      let profileUrl = principal?.profileImg;

      if (file) {
        // 파일 업로드 시작 - 사용자가 이미지 크롭한게 들어감
        profileUrl = await uploadFile(file, "omijoy_storage/profile-img");
      }

      // axios patch 요청 전송
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/user/${principal?.id}`,
        {
          username,
          profileImg: profileUrl,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
            "Content-Type": "application/json",
          },
        }
      );

      // 전역 상태 업데이트 - 새 프로필 정보로 principal을 덮어씀
      login({
        ...principal!,
        username,
        profileImg: profileUrl,
      });

      alert("프로필이 수정되었습니다.");
      onSave();
    } catch (error) {
      console.error("❌ 에러 발생:", error);
      alert("프로필 수정 실패");
    } finally {
      // 완료 이후 다시 버튼 활성화
      setIsLoading(false);
    }
  };

  const usernameOnChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newUsername = e.target.value;

    // 앞뒤 공백 제거
    newUsername = newUsername.trim();
    setUsername(newUsername);

    // 중복여부 검사
    if (newUsername !== principal?.username) {
      try {
        const response = await instance.get("/user/check-username", {
          params: { username: newUsername },
        });

        if (response.data === true) {
          setUsernameError("이미 사용중인 이름입니다.");
          setIsUsernameValid(false);
        } else {
          setUsernameError("");
          setIsUsernameValid(true);
        }
      } catch (err) {
        console.error("중복 체크 실패 : ", err);
      }
    } else {
      setUsernameError("");
      setIsUsernameValid(true);
    }

    // 변경 여부 확인
    if (newUsername !== principal?.username || file) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
      // 이름은 다시 원래대로 돌아왔지만 이미지가 변경 되었다면
      if (!file) {
        setIsChanged(false);
      }
    }
  };

  return (
    <s.ProfileContainer>
      {/* 크롭 모달 - imgSrc는 null 일 수 없다 - 조건부 렌더링 */}
      {cropModalOpen && cropImageSrc && (
        <ImageCropModal
          open={cropModalOpen}
          imgSrc={cropImageSrc}
          onClose={() => setCropModalOpen(false)}
          onComplete={cropDoneHandler}
        />
      )}
      <s.AvatarWrapper>
        <Avatar
          src={previewImg || import.meta.env.VITE_PROFILE_DEFAULT_IMG}
          sx={{ width: 100, height: 100 }}
        />
        <s.EditLabel htmlFor="profile-upload">
          <IoMdSettings />
        </s.EditLabel>
        <input
          ref={inputRef}
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={fileOnChangeHandler}
          style={{ display: "none" }}
        />
      </s.AvatarWrapper>

      <s.UserInfo>
        <div css={s.inputWrapper}>
          <input
            type="text"
            value={username}
            placeholder={principal?.username}
            onChange={usernameOnChangeHandler}
            css={s.inputStyle}
          />
          {!isUsernameValid && (
            <span css={s.helperTextStyle}>{usernameError}</span>
          )}
        </div>
        <s.BtnContainer>
          <s.SaveBtn
            // 변경 내용이 없음 / 이름 중복됨 / 저장중일때
            disabled={!isChanged || !isUsernameValid || isLoading}
            onClick={onSaveHandler}
            // sx={{ marginRight: '3px' }}
          >
            {isLoading ? "저장" : "저장"}
          </s.SaveBtn>
          <s.CancelBtn
            onClick={onCancel}
          >
            취소
          </s.CancelBtn>
        </s.BtnContainer>
      </s.UserInfo>
    </s.ProfileContainer>
  );
}

export default EditProfile;
