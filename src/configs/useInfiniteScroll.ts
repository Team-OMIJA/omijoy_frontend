import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function useInfiniteScroll(callback: () => void, hasMore: boolean) {
  const lastCalled = useRef(0);
  const finished = useRef(false);
  const navigationType = useNavigationType();
  const { pathname } = useLocation();

  const storageKey = `scroll-performance-${pathname}`;

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("force-refresh", "true");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    const isRefresh = sessionStorage.getItem("force-refresh") === "true";
    const savedScroll = sessionStorage.getItem(storageKey);

    if (!isRefresh && navigationType === "POP") {
      if (savedScroll) {
        requestAnimationFrame(() =>
          window.scrollTo(0, Number(savedScroll))
        );
      }
    } else {
      window.scrollTo(0, 0);
    }

    sessionStorage.removeItem("force-refresh");
  }, [navigationType, storageKey]);

  useEffect(() => {
    finished.current = !hasMore;

    const handleScroll = () => {
      const scrollLocate = document.documentElement.scrollTop;
      sessionStorage.setItem(storageKey, String(scrollLocate));

      const { scrollHeight, clientHeight } = document.documentElement;
      if (scrollHeight - scrollLocate <= clientHeight + 1) {
        const now = Date.now();
        if (now - lastCalled.current >= 1) {
          lastCalled.current = now;
          callback();
          if (!hasMore) finished.current = true;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, hasMore, storageKey]);
}

export default useInfiniteScroll;