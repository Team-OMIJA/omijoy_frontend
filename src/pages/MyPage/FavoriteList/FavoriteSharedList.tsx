/** @jsxImportSource @emotion/react */
import * as s from "./FavoriteListStyles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSharedFavoritePrfListReq } from "../../../apis/favoriteApi";
import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import { useFavoriteState } from "../../../stores/useFavoriteState";
import * as ps from "../../Home/PerformanceStyles";

function FavoriteSharedList() {
  const { userId } = useParams<{ userId: string }>();
  const { favoriteList, setFavoriteList } = useFavoriteState();
  const [open, setOpen] = useState(false);
  const [selectedPrfId, setSelectedPrfId] = useState<string>("");
  const stored = localStorage.getItem('principal-storage');
  const principal = stored ? JSON.parse(stored)?.state?.principal : null;

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
        <ps.PerformanceTitle>
          <h2 css={s.title}>{principal.username}님의 FAVORITES</h2>
        </ps.PerformanceTitle>
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
                  <ps.PerformanceTitle>
                    <div>{item.prfNm}</div>
                  </ps.PerformanceTitle>
                  <ps.PerformancePlace>
                    <div>{item.prfPlcNm}</div>
                  </ps.PerformancePlace>
                  <ps.PerformancePeriod>
                    <div>
                      {item.prfStartDt} ~ {item.prfEndDt}
                    </div>
                  </ps.PerformancePeriod>
                  <ps.PerformanceGenre>
                    <div>{item.genreNm}</div>
                  </ps.PerformanceGenre>
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
