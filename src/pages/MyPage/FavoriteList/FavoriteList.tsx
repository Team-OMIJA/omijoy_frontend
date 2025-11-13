/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavoritePrfListReq } from "../../../apis/favoriteApi";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import { useFavoriteState } from "../../../stores/useFavoriteState";



function FavoriteList() {
  // const [favorites, setFavorites] = useState<Performance[]>([]);
  const {favoriteList, setFavoriteList} = useFavoriteState();
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
    // 의존성 배열 추가 - favoriteList 상태를 바로 반영
  }, [setFavoriteList]);

  const openModalHandler = (prfId: string) => {
    setSelectedPrfId(prfId);
    setOpen(true);

  }
  return (
    <>
    <div css={s.container}>
      <h2 css={s.title}>❤️My Favorites</h2>
      {favoriteList.length === 0 ? (
        <p css={s.empty}>아직 스크랩한 공연이 없습니다.</p>
      ) : (
        <ul css={s.list}>
          {favoriteList.map((item) => (
            <li 
            key={item.prfId} 
            css={s.card} 
            onClick={() => openModalHandler(item.prfId)}>
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
