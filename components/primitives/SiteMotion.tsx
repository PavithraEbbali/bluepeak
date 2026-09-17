'use client';

import { LazyMotion, domAnimation } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';

/**
 * Wraps the page in two things:
 *
 *  1. Lenis smooth scrolling (skipped entirely when the visitor asks for
 *     reduced motion, and torn down on unmount).
 *  2. framer-motion's LazyMotion with only the `domAnimation` feature bundle,
 *     which is why every animated element in this project is an `m.*` element
 *     rather than `motion.*`. It keeps roughly 25kb of gzipped JS off the
 *     critical path, which matters for the PageSpeed budget.
 */
export default function SiteMotion({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    let lenis: import('lenis').default | null = null;
    let raf = 0;
    let cancelled = false;

    // Code-split Lenis so it never blocks first paint.
    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });

      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    /* Anchor clicks must go through Lenis, otherwise the native jump and the
       smooth-scroll loop fight each other. */
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -112, duration: 1.1 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      history.replaceState(null, '', id);
    };

    document.addEventListener('click', onClick);

    return () => {
      cancelled = true;
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
