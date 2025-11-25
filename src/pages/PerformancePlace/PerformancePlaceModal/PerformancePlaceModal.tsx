import { useState, useEffect } from "react";
import {
  PlaceMarker,
  PrfPlcModal,
  findPerformancesByPlaceId,
} from "../../../apis/performanceplaceApi";
import Slider from "react-slick";
import * as S from "./PerformancePlaceModal.styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFlagReq } from "../../../apis/flagApi";

import { usePrincipalState } from "../../../stores/usePrincipalState";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaFlagCheckered } from "react-icons/fa";

interface PerformancePlaceModalProps {
  place: PlaceMarker;
  onClose: () => void;
}

function PerformancePlaceModal({ place, onClose }: PerformancePlaceModalProps) {
  const { principal } = usePrincipalState.getState();
  // 처음 상태 기억 (모달이 닫힐 때 비교하기 위함)
  const initialFlagged = place.flagged;
  const [flagged, setFlagged] = useState(place.flagged || false);
  const hasValidUrl = place.url && place.url.trim() !== "";
  const [isLoading, setIsLoading] = useState(false);
  const [performances, setPerformances] = useState<PrfPlcModal[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => toggleFlagReq(place.prfPlcId),
    onSuccess: () => {
      queryClient.invalidateQueries(["flags"]);
    },
  });

  const navigate = useNavigate();

  // 버튼 클릭 시에는 화면의 상태만 변경
  const handleToggleFlag = () => {
    if (!principal) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }
    setFlagged((prev) => !prev);
  };

  // 모달이 닫힐 때, 플래그 상태가 변경되었으면 서버에 요청
  const closeAndRefetchHandler = async () => {
    if (flagged !== initialFlagged) {
      try {
        // await toggleFlagReq(place.prfPlcId);
        // queryClient.invalidateQueries({ queryKey: ["flags"] });
        await mutation.mutateAsync();
      } catch (err) {
        console.error("플래그 상태 업데이트 실패:", err);
      }
    }
    onClose();
  };

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
    if (hasValidUrl && place.url) {
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
    <S.ModalOverlay onClick={closeAndRefetchHandler}>
      <S.ModalBody onClick={(e) => e.stopPropagation()}>
        <S.ModalCloseXButton onClick={closeAndRefetchHandler} aria-label="닫기">
          <IoClose />
        </S.ModalCloseXButton>
        <S.ModalFlagButton onClick={handleToggleFlag} flagged={flagged}>
          <FaFlagCheckered />
        </S.ModalFlagButton>
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
          <strong>전화번호:</strong> {place.tel?.trim() || "정보 없음"}
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
