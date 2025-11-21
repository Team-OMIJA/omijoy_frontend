/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useState } from "react";
import { getCroppedImg } from "../../../../utils/imageUtils";
import { Modal } from "@mui/material";
import Cropper from "react-easy-crop";

type ImageCropModalProps = {
  open: boolean;
  imgSrc: string;
  onComplete: (file: File) => void;
  onClose: () => void;
};
function ImageCropModal({
  open,
  imgSrc,
  onComplete,
  onClose,
}: ImageCropModalProps) {
  // crop 좌표
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  // zoom 배율
  const [zoom, setZoom] = useState(1);
  // 잘라낸 이미지
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  };

  const handleDone = async () => {
    const croppedFile = await getCroppedImg(imgSrc, croppedAreaPixels);
    onComplete(croppedFile);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleDone();
        }
      }}
    >
      <div css={s.modalContainer}>
        <div css={s.cropWrapper}>
          <Cropper
            image={imgSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <button css={s.doneButton} onClick={handleDone}>
          완료
        </button>
      </div>
    </Modal>
  );
}

export default ImageCropModal;
