// import { useNavigate } from "react-router-dom";
import { useState, useEffect ,} from "react";
import "../PerformancePlace/PerformancePlaceStyles.css";
import {
    PlaceMarker,
    PrfPlcModal,
    findPerformancesByPlaceId,
} from "../../../apis/performanceplaceApi";
import { SlHeart } from "react-icons/sl";
import { ImHeart } from "react-icons/im";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface PerformancePlaceModalProps {
    place: PlaceMarker;
    onClose: () => void;
}

function PerformancePlaceModal({ place, onClose}: PerformancePlaceModalProps) {
    const hasValidUrl = place.url && place.url.trim() !== "";
    const [isLoading, setIsLoading] = useState(false);
    const [performances, setPerformances] = useState<PrfPlcModal[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [heart,setHeart] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const HeartIcon = heart ? ImHeart : SlHeart;


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
        if(place.url){
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
        window.open(url, '_blank', 'noopener,noreferrer');
        console.log(place.prfPlcName, place.latitude, place.longitude)
        console.log(url)
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
    slidesToScroll: 2
        }
    }
    ]
};
    return (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{place.prfPlcName}</h2>
        <HeartIcon className="modal-heart-icon" style={{position: "absolute", top: "30px", right: "40px", fontSize: "30px", color: "crimson", cursor: "pointer"}} onClick={() => setHeart(!heart)}/>
        <p className="modal-info-item">
        <strong>주소:</strong> {place.address || "정보 없음"}
        </p>
        <p className="modal-info-item">
        <strong>주차장:</strong> {place.parkingLot ==="Y" ? "⭕" : "❌"}
        </p>
        <p className="modal-info-item">
        <strong>엘리베이터:</strong> {place.eleve === "Y" ? "⭕" : "❌"}
        </p>
        <p className="modal-info-item">
        <strong>장애인주차장:</strong> {place.parkBarrier === "Y" ? "⭕" : "❌"}
        </p>
        <p className="modal-info-item">
        <strong>전화번호:</strong> {place.tel || "정보 없음"}
        </p>
        <button
        className="modal-url-button"
        onClick={handleUrlClick}
        disabled={!hasValidUrl}
        >
        {hasValidUrl ? "공연장 상세페이지" : "공연장 정보 없음"}
        </button>
        <button 
        className="modal-kakao-directions-button" 
        onClick={handleGetDirections}>
            <strong>길찾기</strong>
        </button>

        <div className="modal-performance-section">
        <h3 className="modal-sub-title">공연 목록</h3>
        {isLoading ? (
            <p>공연 목록 로딩 중...</p>
        ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
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
            <p>현재 진행중인 공연이 없습니다.</p>
        )}
        </div>

        <button className="modal-close-button" onClick={onClose}>
        닫기
        </button>
    </div>
    </div>
    );
}
export default PerformancePlaceModal;
