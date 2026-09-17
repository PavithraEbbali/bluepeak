'use client';

import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';

/**
 * Depth parallax for background layers. `speed` is the total travel in pixels
 * across the element's full pass through the viewport; negative values move the
 * layer against the scroll direction.
 */
export default function Parallax({
  children,
  speed = 80,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <div ref={ref} className={className}>
      <m.div style={reduced ? undefined : { y }} className="h-full w-full">
        {children}
      </m.div>
    </div>
  );
}
