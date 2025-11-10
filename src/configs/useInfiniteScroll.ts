import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback: () => void, hasMore: boolean) {
  const lastCalled = useRef<number>(0);
  const finished = useRef(false);

  useEffect(() => {
    finished.current = !hasMore;

    const handleScroll = () => {
      if (!hasMore || finished.current) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollHeight - scrollTop <= clientHeight + 10) {
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
  }, [callback, hasMore]);
}
