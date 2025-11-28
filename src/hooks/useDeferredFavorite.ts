// favorite 지연 처리 hook

import { useEffect, useRef, useState } from "react";
import { useFavoriteState } from "../stores/useFavoriteState";
import { useLocation } from "react-router-dom";

export function useDeferredFavorite(prfId: string | undefined) {
  const { fetchFavoriteState, fetchFavoriteCount, toggleFavorite } =
    useFavoriteState();

  // 좋아요 UI 상태만 반영(DB저장X)
  const [localLiked, setLocalLiked] = useState(false);
  const [localScrapCount, setLocalSerapCount] = useState(0);

  // 최초 서버 상태 기억 - 변했는가? 를 비교
  const initialLiked = useRef(false);
  const initalScrapCount = useRef(0);

  // 최신 liked 값을 cleanup 에서도 항상 접근 가능하게 유지
  // cleanup 에서는 localLiked의 값 말고 ref 만 신뢰
  // - cleanup 싫행 시점에서는 localLiked가 stale 일 수 있기 때문에
  const likedRef = useRef(false);
  const countRef = useRef(0);

  // 라우팅 이동 감지용
  const location = useLocation();
  const prevLocation = useRef(location.pathname);

  // 데이터 최초 로드
  useEffect(() => {
    if (!prfId) return;

    const load = async () => {
      const serverLiked = await fetchFavoriteState(prfId);
      await fetchFavoriteCount(prfId);

      const count = useFavoriteState.getState().favoriteCount[prfId] ?? 0;

      setLocalLiked(serverLiked);
      setLocalSerapCount(count);

      initialLiked.current = serverLiked;
      initalScrapCount.current = count;

      likedRef.current = serverLiked;
      countRef.current = count;
    };

    load();
  }, [prfId]);
}
