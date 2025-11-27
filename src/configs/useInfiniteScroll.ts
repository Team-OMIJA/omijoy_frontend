import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function useInfiniteScroll(callback: () => void, hasMore: boolean) {
  const lastCalled = useRef(0);
  const finished = useRef(false);
  const navigationType = useNavigationType();
  const { pathname } = useLocation();
  const storageKey = `scroll-performance-${pathname}`;

  // 새로고침 체크
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("force-refresh", "true");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // 스크롤 위치 복구
  useEffect(() => {
    const isRefresh = sessionStorage.getItem("force-refresh") === "true";
    const savedPercent = sessionStorage.getItem(storageKey);

    if (!isRefresh && navigationType === "POP" && savedPercent) {
      const restoreScroll = (attempt = 0) => {
        if (attempt > 10) return; // 최대 10회 시도
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const targetScroll = scrollHeight * Number(savedPercent);
        window.scrollTo(0, targetScroll);

        // 스크롤 위치가 정확하지 않으면 다음 프레임에 재시도
        if (Math.abs(window.scrollY - targetScroll) > 5) {
          requestAnimationFrame(() => restoreScroll(attempt + 1));
        }
      };
      requestAnimationFrame(() => restoreScroll());
    } else {
      window.scrollTo(0, 0);
    }

    sessionStorage.removeItem("force-refresh");
  }, [navigationType, storageKey]);

  // 스크롤 감지
  useEffect(() => {
    finished.current = !hasMore;

    const saveScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      const now = Date.now();
      if (now - lastCalled.current >= 100) { // 100ms 쓰로틀링
        lastCalled.current = now;
        sessionStorage.setItem(storageKey, String(percent));
        // 디버깅용
        console.log("Scroll percent saved:", percent);
      }
    };

    const handleInfinite = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight - scrollTop <= 10) {
        callback();
        if (!hasMore) finished.current = true;
      }
    };

    window.addEventListener("scroll", saveScroll);
    window.addEventListener("click", saveScroll);
    window.addEventListener("scroll", handleInfinite);

    return () => {
      window.removeEventListener("scroll", saveScroll);
      window.removeEventListener("click", saveScroll);
      window.removeEventListener("scroll", handleInfinite);
    };
  }, [callback, hasMore, storageKey]);
}

export default useInfiniteScroll;