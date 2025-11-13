/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavoritePrfListReq } from "../../../apis/favoriteApi";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";

type Performance = {
  prfId: string;
  posterImgUrl: string;
  prfNm: string;
  prfPlcNm: string;
  prfStartDt: string;
  prfEndDt: string;
  genreNm: string;
};

function FavoriteList() {
  const [favorites, setFavorites] = useState<Performance[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedPrfId, setSelectedPrfId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavoritePrfListReq();
        setFavorites(data);
      } catch (error) {
        console.error("스크랩 리스트 불러오기 실패 : ", error);
      }
    };
    fetchFavorites();
  }, []);

  const openModalHandler = (prfId: string) => {
    setSelectedPrfId(prfId);
    setOpen(true);

  }
  return (
    <>
    <div css={s.container}>
      <h2 css={s.title}>❤️My Favorites</h2>
      {favorites.length === 0 ? (
        <p css={s.empty}>아직 스크랩한 공연이 없습니다.</p>
      ) : (
        <ul css={s.list}>
          {favorites.map((item) => (
            <li key={item.prfId} css={s.card} onClick={() => openModalHandler(item.prfId)}>
              <img src={item.posterImgUrl} alt={item.prfNm} css={s.poster} />

              <div css={s.info}>
                <div css={s.name}>{item.prfNm}</div>
                <div css={s.place}>{item.prfPlcNm}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  <PerformanceModal open={open} setOpen={setOpen} prfId={selectedPrfId}/>
  </>
  );
}

export default FavoriteList;
