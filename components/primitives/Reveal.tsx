'use client';

import { m, type Variants } from 'framer-motion';
import type { ComponentType, ElementType, ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Tags these helpers can render as. `m` is a proxy that memoises each tag, so
 * looking a component up this way is safe. Calling `m(tag)` during render would
 * mint a brand new component every pass and remount the subtree.
 */
export type MotionTag =
  | 'div'
  | 'section'
  | 'article'
  | 'ul'
  | 'ol'
  | 'li'
  | 'p'
  | 'span'
  | 'h2'
  | 'h3'
  | 'figure';

const motionTag = (tag: MotionTag): ComponentType<Record<string, unknown>> =>
  (m as unknown as Record<MotionTag, ComponentType<Record<string, unknown>>>)[tag];

/* -------------------------------------------------------------------------- */
/* Scroll-triggered reveal                                                    */
/* -------------------------------------------------------------------------- */

export function Reveal({
  children,
  delay = 0,
  y = 22,
  once = true,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
  as?: MotionTag;
}) {
  const Tag = motionTag(as);

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/* Staggered grid entrance                                                    */
/* -------------------------------------------------------------------------- */

const groupVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.085, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

export function StaggerGroup({
  children,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
}) {
  const Tag = motionTag(as);

  return (
    <Tag
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
}) {
  const Tag = motionTag(as);

  return (
    <Tag className={className} variants={itemVariants}>
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/* Word-by-word headline reveal                                               */
/* -------------------------------------------------------------------------- */

const wordGroup = (delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
});

const wordVariants: Variants = {
  hidden: { y: '105%' },
  show: { y: '0%', transition: { duration: 0.85, ease: EASE } },
};

/** Index range of `phrase` within `words`, or null when it is not present. */
function findPhrase(words: string[], phrase?: string) {
  if (!phrase) return null;

  const norm = (s: string) => s.replace(/[^\w-]/g, '').toLowerCase();
  const target = phrase.split(' ').map(norm);

  for (let i = 0; i <= words.length - target.length; i += 1) {
    if (target.every((t, j) => norm(words[i + j]) === t)) {
      return { start: i, end: i + target.length };
    }
  }
  return null;
}

export function WordReveal({
  text,
  className = '',
  delay = 0,
  highlight,
  highlightClassName = 'text-sun-400',
  as: Tag = 'h2' as ElementType,
}: {
  text: string;
  className?: string;
  delay?: number;
  /** Phrase within `text` to pick out. Ignored if it is not found verbatim. */
  highlight?: string;
  highlightClassName?: string;
  as?: ElementType;
}) {
  const words = text.split(' ');
  const range = findPhrase(words, highlight);

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>

      {/*
        The viewport trigger lives on this wrapper rather than on each word.
        Each word starts translated fully below its own overflow-hidden mask,
        so an observer attached to the word itself would measure a zero-area
        intersection, never fire, and leave the headline permanently hidden.
        The wrapper is never clipped, so it always reports honestly.
      */}
      <m.span
        aria-hidden="true"
        className="block"
        variants={wordGroup(delay)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom"
          >
            <m.span
              className={`inline-block ${
                range && i >= range.start && i < range.end
                  ? highlightClassName
                  : ''
              }`}
              variants={wordVariants}
            >
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </m.span>
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
