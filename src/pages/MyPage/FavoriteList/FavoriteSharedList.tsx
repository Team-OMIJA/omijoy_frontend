/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSharedFavoritePrfListReq } from "../../../apis/favoriteApi";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import { useFavoriteState } from "../../../stores/useFavoriteState";

function FavoriteSharedList() {
  const { userId } = useParams<{ userId: string }>();
  const { favoriteList, setFavoriteList } = useFavoriteState();
  const [open, setOpen] = useState(false);
  const [selectedPrfId, setSelectedPrfId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;
      try {
        const data = await getSharedFavoritePrfListReq(userId); // userId 기반 API 호출
        setFavoriteList(data);
      } catch (error) {
        console.error("공유된 스크랩 리스트 불러오기 실패 : ", error);
      }
    };
    fetchFavorites();
  }, [userId, setFavoriteList]);

  const openModalHandler = (prfId: string) => {
    setSelectedPrfId(prfId);
    setOpen(true);
  };

  return (
    <>
      <div css={s.container}>
        <h2 css={s.title}>❤️Favorites of User</h2>
        {favoriteList.length === 0 ? (
          <p css={s.empty}>공유된 스크랩 리스트가 없습니다.</p>
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