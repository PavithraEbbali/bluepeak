import type { PlanItem } from '@/lib/content';

type Size = 'hero' | 'card' | 'compact';

const SIZES: Record<Size, { int: string; sign: string; cents: string; per: string }> = {
  /* Dominant integer stays inside the 2.5rem - 3.5rem band at every breakpoint. */
  hero: {
    int: 'text-[clamp(2.75rem,9vw,3.5rem)]',
    sign: 'text-[clamp(1.25rem,3.5vw,1.6rem)]',
    cents: 'text-[clamp(1rem,2.6vw,1.2rem)]',
    per: 'text-[13px]',
  },
  card: {
    int: 'text-[clamp(2.5rem,8vw,3.25rem)]',
    sign: 'text-[clamp(1.15rem,3vw,1.45rem)]',
    cents: 'text-[clamp(0.95rem,2.4vw,1.1rem)]',
    per: 'text-[13px]',
  },
  compact: {
    int: 'text-[2.5rem]',
    sign: 'text-[1.1rem]',
    cents: 'text-[0.95rem]',
    per: 'text-[12px]',
  },
};

export interface PriceLockupProps {
  plan: PlanItem;
  size?: Size;
  /** `true` on dark backgrounds (hero, footer). */
  onDark?: boolean;
  /** Hides the qualifier line under the number. */
  hideQualifier?: boolean;
  className?: string;
}

/**
 * The single price renderer for the whole site. Hero anchor, plan cards and the
 * comparison table all come through here, so a price change in lib/content.ts
 * shows up everywhere identically and nothing can drift out of sync.
 *
 * Plans with no published price render a "Call for pricing" lockup instead,
 * which is what Bluepeak TV and the bundles use.
 */
export default function PriceLockup({
  plan,
  size = 'card',
  onDark = false,
  hideQualifier = false,
  className = '',
}: PriceLockupProps) {
  const s = SIZES[size];
  const muted = onDark ? 'text-white/60' : 'text-navy/55';
  const solid = onDark ? 'text-white' : 'text-navy';

  if (typeof plan.price !== 'number') {
    return (
      <div className={className}>
        <div className={`font-black leading-none tracking-tight ${solid} text-[clamp(1.5rem,5vw,1.9rem)]`}>
          Call for pricing
        </div>
        {!hideQualifier && (
          <p className={`mt-2 text-[13px] font-medium ${muted}`}>
            {plan.channelCount
              ? `${plan.channelCount} — lineup and rate vary by address`
              : 'Rate depends on your address and package'}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-start gap-1">
        <span
          className={`${s.sign} mt-[0.42em] font-bold leading-none ${muted}`}
          aria-hidden="true"
        >
          $
        </span>

        <span
          className={`${s.int} font-black leading-[0.85] tracking-[-0.035em] ${solid}`}
        >
          {plan.price}
        </span>

        <span className={`${s.cents} mt-[0.5em] font-bold leading-none ${muted}`}>
          {plan.cents ?? '00'}
        </span>

        <span className={`${s.per} mt-[1.35em] ml-1 font-bold leading-none ${muted}`}>
          /mo
        </span>
      </div>

      {!hideQualifier && plan.promoQualifier && (
        <p className={`mt-2 text-[13px] font-medium ${muted}`}>
          {plan.promoQualifier}
          {plan.priceLock ? ` · ${plan.priceLock.replace(' included', '')}` : ''}
        </p>
      )}

      {/* Screen readers get the whole figure as one sentence. */}
      <span className="sr-only">
        {`${plan.price} dollars and ${plan.cents ?? '00'} cents per month${
          plan.promoQualifier ? ` ${plan.promoQualifier}` : ''
        }`}
      </span>
    </div>
  );
}
