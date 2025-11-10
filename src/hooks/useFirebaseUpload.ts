import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../configs/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const useFirebaseUpload = () => {
  // 기본 상태 정의

  // 업로드 진행률
  const [progress, setProgress] = useState<number>(0);
  // 업로드 완료 -> firebase가 반환하는 실제 링크
  // 업로드 URL이 아직 없을 수도 있고, 생기면 문자열일 수도 있다
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  // 업로드 중 발생한 에러
  const [error, setError] = useState<Error | null>(null);
  // 업로드 중인지-아닌지
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // 파일 객체와 폴더 이름을 받아서 업로드 후 URL을 반환하는 비동기 함수
  const uploadFile = async (file: File, folder: string): Promise<string> => {
    // Promise로 감싸서 업로드 끝날 때 (승인 -> url /반려 -> 에러)
    return new Promise((resolve, reject) => {
      // 파일이나 폴더가 비어있으면 업로드 X 에러 발생시킴
      if (!file || !folder) {
        reject(new Error("파일이나 폴더가 지정되지 않았습니다."));
        return;
      }

      // 업로드가 시작됐음 표시
      setIsUploading(true);
      // 이전 업로드 진행률 및 에러값, url 초기화
      setProgress(0);
      setError(null);
      setDownloadUrl(null);

      // uuid로 중복 방지용 문자열 생성
      // 파일 확장자 추출(.뒤로 png, jpg, jpeg등)
      const fileName = `${uuidv4()}.${file.name.split(".").pop()}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);

      // 업로드 시작(진행률 추적)
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        // 업로드 중일때
        "state_changed",
        (snapshot) => {
          // 진행률 계산
          const currentProgress = Math.round(
            // 현재 업로드 바이트 수 / 전체 파일 크기
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // 갱신
          setProgress(currentProgress);
        },
        // 에러 발생 시 업로드 상태 종료 -> 에러 reject로 반환
        (error) => {
          setError(error);
          setIsUploading(false);
          reject(error);
        },

        // 업로드 완료 시 성공 처리
        async () => {
          // firebase storage 내 해당 파일의 실제 접근 url 가져옴
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setDownloadUrl(url);
          setIsUploading(false);
          resolve(url);
        }
      );
    });
  };
  // 반드시 return... 없어서 안됐음
  return { uploadFile, isUploading, progress };
};
