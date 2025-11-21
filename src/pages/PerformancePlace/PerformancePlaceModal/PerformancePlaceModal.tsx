import { useState, useEffect } from "react";
import "../PerformancePlace/PerformancePlaceStyles.css";
import {
  PlaceMarker,
  PrfPlcModal,
  findPerformancesByPlaceId,
} from "../../../apis/performanceplaceApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
<<<<<<< HEAD
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFlagReq } from "../../../apis/flagApi";
import { FaFlagCheckered } from "react-icons/fa";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { useNavigate } from "react-router-dom";
=======
import { IoClose } from "react-icons/io5";
>>>>>>> main

interface PerformancePlaceModalProps {
  place: PlaceMarker;
  onClose: () => void;
}

function PerformancePlaceModal({ place, onClose }: PerformancePlaceModalProps) {
<<<<<<< HEAD
  console.log(place);
  const { principal } = usePrincipalState.getState();
  const hasValidUrl = place.url && place.url.trim() !== "";
  const [isLoading, setIsLoading] = useState(false);
  const [performances, setPerformances] = useState<PrfPlcModal[]>([]);
  const [error, setError] = useState<string | null>(null);

  //   const [heart, setHeart] = useState(place.flagged ?? false);
  // flagged 초기 상태 정확히 반영(부모가 넣어준 flagged)
  const [flagged, setFlagged] = useState(place.flagged || false);

  const [isDragging, setIsDragging] = useState(false);
=======
    const hasValidUrl = place.url && place.url.trim() !== "";
    const [isLoading, setIsLoading] = useState(false);
    const [performances, setPerformances] = useState<PrfPlcModal[]>([]);
    const [error, setError] = useState<string | null>(null);
    // const [heart, setHeart] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // const HeartIcon = heart ? ImHeart : SlHeart;
>>>>>>> main

  const initialFlagged = place.flagged; // 처음 상태 기억

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const toggleFlagMutation = useMutation({
    mutationFn: () => toggleFlagReq(place.prfPlcId),
    onSuccess: (data) => {
      //   // data = true/false (flagged 여부)
      //   setFlagged(data); // UI 업데이트
      const newFlagState =
        // 객체일 경우 data.flagged 사용
        typeof data === "boolean" ? data : data?.flagged ?? false;

      setFlagged(newFlagState);
    },
    onError: (err) => {
      console.error("플래그 요청 실패 : ", err);
    },
  });

  // 모달 플래그 토글
  const handleToggleFlag = () => {
    if (!principal) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }
    setFlagged((prev) => !prev);

    // toggleFlagMutation.mutate();

    // const response = await toggleFlagReq(place.prfPlcId);
    // setFlagged(response.flagged);
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
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-x-button" onClick={onClose} aria-label="닫기">
        <IoClose />
        </button>
        <h2 className="modal-title">{place.prfPlcName}</h2>
        {/* <HeartIcon
        className="modal-heart-icon"
        style={{
            position: "absolute",
            top: "30px",
            right: "40px",
            fontSize: "30px",
            color: "#E3002A", 
            cursor: "pointer",
        }}
        onClick={() => setHeart(!heart)}
        /> */}
        <p className="modal-info-item">
          <strong>주소:</strong> {place.address || "정보 없음"}
        </p>
        <p className="modal-info-item">
        <strong>주차장:</strong> {place.parkingLot === "Y" ? "⭕" : "❌"}
        </p>
        <p className="modal-info-item">
          <strong>엘리베이터:</strong> {place.eleve === "Y" ? "⭕" : "❌"}
        </p>
        <p className="modal-info-item">
          <strong>장애인주차장:</strong>{" "}
          {place.parkBarrier === "Y" ? "⭕" : "❌"}
        </p>
        <p className="modal-info-item">
          <strong>전화번호:</strong> {place.tel || "정보 없음"}
        </p>
        <div className="modal-button-group">
        <button
            className="modal-url-button"
            onClick={handleUrlClick}
            disabled={!hasValidUrl}
        >
            {hasValidUrl ? "공연장 상세페이지" : "공연장 정보 없음"}
        </button>
        <button
            className="modal-kakao-directions-button"
            onClick={handleGetDirections}
        >
            길찾기
        </button>
        </div>
        <div className="modal-performance-section">
        <h3 className="modal-sub-title">공연 목록</h3>
        {isLoading ? (
            <p style={{ color: "#ccc" }}>공연 목록 로딩 중...</p>
        ) : error ? (
            <p style={{ color: "#ff6b6b" }}>{error}</p>
        ) : performances.length > 0 ? (
            <div className="slider-container">
            <Slider {...settings}>
                {performances.map((perf) => (
                <div
                    key={perf.prfId}
                    className="modal-performance-item"
                    onClick={() => handlePosterClick(perf.prfId)}
                >
                    <img
                    src={perf.posterImgUrl || "/default_poster.png"}
                    alt="공연 포스터"
                    className="modal-poster-image"
                    />
                </div>
                ))}
            </Slider>
            </div>
        ) : (
            <p style={{ color: "#ccc", textAlign: "center", padding: "20px" }}>
            현재 진행중인 공연이 없습니다.
            </p>
        )}
        </div>
    </div>
</div>
);
}
export default PerformancePlaceModal;