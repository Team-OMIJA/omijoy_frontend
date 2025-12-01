/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as s from "./FlagListStyles";
import { getFlagListReq } from "../../../apis/flagApi";
import { PlaceMarker } from "../../../apis/performanceplaceApi";
import { PerformancePlace } from "../../../types/myPageTypes";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import PerformancePlaceModal from "../../PerformancePlace/PerformancePlaceModal/PerformancePlaceModal";
import { Carousel } from "@mantine/carousel";
import chunkArray from "../../../utils/myPageUtils";

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
  if (isLoading) return <s.Loading>로딩중..</s.Loading>;
  if (isError) {
    alert("에러가 발생했습니다.");
    return null;
  }

  const flagList = data ?? [];
  // 리스트 15개씩 보여줌 -> 넘치면 넘어감
  const slides = chunkArray(flagList, 15);

  const openModal = (place: FlaggedPlace) => {
    setSelectedPlace(place);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlace(null);
  };

  return (
    <s.Container>
      <s.Header>
        <s.Title>PLACE</s.Title>
      </s.Header>

      {flagList.length > 0 ? (
        <Carousel
          slideGap="md"
          emblaOptions={{
            loop: false,
            align: "start",
          }}
          controlSize={45}
          styles={{
            control: {
              background: "rgba(255,255,255,0.25)",
              border: "none",
              backdropFilter: "blur(6px)",
              color: "#fff",
            },
            viewport: {
              scrollBehavior: "smooth",
              transitionDuration: "750ms",
            },
          }}
        >
          {slides.map((group, idx) => (
            <Carousel.Slide key={idx}>
              <s.SlideGrid>
                {group.map((flag) => {
                  const place = toFlaggedPlace(flag.prfPlcId);

                  return (
                    <s.Card
                      key={flag.flagId}
                      onClick={() => openModal(place)}
                      style={{ listStyle: "none" }}
                    >
                      <s.PlaceName>{place.prfPlcName}</s.PlaceName>
                      <s.Address>{place.address}</s.Address>
                    </s.Card>
                  );
                })}
              </s.SlideGrid>
            </Carousel.Slide>
          ))}
        </Carousel>
      ) : (
        <s.Empty>플래그한 공연장이 없습니다.</s.Empty>
      )}

      {isModalOpen && selectedPlace && (
        <PerformancePlaceModal place={selectedPlace} onClose={closeModal} />
      )}
    </s.Container>
  );
}

export default Flaglist;
