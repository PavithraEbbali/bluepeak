import type { ReactNode } from 'react';

/**
 * Infinite ticker. The track holds the same list twice and translates -50%,
 * so the seam is invisible. Pure CSS animation on a single transform, which
 * keeps it off the main thread and out of the JS bundle entirely.
 */
export default function Marquee({
  items,
  durationSeconds = 38,
  className = '',
  separator,
  reverse = false,
}: {
  items: string[];
  durationSeconds?: number;
  className?: string;
  separator?: ReactNode;
  reverse?: boolean;
}) {
  const half = (
    <ul className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li
          key={`${item}-${i}`}
          className="flex shrink-0 items-center whitespace-nowrap px-5 text-[13px] font-semibold tracking-tight sm:px-7 sm:text-sm"
        >
          <span
            aria-hidden="true"
            className="mr-4 h-1.5 w-1.5 shrink-0 rounded-full bg-sun-500"
          />
          {item}
          {separator}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`mask-fade-x overflow-hidden ${className}`}>
      <div
        className="marquee-track animate-marquee"
        style={
          {
            '--marquee-duration': `${durationSeconds}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          } as React.CSSProperties
        }
      >
        {half}
        {/* Duplicate is decorative; screen readers read the list once. */}
        <div aria-hidden="true" className="flex">
          {half}
        </div>
      </div>
    </div>
  );
}
