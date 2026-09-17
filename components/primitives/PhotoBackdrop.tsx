import Image from 'next/image';
import type { ReactNode } from 'react';
import type { SiteImage } from '@/lib/content';

/**
 * Full-bleed photographic section background.
 *
 * The overlay is doing real work, not decoration: every one of these sections
 * puts white text over a photograph, so the scrim has to hold legible contrast
 * no matter which part of the image ends up behind a given line.
 *
 *  - `left`  weights the darkness to the left, for the hero, where the copy
 *            sits in one column and the photograph should stay visible in the
 *            other.
 *  - `even`  darkens the whole frame, for sections whose content spans the
 *            full width.
 *  - `soft`  protects only the heading at the top and then lets the photograph
 *            through. Use it where the content below carries its own opaque
 *            backing, since nothing else is holding the contrast.
 */
export default function PhotoBackdrop({
  image,
  overlay = 'even',
  children,
  className = '',
  priority = false,
}: {
  image: SiteImage;
  overlay?: 'left' | 'even' | 'soft';
  children: ReactNode;
  className?: string;
  priority?: boolean;
}) {
  /* The left-weighted scrim only makes sense once the copy sits in its own
     column. Below lg the content spans the full width, so it falls back to an
     even wash that protects text wherever it lands. */
  const SCRIMS = {
    left: 'bg-[linear-gradient(180deg,rgba(6,0,72,0.93)_0%,rgba(6,0,72,0.88)_55%,rgba(6,0,72,0.93)_100%)] lg:bg-[linear-gradient(100deg,rgba(6,0,72,0.97)_0%,rgba(6,0,72,0.93)_34%,rgba(6,0,72,0.72)_58%,rgba(6,0,72,0.46)_100%)]',
    even: 'bg-[linear-gradient(180deg,rgba(6,0,72,0.90)_0%,rgba(6,0,72,0.84)_50%,rgba(6,0,72,0.92)_100%)] lg:bg-[linear-gradient(180deg,rgba(6,0,72,0.82)_0%,rgba(6,0,72,0.70)_48%,rgba(6,0,72,0.86)_100%)]',
    soft: 'bg-[linear-gradient(180deg,rgba(6,0,72,0.88)_0%,rgba(6,0,72,0.66)_26%,rgba(6,0,72,0.42)_100%)] lg:bg-[linear-gradient(180deg,rgba(6,0,72,0.82)_0%,rgba(6,0,72,0.48)_26%,rgba(6,0,72,0.24)_58%,rgba(6,0,72,0.34)_100%)]',
  } as const;

  const scrim = SCRIMS[overlay];

  return (
    <div className={`relative isolate overflow-hidden bg-navy ${className}`}>
      <Image
        src={image.src}
        alt=""
        aria-hidden="true"
        fill
        priority={priority}
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: image.position ?? '50% 50%' }}
      />

      <div aria-hidden="true" className={`absolute inset-0 -z-10 ${scrim}`} />

      {children}
    </div>
  );
}
