/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { useState } from 'react';
import { getCroppedImg } from '../../../../utils/imageUtils';
import { Modal } from '@mui/material';
import Cropper, { Area } from 'react-easy-crop';

type ImageCropModalProps = {
  open: boolean;
  imgSrc: string;
  onComplete: (file: File) => void;
  onClose: () => void;
};
function ImageCropModal({ open, imgSrc, onComplete, onClose }: ImageCropModalProps) {
  // crop 좌표
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  // zoom 배율
  const [zoom, setZoom] = useState(1);
  // 잘라낼 이미지 영역
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const onCropComplete = (_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  };

  const handleDone = async () => {
    if (!croppedAreaPixels) return;
    const croppedFile = await getCroppedImg(imgSrc, croppedAreaPixels);
    onComplete(croppedFile);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
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
