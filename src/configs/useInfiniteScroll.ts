import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function useInfiniteScroll(callback: () => void, hasMore: boolean) {
  const lastCalled = useRef<number>(0);
  const finished = useRef(false);
  const navigationType = useNavigationType();
  const { pathname } = useLocation();

  const storageKey = `scroll-performance-${pathname}`;

  // 뒤로가기 시 직전 페이지 위치 복원
  useEffect(() => {
    if (navigationType === "POP") {
      const savedY = sessionStorage.getItem("scroll-performance-prev");
      if (savedY) {
        requestAnimationFrame(() => {
          window.scrollTo(0, Number(savedY));
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [navigationType]);

  // 스크롤 이벤트 기록
  useEffect(() => {
    finished.current = !hasMore;

    const handleScroll = () => {
      if (!hasMore || finished.current) return;

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      // 현재 페이지 스크롤 저장
      sessionStorage.setItem(storageKey, String(scrollTop));

      if (scrollHeight - scrollTop <= clientHeight + 10) {
        const now = Date.now();
        if (now - lastCalled.current >= 200) {
          lastCalled.current = now;
          callback();
          if (!hasMore) finished.current = true;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      // 페이지 이동 직전에 현재 위치를 prev에 저장
      sessionStorage.setItem("scroll-performance-prev", String(window.scrollY));
      window.removeEventListener("scroll", handleScroll);
    };
  }, [callback, hasMore, storageKey]);
}

export default useInfiniteScroll;
