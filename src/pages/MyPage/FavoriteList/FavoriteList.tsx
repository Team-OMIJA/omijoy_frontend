/** @jsxImportSource @emotion/react */
import * as s from "./FavoriteListStyles";
import * as ps from "../../Home/PerformanceStyles";
import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavoritePrfListReq } from "../../../apis/favoriteApi";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import { useFavoriteState } from "../../../stores/useFavoriteState";
import { RxShare2 } from "react-icons/rx";
import { IoArrowForward } from "react-icons/io5";

function FavoriteList() {
  const { favoriteList, setFavoriteList } = useFavoriteState();
  const [open, setOpen] = useState(false);
  const [selectedPrfId, setSelectedPrfId] = useState<string>("");
  const navigate = useNavigate();
  const stored = localStorage.getItem("principal-storage");
  const principal = stored ? JSON.parse(stored)?.state?.principal : null;

  useEffect(() => {
    // 현재 내가 스크랩한 공연들 불러옴
    const fetchFavorites = async () => {
      try {
        const data = await getFavoritePrfListReq();
        setFavoriteList(data);
      } catch (error) {
        console.error("스크랩 리스트 불러오기 실패 : ", error);
      }
    };
    fetchFavorites();
    // 의존성 배열 추가 - favoriteList 상태를 바로 반영
  }, [setFavoriteList]);

  // 공연 id 기반으로 해당 공연 모달 열어줌
  const handleModalOpen = (prfId: string) => {
    setSelectedPrfId(prfId);
    setOpen(true);
  };

  return (
    <>
      <div css={s.container}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            position: "relative",
          }}
        >
          <ps.PerformanceTitle>
            <h2 css={s.title}>FAVORITES</h2>
          </ps.PerformanceTitle>
          <s.IconHover>
            <RxShare2
              size={27}
              onClick={() => {
                const stored = localStorage.getItem("principal-storage");
                const principal = stored
                  ? JSON.parse(stored)?.state?.principal
                  : null;

                if (!principal?.id) {
                  alert("로그인 후 공유가 가능합니다.");
                  return;
                }

                const shareUrl = `${window.location.origin}/favorites/list/${principal.id}`;

                navigator.clipboard
                  .writeText(shareUrl)
                  .then(() => alert("URL이 클립보드에 복사되었습니다!"))
                  .catch(() => alert("URL 복사에 실패했습니다."));
              }}
              style={{ color: "white", cursor: "pointer" }}
            />
          </s.IconHover>
          <s.IconHover>
            <IoArrowForward
              size={27}
              onClick={() => {
                if (!principal.id) {
                  alert("로그인 후 이동 가능합니다.");
                  return;
                }
                navigate(`/favorites/list/${principal.id}`);
              }}
              style={{ color: "white", cursor: "pointer" }}
            />
          </s.IconHover>
        </div>

        {favoriteList.length === 0 ? (
          <p css={s.empty}>스크랩한 공연이 없습니다.</p>
        ) : (
          <div css={s.sliderWrapper}>
            {/* 왼쪽 그라데이션 */}
            {/* <div css={s.gradientLeft} /> */}

            {/* 오른쪽 그라데이션 */}
            {/* <div css={s.gradientRight} /> */}

            <Carousel
              slideSize="16.6%" // → 6개 보여주기 (100 / 6)
              slideGap="30px"
              emblaOptions={{
                align: "start",
                slidesToScroll: 1,
                dragFree: true,
              }}
              withControls
              controlSize={45}
              controlsOffset="sm"
              styles={{
                control: {
                  background: "rgba(255,255,255,0.25)",
                  border: "none",
                  backdropFilter: "blur(6px)",
                  color: "#fff",
                },
              }}
            >
              {favoriteList.map((item) => (
                <Carousel.Slide key={item.prfId}>
                  <div css={s.card} onClick={() => handleModalOpen(item.prfId)}>
                    <img
                      src={item.posterImgUrl}
                      alt={item.prfNm}
                      css={s.poster}
                    />

                    <div css={s.info}>
                      <ps.PerformanceTitle
                        onClick={() => handleModalOpen(item.prfId)}
                      >
                        {item.prfNm}
                      </ps.PerformanceTitle>
                      <ps.PerformancePlace>{item.prfPlcNm}</ps.PerformancePlace>

                      <ps.PerformancePeriod>
                        {item.prfStartDt} ~ {item.prfEndDt}
                      </ps.PerformancePeriod>

                      <ps.PerformanceGenre>{item.genreNm}</ps.PerformanceGenre>
                    </div>
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
        )}
      </div>

      <PerformanceModal
        open={open}
        setOpen={setOpen}
        prfId={selectedPrfId}
        source="mypage"
      />
    </>
  );
}

export default FavoriteList;
