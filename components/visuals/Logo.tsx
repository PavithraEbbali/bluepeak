import { site } from '@/lib/content';

/**
 * Original retailer lockup drawn in the Bluepeak palette: three ascending
 * strands forming a peak. It deliberately is not a copy of Bluepeak's own mark,
 * and the "Authorized Retailer" line sits directly under the wordmark so the
 * relationship is legible wherever the logo appears.
 */
export default function Logo({
  onDark = false,
  className = '',
  showKicker = true,
}: {
  onDark?: boolean;
  className?: string;
  showKicker?: boolean;
}) {
  const wordmark = onDark ? 'text-white' : 'text-navy';
  const kicker = onDark ? 'text-teal-200/80' : 'text-teal-700/90';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="bp-mark" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#060048" />
            <stop offset="45%" stopColor="#034fab" />
            <stop offset="100%" stopColor="#008dbb" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill="url(#bp-mark)" />
        {/* Ascending strands that resolve into a peak. */}
        <path
          d="M9 27.5 L20 12.5 L31 27.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 27.5 L20 19.8 L25.5 27.5"
          fill="none"
          stroke="#87d5eb"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={`text-[19px] font-black tracking-[-0.03em] ${wordmark}`}
        >
          {site.brand}
        </span>
        {showKicker && (
          <span
            className={`mt-1 text-[10.5px] font-bold uppercase tracking-[0.14em] sm:text-[9.5px] sm:tracking-[0.15em] ${kicker}`}
          >
            Authorized Retailer
          </span>
        )}
      </span>
    </span>
  );
}
