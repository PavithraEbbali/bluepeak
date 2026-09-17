'use client';

import { ctaLabelFor, site, type PlanItem } from '@/lib/content';
import MagneticButton from './MagneticButton';

function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 16.9v2.6a1.8 1.8 0 0 1-2 1.8 17.6 17.6 0 0 1-7.7-2.7 17.3 17.3 0 0 1-5.3-5.3A17.6 17.6 0 0 1 3.3 5.6 1.8 1.8 0 0 1 5.1 3.6h2.6a1.8 1.8 0 0 1 1.8 1.6c.1.9.3 1.7.6 2.5a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14.2 14.2 0 0 0 5.3 5.3l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.5 2.5.6a1.8 1.8 0 0 1 1.6 1.8Z" />
    </svg>
  );
}

export interface CallButtonProps {
  /**
   * When a plan is supplied the label is derived from it: priced plans read
   * "Call to order", plans without a published price read "Call for pricing".
   * Remove a price in lib/content.ts and the button relabels itself.
   */
  plan?: PlanItem;
  label?: string;
  variant?: 'primary' | 'navy' | 'ghost' | 'ghost-dark';
  className?: string;
  full?: boolean;
  showNumber?: boolean;
  magnetic?: boolean;
}

const VARIANTS = {
  primary: 'btn btn-primary',
  navy: 'btn btn-navy',
  ghost: 'btn btn-ghost',
  'ghost-dark': 'btn btn-ghost-dark',
} as const;

/**
 * Every `tel:` CTA on the site routes through here, which is what guarantees
 * the `data-call-cta` attribute is present on all of them for call tracking.
 */
export default function CallButton({
  plan,
  label,
  variant = 'primary',
  className = '',
  full = false,
  showNumber = false,
  magnetic = true,
}: CallButtonProps) {
  const text = label ?? (plan ? ctaLabelFor(plan) : 'Call to order');
  const classes = `${VARIANTS[variant]} ${full ? 'w-full' : ''} ${className}`.trim();

  const inner = (
    <>
      <PhoneIcon className="h-[18px] w-[18px] shrink-0" />
      <span>{text}</span>
      {showNumber && (
        <span className="hidden opacity-80 sm:inline">{site.phoneDisplay}</span>
      )}
    </>
  );

  const shared = {
    href: site.phoneHref,
    'data-call-cta': true,
    'aria-label': `${text} — ${site.phoneDisplay}`,
  } as const;

  if (!magnetic) {
    return (
      <a {...shared} className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <MagneticButton {...shared} className={classes}>
      {inner}
    </MagneticButton>
  );
}
