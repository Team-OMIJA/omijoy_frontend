/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as s from "./styles";
import { getFlagListReq } from "../../../apis/flagApi";
import { PlaceMarker } from "../../../apis/performanceplaceApi";
import { PerformancePlace } from "../../../types/myPageTypes";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import PerformancePlaceModal from "../../PerformancePlace/PerformancePlaceModal/PerformancePlaceModal";

type FlagItem = {
  flagId: number;
  prfPlcId: PerformancePlace;
};

type FlaggedPlace = PlaceMarker & { flagged: boolean };

const toFlaggedPlace = (place: PerformancePlace): FlaggedPlace => ({
  prfPlcId: place.prfPlcId,
  prfPlcName: place.prfPlcName,
  latitude: place.la,
  longitude: place.lo,
  address: place.address ?? null,
  tel: place.telNo ?? null,
  url: place.prfPlcUrl ?? null,
  parkBarrier: place.parkBarrier ?? null,
  parkingLot: place.parkingLot ?? null,
  eleve: place.eleve ?? null,
  flagged: true,
  sido: "",
  gugun: "",
});

function Flaglist() {
  const { principal } = usePrincipalState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!principal?.id) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
    }
  }, [principal?.id, navigate]);

  const { data, isLoading, isError } = useQuery<FlagItem[]>({
    queryKey: ["flags", principal?.id],
    queryFn: getFlagListReq,
    enabled: !!principal?.id,
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<FlaggedPlace | null>(null);

  if (!principal?.id) return null;
  if (isLoading) return <div css={s.loading}>로딩중..</div>;
  if (isError) {
    alert("에러가 발생했습니다.");
    return null;
  }

  const flagList = data ?? [];

  const openModal = (place: FlaggedPlace) => {
    setSelectedPlace(place);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlace(null);
  };

  return (
    <div css={s.container}>
      <div css={s.header}>
        <h2 css={s.title}>PLACE</h2>
      </div>

      {flagList.length > 0 ? (
        <ul css={s.list}>
          {flagList.map((flag) => {
            const place = toFlaggedPlace(flag.prfPlcId);
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

      {isModalOpen && selectedPlace && (
        <PerformancePlaceModal place={selectedPlace} onClose={closeModal} />
      )}
    </div>
  );
}

export default Flaglist;
