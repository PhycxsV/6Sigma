import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollWindowToTop } from '../utils/scrollToTop';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    scrollWindowToTop();

    const rafId = requestAnimationFrame(scrollWindowToTop);
    const afterTransition = setTimeout(scrollWindowToTop, 350);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(afterTransition);
    };
  }, [pathname]);

  return null;
}
