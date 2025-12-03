import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function useInfiniteScroll(callback: () => void, hasMore: boolean) {
  const lastCalled = useRef(0);        // 세션 저장 쓰로틀링용 timestamp
  const finished = useRef(false);      // 무한 스크롤 완료 여부
  const navigationType = useNavigationType(); // 현재 navigation type (POP, PUSH 등)
  const { pathname } = useLocation();       // 현재 페이지 경로
  const storageKey = `scroll-performance-${pathname}`; // 페이지별 세션 key

  // 자체 롤백 기능 끄기
  useEffect(() => {
    history.scrollRestoration = "manual";
  })

  // 새로고침 체크
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("force-refresh", "true");  // 새로고침 표시
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // 스크롤 위치 복구
  useEffect(() => {
    const isRefresh = sessionStorage.getItem("force-refresh") === "true"; // 새로고침 여부
    const savedPercent = sessionStorage.getItem(storageKey); // 이전 스크롤 위치(%)

    if (!isRefresh && navigationType === "POP" && savedPercent) {
      // 뒤로가기 & 세션 존재 시 위치 복원
      const restoreScroll = (attempt = 0) => {
        if (attempt > 10) return; // 최대 10회 시도
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const targetScroll = scrollHeight * Number(savedPercent); // 목표 스크롤 위치
        window.scrollTo(0, targetScroll);

        // 스크롤 위치가 목표와 다르면 다음 프레임에서 재시도
        if (Math.abs(window.scrollY - targetScroll) > 5) {
          requestAnimationFrame(() => restoreScroll(attempt + 1));
        }
      };
      requestAnimationFrame(() => restoreScroll());
    } else {
      // 새로고침 또는 뒤로가기 아닌 경우 상단으로 이동
      window.scrollTo(0, 0);
    }

    sessionStorage.removeItem("force-refresh"); // 새로고침 표시 제거
  }, [navigationType, storageKey]);

  // 스크롤 감지
  useEffect(() => {
    finished.current = !hasMore;

    // 세션 저장 (스크롤 %)
    const saveScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      const now = Date.now();
      if (now - lastCalled.current >= 100) { // 100ms 쓰로틀링
        lastCalled.current = now;
        sessionStorage.setItem(storageKey, String(percent));
      }
    };

    // 무한 스크롤
    const handleInfinite = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight - scrollTop <= 10) {  // 하단 근접
        callback(); // 데이터 추가 로드
        if (!hasMore) finished.current = true;
      }
    };

    // 이벤트 등록
    window.addEventListener("scroll", saveScroll);   // 스크롤 시 위치 저장
    window.addEventListener("click", saveScroll);    // 클릭 시 위치 저장 (DOM 변화 고려)
    window.addEventListener("scroll", handleInfinite); // 무한 스크롤 체크

    return () => {
      window.removeEventListener("scroll", saveScroll);
      window.removeEventListener("click", saveScroll);
      window.removeEventListener("scroll", handleInfinite);
    };
  }, [callback, hasMore, storageKey]);
}

export default useInfiniteScroll;