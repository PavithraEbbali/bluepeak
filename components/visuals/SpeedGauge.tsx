'use client';

import { m, useReducedMotion } from 'framer-motion';

const CX = 100;
const CY = 96;
const R = 78;
const ARC = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

/**
 * The gold speed gauge from mybluepeak.com: a half-round dial whose arc fills
 * in proportion to the plan's speed against the fastest plan in the lineup, so
 * 1 Gig reads as a short sweep and 5 Gig fills the dial.
 *
 * This is the main carrier of the Bluepeak gold (#ebab32) across the site.
 */
export default function SpeedGauge({
  speedMbps,
  maxMbps,
  onBlue = false,
  compact = false,
  className = '',
}: {
  speedMbps: number;
  maxMbps: number;
  onBlue?: boolean;
  /** Smaller dial for inline use, such as the hero's plan bar. */
  compact?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();

  /* Floor the sweep so the smallest tier still reads as a dial, not a dot. */
  const pct = Math.max(0.16, Math.min(1, speedMbps / maxMbps));
  const gigs = speedMbps / 1000;

  return (
    <div
      className={`relative mx-auto w-full ${
        compact ? 'max-w-[86px]' : 'max-w-[184px]'
      } ${className}`}
    >
      <svg viewBox="0 0 200 108" className="w-full" aria-hidden="true">
        {/* Track */}
        <path
          d={ARC}
          fill="none"
          stroke={onBlue ? 'rgba(255,255,255,0.18)' : 'rgba(6,0,72,0.10)'}
          strokeWidth={compact ? 16 : 13}
          strokeLinecap="round"
        />

        {/* Value */}
        <m.path
          d={ARC}
          fill="none"
          stroke="#ebab32"
          strokeWidth={compact ? 16 : 13}
          strokeLinecap="round"
          initial={{ pathLength: reduced ? pct : 0 }}
          whileInView={{ pathLength: pct }}
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {/* Label sits in the mouth of the dial. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-baseline justify-center gap-1">
        <span
          className={`font-black leading-none tracking-[-0.04em] ${
            compact ? 'text-[19px]' : 'text-[36px]'
          } ${onBlue ? 'text-white' : 'text-navy'}`}
        >
          {gigs}
        </span>
        <span
          className={`font-black leading-none ${
            compact ? 'text-[10px]' : 'text-[15px]'
          } ${onBlue ? 'text-white/80' : 'text-navy/70'}`}
        >
          Gig
        </span>
      </div>

      <span className="sr-only">
        {gigs} gigabit download and upload speed
      </span>
    </div>
  );
}
