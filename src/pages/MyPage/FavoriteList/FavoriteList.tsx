/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavoritePrfListReq } from "../../../apis/favoriteApi";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import { useFavoriteState } from "../../../stores/useFavoriteState";
import { RxShare2 } from "react-icons/rx";
import { IoArrowForward } from "react-icons/io5";

function FavoriteList() {
  // const [favorites, setFavorites] = useState<Performance[]>([]);
  const { favoriteList, setFavoriteList } = useFavoriteState();
  const [open, setOpen] = useState(false);
  const [selectedPrfId, setSelectedPrfId] = useState<string | null>(null);
  const navigate = useNavigate();
  const stored = localStorage.getItem("principal-storage");
  const principal = stored ? JSON.parse(stored)?.state?.principal : null;

  useEffect(() => {
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

  const openModalHandler = (prfId: string) => {
    setSelectedPrfId(prfId);
    setOpen(true);
  };
  return (
    <>
      <div css={s.container}>
        <h2 css={s.title}>❤️My Favorites</h2>
        <IoArrowForward 
          size={30} 
          onClick={() => {
            if (!principal.id) {
              alert("로그인 후 공유가 가능합니다.");
              return;
            }
            navigate(`/favorites/list/${principal.id}`);
          }}
          style={{position: "absolute", left: "360px", bottom: "309px",cursor: "pointer"}}
        />
        <RxShare2
          size={30}
          onClick={() => {
            const stored = localStorage.getItem("principal-storage");
            const principal = stored ? JSON.parse(stored)?.state?.principal : null;

            if (!principal?.id) {
              alert("로그인 후 공유가 가능합니다.");
              return;
            }

            const shareUrl = `${window.location.origin}/favorites/list/${principal.id}`;

            navigator.clipboard.writeText(shareUrl)
              .then(() => alert("URL이 클립보드에 복사되었습니다!"))
              .catch(() => alert("URL 복사에 실패했습니다."));
          }}
          style={{ position: "absolute", left: "320px", bottom: "309px", cursor: "pointer" }}
        />
        {favoriteList.length === 0 ? (
          <p css={s.empty}>아직 스크랩한 공연이 없습니다.</p>
        ) : (
          <ul css={s.list}>
            {favoriteList.map((item) => (
              <li
                key={item.prfId}
                css={s.card}
                onClick={() => openModalHandler(item.prfId)}
              >
                <img src={item.posterImgUrl} alt={item.prfNm} css={s.poster} />

                <div css={s.info}>
                  <div css={s.name}>{item.prfNm}</div>
                  <div css={s.place}>{item.prfPlcNm}</div>
                  <div css={s.date}>
                    {item.prfStartDt} ~ {item.prfEndDt}
                  </div>
                  <div css={s.genre}>{item.genreNm}</div>
                </div>
              </li>
            ))}
          </ul>
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