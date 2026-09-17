'use client';

import {
  m,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { Reveal, WordReveal } from './Reveal';

/**
 * Clip-path wipe used on the boundary between major sections. The top edge
 * enters on a slant and levels out as the section is scrubbed into view.
 */
export function ClipWipe({
  children,
  className = '',
  angle = 9,
}: {
  children: ReactNode;
  className?: string;
  /** Starting slant of the top edge, in percent of section height. */
  angle?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 45%'],
  });

  const a = useTransform(scrollYProgress, [0, 1], [angle, 0]);
  const clipPath = useMotionTemplate`polygon(0% ${a}%, 100% 0%, 100% 100%, 0% 100%)`;

  return (
    <m.div
      ref={ref}
      className={className}
      style={reduced ? undefined : { clipPath }}
    >
      {children}
    </m.div>
  );
}

/* -------------------------------------------------------------------------- */

export function SectionHead({
  eyebrow,
  heading,
  intro,
  onDark = false,
  align = 'left',
  className = '',
}: {
  eyebrow?: string;
  heading: string;
  intro?: string;
  onDark?: boolean;
  align?: 'left' | 'center';
  className?: string;
}) {
  const centered = align === 'center';

  return (
    <div
      className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <p
            className={`eyebrow ${onDark ? 'text-teal-300' : 'text-teal-600'} ${
              centered ? 'justify-center' : ''
            }`}
          >
            {/* Gold tick that opens every section label. */}
            <span
              aria-hidden="true"
              className="h-[3px] w-7 rounded-full bg-sun-500"
            />
            {eyebrow}
          </p>
        </Reveal>
      )}

      <WordReveal
        text={heading}
        as="h2"
        delay={0.05}
        className={`mt-4 text-display-sm font-black ${
          onDark ? 'text-white' : 'text-navy'
        }`}
      />

      {intro && (
        <Reveal delay={0.12}>
          <p
            className={`mt-5 text-[17px] leading-relaxed ${
              onDark ? 'text-white/70' : 'text-navy/70'
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
