import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../configs/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const useFirebaseUpload = () => {
  // 기본 상태 정의
  const [progress, setProgress] = useState<number>(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file || !folder) {
        reject(new Error("파일이나 폴더가 지정되지 않았습니다."));
        return;
      }

      setIsUploading(true);
      setProgress(0);
      setError(null);
      setDownloadUrl(null);

      const fileName = `${uuidv4()}.${file.name.split(".").pop()}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const currentProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(currentProgress);
        },
        (error) => {
          setError(error);
          setIsUploading(false);
          reject(error);
        },
        async () => {
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
