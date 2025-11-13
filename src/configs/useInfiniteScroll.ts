import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function useInfiniteScroll(callback: () => void, hasMore: boolean) {
  const lastCalled = useRef<number>(0);
  const finished = useRef(false);
  const navigationType = useNavigationType();
  const { pathname } = useLocation();

  const storageKey = `scroll-performance-${pathname}`;

  useEffect(() => {
    if (navigationType === "POP") {
      const savedScroll = sessionStorage.getItem("scroll-performance-prev");
      if (savedScroll) {
        requestAnimationFrame(() => {
          window.scrollTo(0, Number(savedScroll));
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [navigationType]);

  useEffect(() => {
    finished.current = !hasMore;

    const handleScroll = () => {
    const scrollY = document.documentElement.scrollTop;

    sessionStorage.setItem(storageKey, String(scrollY));

    sessionStorage.setItem("scroll-performance-prev", String(scrollY));

    const { scrollHeight, clientHeight } = document.documentElement;
      if (scrollHeight - scrollY <= clientHeight + 10) {
        const now = Date.now();
        if (now - lastCalled.current >= 10) {
          lastCalled.current = now;
          callback();
          if (!hasMore) finished.current = true;
        }
      }
    };

    window.addEventListener('load', () => {
      window.scrollTo(0, 0);
    });

    return () => {
      sessionStorage.setItem("scroll-performance-prev", String(window.scrollY));
      window.removeEventListener("scroll", handleScroll);
    };
  }, [callback, hasMore, storageKey]);
}

export default useInfiniteScroll;