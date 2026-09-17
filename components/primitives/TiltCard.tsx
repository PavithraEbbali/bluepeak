'use client';

import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { ReactNode } from 'react';
import { useCallback, useRef } from 'react';

/**
 * Plan-card shell with a 3D tilt that tracks the pointer, plus a soft specular
 * highlight that follows the cursor across the surface. Mouse input only, so
 * touch scrolling is never hijacked, and flat under prefers-reduced-motion.
 */
export default function TiltCard({
  children,
  className = '',
  max = 7,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  /* Normalised pointer position, -0.5 to 0.5 on each axis. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 180, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);

  const glareX = useTransform(px, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(py, [-0.5, 0.5], ['0%', '100%']);
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(0,141,187,0.12), transparent 62%)`;

  const opacity = useMotionValue(0);

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduced || event.pointerType !== 'mouse' || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      px.set((event.clientX - rect.left) / rect.width - 0.5);
      py.set((event.clientY - rect.top) / rect.height - 0.5);
      opacity.set(1);
    },
    [reduced, px, py, opacity],
  );

  const reset = useCallback(() => {
    px.set(0);
    py.set(0);
    opacity.set(0);
  }, [px, py, opacity]);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ perspective: 1100 }}
      className={className}
    >
      <m.div
        style={
          reduced
            ? undefined
            : { rotateX, rotateY, transformStyle: 'preserve-3d' }
        }
        className="relative h-full"
      >
        {children}

        {glare && !reduced && (
          <m.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ background: glareBg, opacity }}
          />
        )}
      </m.div>
    </div>
  );
}
