// any 쓰기 찝찝해서 area 타입이 croppedAreaPixels 역할을 수행한다길래 갈아 끼워봄
// import { Area } from "react-easy-crop";
import { v4 as uuidv4 } from "uuid";

export const getCroppedImg = async (
  // 이미지 경로
  imageSrc: string,
  // react-easy-crop 에서 내려주는 값 - any
  // 이미지에서 잘라낸 부분의 좌표 + 크기 정보
  croppedAreaPixels: any
  // croppedAreaPixels: Area
): Promise<File> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");

  // html 요소 중 canvas = 빈 도화지
  // 그릴 도구 -> 2d 렌더링 컨텍스트
  const ctx = canvas.getContext("2d");
  // 해당 캔버스에서 2d그림을 그릴 수 있는 객체를 가져와라

  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  // ctx 가 null 이 아님을 보장
  // 성공시 CanvasRenderingContext2D
  // 실패시 null 이기 때문에
  // 즉, null이 아님을 강제...? 로 체크 통과... 시켜도 되나?
  ctx!.drawImage(
    image,
    // 원본 이미지에서 잘라낼 부분의 시작점
    croppedAreaPixels.x,
    // 위에서부터 얼마나 떨어져있는지
    croppedAreaPixels.y,
    // 잘라낼 영역의 가로
    croppedAreaPixels.width,
    // 잘라낼 영역의 세로
    croppedAreaPixels.height,
    // 새로운 캔버스에서 그릴 x 위치
    0,
    // 새로운 캔버스에서 그릴 y 위치
    0,
    // 새로운 이미지의 가로 크기
    croppedAreaPixels.width,
    // 새로운 이미지의 세로 크기
    croppedAreaPixels.height
  );
  // 크롭된 영역만 잘라서 캔버스에 그리기 위해 사용

  // firebase 저장 비용 감소를 기대하고 jpeg로 저장
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const file = new File([blob!], `${uuidv4()}.jpg`, { type: "image/jpeg" });
      resolve(file);
    }, "image/jpeg");
  });
};

// 호이스팅
function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
  });
}
