'use client';

import Image from 'next/image';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { SiteImage } from '@/lib/content';

/**
 * The hero photograph, with two layers of motion that never touch its colour:
 *
 *  - a slow Ken Burns push-in, running as a CSS transform so it costs no JS and
 *    stays on the compositor,
 *  - a scroll parallax, so the frame drifts more slowly than the copy over it.
 *
 * They are on separate elements on purpose. Both animate `transform`, and one
 * would overwrite the other if they shared a node.
 */
export default function HeroBackdrop({ image }: { image: SiteImage }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  return (
    <div ref={ref} className="absolute inset-0 -z-20 overflow-hidden">
      <m.div
        className="absolute inset-0"
        style={reduced ? undefined : { y }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${reduced ? '' : 'animate-ken-burns'}`}
          style={{ objectPosition: image.position ?? '50% 50%' }}
        />
      </m.div>
    </div>
  );
}
