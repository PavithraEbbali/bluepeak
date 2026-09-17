'use client';

import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { useCallback, useRef } from 'react';

/**
 * React's drag/animation handler types clash with framer-motion's own gesture
 * handlers of the same name, so they are dropped from the surface we forward.
 */
type ForwardedAnchorProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragExit'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDrop'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'style'
>;

interface MagneticButtonProps extends ForwardedAnchorProps {
  children: ReactNode;
  /** How far the button chases the cursor, as a fraction of the offset. */
  strength?: number;
  className?: string;
}

/**
 * CTA wrapper that leans toward the pointer while it is over the button and
 * springs back on exit. The inner label drifts slightly further than the shell,
 * which is what sells the effect. Pointer-only, and inert under
 * prefers-reduced-motion.
 */
export default function MagneticButton({
  children,
  strength = 0.32,
  className = '',
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { stiffness: 260, damping: 20, mass: 0.35 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLAnchorElement>) => {
      if (reduced || event.pointerType !== 'mouse' || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);

      x.set(dx * strength);
      y.set(dy * strength);
    },
    [reduced, strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <m.a
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      {...rest}
    >
      <m.span
        className="pointer-events-none inline-flex items-center gap-2"
        style={{ x: sx, y: sy }}
      >
        {children}
      </m.span>
    </m.a>
  );
}
