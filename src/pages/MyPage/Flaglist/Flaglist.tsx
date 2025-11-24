/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useQuery } from "@tanstack/react-query";
import { getFlagListReq } from "../../../apis/flagApi";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { FaFlagCheckered } from "react-icons/fa";
import { useState } from "react";
import PerformancePlaceModal from "../../PerformancePlace/PerformancePlaceModal/PerformancePlaceModal";
import { PerformancePlace } from "../../../types/myPageTypes";
import { useNavigate } from "react-router-dom";

// 1) 공연장 타입 정의 (콘솔 기반)
export interface PerformancePlaceDetail {
  id: number;
  prfPlcId: string;
  prfPlcName: string;
  prfPlcUrl: string;
  telNo: string;

  address: string;
  la: number;
  lo: number;

  parkBarrier: string;
  parkingLot: string;
  eleve: string;

  flagged: boolean;
}

export interface PerformancePlaceModalProps {
  place: PerformancePlaceDetail;
  onClose: () => void;
}
// 2) Flag 응답 타입도 함께 정의
interface FlagItem {
  flagId: number;
  prfPlcId: PerformancePlace; // 서버 응답에서 공연장 정보가 들어있는 필드
}

function Flaglist() {
  // 로그인 객체
  const { principal } = usePrincipalState();

  // 3) React Query → flag 리스트 가져오기
  const { data, isLoading, isError } = useQuery<FlagItem[]>({
    queryKey: ['flags', principal?.id], // 유저 ID 기반 캐싱
    queryFn: getFlagListReq, // API
    enabled: !!principal?.id, // 로그인되었을 때만 실행
  });

  // 모달 상태
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PerformancePlaceDetail | null>(null);

<<<<<<< HEAD
  if (!principal?.id) return <div css={s.error}>로그인 후 이용 가능합니다.</div>;
=======
  const navigate = useNavigate();

  // 지금 이거 굳이 필요한지 모르겠음
  if (!principal?.id) {
    alert("로그인 후 이용가능합니다.");
    return navigate("/login");
  }
>>>>>>> main

  if (isLoading) return <div css={s.loading}>로딩중...</div>;
  if (isError) {
    return alert("에러가 발생했습니다.");
  }

  // 서버에서 받은 flag 리스트
  const flagList = data ?? [];

  // 4) 모달 열기 함수
  const openModal = (place: PerformancePlaceDetail) => {
    setSelectedPlace(place);
    setModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlace(null);
  };

  return (
    <div css={s.container}>
      {/* Header */}
      <div css={s.header}>
        {/* <FaFlagCheckered size={25} color="white" /> */}
        <h2 css={s.title}>PLACE</h2>
      </div>

      {/* List */}
      {flagList.length > 0 ? (
        <ul css={s.list}>
          {flagList.map((flag) => {
            const place = {
              ...flag.prfPlcId, // 공연장 정보 그대로 spread
              flagged: flag.flagId, // 💡 이 컴포넌트에서는 항상 true
            };

            return (
              <li key={flag.flagId} css={s.card} onClick={() => openModal(place)}>
                <div css={s.placeName}>{place.prfPlcName}</div>
                <div css={s.address}>{place.address}</div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p css={s.empty}>플래그한 공연장이 없습니다.</p>
      )}

      {/* Modal */}
      {isModalOpen && selectedPlace && (
        <PerformancePlaceModal
          place={{
            ...selectedPlace,
            url: selectedPlace.prfPlcUrl,
            tel: selectedPlace.telNo,
          }}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Flaglist;
