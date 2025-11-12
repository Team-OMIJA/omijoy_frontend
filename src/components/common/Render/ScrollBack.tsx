import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function ScrollBack() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  useEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);

  return null;
}

export default ScrollBack