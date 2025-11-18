/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useEffect, useState } from "react";
import { getFavoritePrfListReq } from "../../../apis/favoriteApi";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import { useFavoriteState } from "../../../stores/useFavoriteState";
import { RxShare2 } from "react-icons/rx";


function FavoriteSharedList() {
  const { favoriteList, setFavoriteList } = useFavoriteState();
  const [open, setOpen] = useState(false);
  const [selectedPrfId, setSelectedPrfId] = useState<string | null>(null);

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
  }, [setFavoriteList]);

  const openModalHandler = (prfId: string) => {
    setSelectedPrfId(prfId);
    setOpen(true);
  };
  return (
    <>
      <div css={s.container}>
        <h2 css={s.title}>❤️My Favorites</h2>
        <RxShare2 size={30} style={{position: "absolute", left: "320px", bottom: "309px",cursor: "pointer"}}/>
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

export default FavoriteSharedList;
