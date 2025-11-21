import { useState, useEffect } from "react";
import {
  PlaceMarker,
  PrfPlcModal,
  findPerformancesByPlaceId,
} from "../../../apis/performanceplaceApi";
// import { SlHeart } from "react-icons/sl";
// import { ImHeart } from "react-icons/im";
import Slider from "react-slick";
import * as S from "./PerformancePlaceModal.styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoClose } from "react-icons/io5";

interface PerformancePlaceModalProps {
  place: PlaceMarker;
  onClose: () => void;
}

function PerformancePlaceModal({ place, onClose }: PerformancePlaceModalProps) {
  const hasValidUrl = place.url && place.url.trim() !== "";
  const [isLoading, setIsLoading] = useState(false);
  const [performances, setPerformances] = useState<PrfPlcModal[]>([]);
  const [error, setError] = useState<string | null>(null);
  // const [heart, setHeart] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // const HeartIcon = heart ? ImHeart : SlHeart;

  useEffect(() => {
    if (!place.prfPlcId) return;

    const fetchPerformances = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await findPerformancesByPlaceId(place.prfPlcId);
        setPerformances(data);
      } catch (err) {
        setError("공연 목록을 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerformances();
  }, [place.prfPlcId]);

  const handleUrlClick = () => {
    if (hasValidUrl) {
      if (place.url) {
        window.open(place.url, "_blank", "noopener,noreferrer");
      }
    }
  };
  const handlePosterClick = (prfId: string) => {
    if (isDragging) return;

    const url = `/performance/${prfId}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleGetDirections = () => {
    const toName = encodeURIComponent(place.prfPlcName);
    const url = `https://map.kakao.com/link/to/${toName},${place.latitude},${place.longitude}`;
    window.open(url, "_blank", "noopener,noreferrer");
    console.log(place.prfPlcName, place.latitude, place.longitude);
    console.log(url);
  };
  const settings = {
    dots: true,
    infinite: performances.length > 5,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    beforeChange: () => setIsDragging(true),
    afterChange: () => setIsDragging(false),
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalBody onClick={(e) => e.stopPropagation()}>
        <S.ModalCloseXButton onClick={onClose} aria-label="닫기">
          <IoClose />
        </S.ModalCloseXButton>
        <S.ModalTitle>{place.prfPlcName}</S.ModalTitle>
        <S.ModalInfoItem>
          <strong>주소:</strong> {place.address || "정보 없음"}
        </S.ModalInfoItem>
        <S.ModalInfoItem>
          <strong>주차장:</strong> {place.parkingLot === "Y" ? "⭕" : "❌"}
        </S.ModalInfoItem>
        <S.ModalInfoItem>
          <strong>엘리베이터:</strong> {place.eleve === "Y" ? "⭕" : "❌"}
        </S.ModalInfoItem>
        <S.ModalInfoItem>
          <strong>장애인주차장:</strong>{" "}
          {place.parkBarrier === "Y" ? "⭕" : "❌"}
        </S.ModalInfoItem>
        <S.ModalInfoItem>
          <strong>전화번호:</strong> {place.tel || "정보 없음"}
        </S.ModalInfoItem>
        <S.ModalButtonGroup>
          <S.ModalUrlButton onClick={handleUrlClick} disabled={!hasValidUrl}>
            {hasValidUrl ? "공연장 상세페이지" : "공연장 정보 없음"}
          </S.ModalUrlButton>
          <S.ModalKakaoDirectionsButton onClick={handleGetDirections}>
            길찾기
          </S.ModalKakaoDirectionsButton>
        </S.ModalButtonGroup>
        <S.ModalPerformanceSection>
          <S.ModalSubTitle>공연 목록</S.ModalSubTitle>
          {isLoading ? (
            <p style={{ color: "#ccc" }}>공연 목록 로딩 중...</p>
          ) : error ? (
            <p style={{ color: "#ff6b6b" }}>{error}</p>
          ) : performances.length > 0 ? (
            <S.SliderContainer>
              <Slider {...settings}>
                {performances.map((perf) => (
                  <S.ModalPerformanceItem
                    key={perf.prfId}
                    onClick={() => handlePosterClick(perf.prfId)}
                  >
                    <S.ModalPosterImage
                      src={perf.posterImgUrl || "/default_poster.png"}
                      alt="공연 포스터"
                    />
                  </S.ModalPerformanceItem>
                ))}
              </Slider>
            </S.SliderContainer>
          ) : (
            <p style={{ color: "#ccc", textAlign: "center", padding: "20px" }}>
              현재 진행중인 공연이 없습니다.
            </p>
          )}
        </S.ModalPerformanceSection>
      </S.ModalBody>
    </S.ModalOverlay>
  );
}
export default PerformancePlaceModal;
