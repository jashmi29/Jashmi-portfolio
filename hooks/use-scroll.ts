'use client';

import * as React from 'react';

/**
 * Tracks scroll progress (0–1) of the whole document.
 */
export function useScrollProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let raf = 0;
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
      });
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
      cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}

/**
 * ScrollSpy — returns the id of the section currently in view.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = React.useState(ids[0]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/**
 * Returns a boolean for whether the user has scrolled past a threshold,
 * and the scroll direction ('up' | 'down'). Used for nav hide/show.
 */
export function useScrollDirection(threshold = 80) {
  const [hidden, setHidden] = React.useState(false);
  const [atTop, setAtTop] = React.useState(true);

  React.useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setAtTop(y < 20);
        if (Math.abs(y - lastY) < 10) return;
        setHidden(y > threshold && y > lastY);
        lastY = y;
      });
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
      cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return { hidden, atTop };
}
