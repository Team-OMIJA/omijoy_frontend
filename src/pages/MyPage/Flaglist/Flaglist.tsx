/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useQuery } from "@tanstack/react-query";
import { getFlagListReq } from "../../../apis/flagApi";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { FaFlagCheckered } from "react-icons/fa";
import { useState } from "react";
import PerformancePlaceModal from "../../PerformancePlace/PerformancePlaceModal/PerformancePlaceModal";

function Flaglist() {
  // 로그인한 유저 객체
  const { principal } = usePrincipalState();

  // ReactQuery 사용
  const { data, isLoading, isError } = useQuery({
    // 유저 ID가 바뀌면 자동 refetch
    queryKey: ["flags", principal?.id],
    // flag 목록 가져오는 api 호출 함수
    queryFn: () => getFlagListReq(),
    // 인증객체 있을때만 호출됨
    enabled: !!principal?.id,
  });

  // 모달 상태
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  if (isLoading) return <div css={s.loading}>로딩중...</div>;
  if (isError) return <div css={s.error}>에러 발생</div>;

  const flagList = data ?? [];

  // place - prfPlcId로 공연장 객체 전체를 넘기고 있음
  const openModal = (place) => {
    console.log("📌 openModal place:", place);
    setSelectedPlace(place);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlace(null);
  };

  return (
    <div css={s.container}>
      {/* Header */}
      <div css={s.header}>
        <FaFlagCheckered size={25} color="white" />
        <h2 css={s.title}>Flag</h2>
      </div>

      {/* List */}
      {flagList.length > 0 ? (
        <ul css={s.list}>
          {flagList.map((flag) => (
            <li
              key={flag.flagId}
              css={s.card}
              onClick={() =>
                openModal({
                  ...flag.prfPlcId, // prfPlcId 안의 정보 spread
                  flagged: true, // 🔥 이렇게 boolean 으로 줘야 함
                })
              }
            >
              <div css={s.placeName}>{flag.prfPlcId?.prfPlcName}</div>
              <div css={s.address}>{flag.prfPlcId?.address}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p css={s.empty}>플래그한 공연장이 없습니다.</p>
      )}

      {isModalOpen && selectedPlace ? (
        <PerformancePlaceModal place={selectedPlace} onClose={closeModal} />
      ) : null}
    </div>
  );
}

export default Flaglist;
