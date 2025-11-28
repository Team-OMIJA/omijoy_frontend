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
      // 서버 스크랩 상태 불러오기
      const serverLiked = await fetchFavoriteState(prfId);
      await fetchFavoriteCount(prfId);

      // 서버 스크랩 카운트 불러오기
      const count = useFavoriteState.getState().favoriteCount[prfId] ?? 0;

      setLocalLiked(serverLiked);
      setLocalSerapCount(count);

      // 초기 서버값 저장
      initialLiked.current = serverLiked;
      initalScrapCount.current = count;

      // UI 최신값 ref 저장
      likedRef.current = serverLiked;
      countRef.current = count;
    };

    load();
  }, [prfId]);

  // UI 토글 반영
  // 스크랩 토글
  const handleToggleLocalFavorite = () => {
    setLocalLiked((prev) => {
      // 현재 상태랑 다른 것
      const next = !prev;
      // cleanup 때 사용할 최신 값
      likedRef.current = next;
      return next;
    });

    // 카운트
    setLocalSerapCount((prev) => {
      const next = likedRef.current ? prev + 1 : Math.max(prev - 1, 0);
      // 최신값 저장
      countRef.current = next;
      return next;
    });
  };

  // 페이지 떠날 때 서버 1회 반영
  useEffect(() => {
    return () => {
      if (!prfId) return;

      // 좋아요 현재 값이 이전 값과 다름
      const likedChanged = likedRef.current !== initialLiked.current;

      // 라우터 path명이 이전과 다름
      const pathnameChanged = prevLocation.current !== location.pathname;

      if (likedChanged && pathnameChanged) {
        toggleFavorite(prfId);
      }
    };
  }, [prfId, location.pathname]);

  return {
    localLiked,
    localScrapCount,
    handleToggleLocalFavorite,
  };
}
