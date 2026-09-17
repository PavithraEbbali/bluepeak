'use client';

import { navLinks, site } from '@/lib/content';
import Logo from '@/components/visuals/Logo';
import CallButton from '@/components/primitives/CallButton';
import { m, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M3.5 7h17" />
          <path d="M3.5 12h17" />
          <path d="M3.5 17h17" />
        </>
      )}
    </svg>
  );
}

/**
 * The persistent top chrome: the retailer disclosure bar and the sticky header
 * stacked together, so the disclosure stays on screen for the whole session
 * rather than scrolling away.
 *
 * Nav links come from lib/content.ts and only exist for service lines that have
 * plans, so removing a service line removes its nav entry automatically.
 */
export default function TopChrome() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 12));

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {/* --- Disclosure bar: persistent, non-dismissable ------------------ */}
      <div className="bg-navy text-white">
        <div className="shell flex min-h-[38px] items-center justify-center gap-2 py-2 text-center">
          <span
            aria-hidden="true"
            className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400 sm:block"
          />
          <p className="text-[11px] font-semibold leading-tight tracking-[0.02em] text-white/90 sm:text-[12px]">
            {site.disclosure}
          </p>
        </div>
      </div>

      {/* --- Sticky header ------------------------------------------------ */}
      <m.header
        className={`border-b transition-[background-color,box-shadow,border-color] duration-300 ease-brand ${
          scrolled
            ? 'border-navy/10 bg-white/90 shadow-[0_8px_30px_-18px_rgba(6,0,72,0.4)] backdrop-blur-xl'
            : 'border-transparent bg-white'
        }`}
      >
        <div className="shell flex h-[64px] items-center justify-between gap-4">
          <a
            href="#hero"
            className="shrink-0"
            aria-label={`${site.brand} Authorized Retailer, back to top`}
          >
            <Logo />
          </a>

          <nav
            aria-label="Sections"
            className="hidden items-center gap-1 lg:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-[14px] font-semibold text-navy/70 transition-colors duration-200 hover:bg-bone hover:text-navy"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Header CTA shows the number itself, per the nav/footer rule. */}
            <a
              href={site.phoneHref}
              data-call-cta
              className="btn btn-navy hidden !min-h-[44px] !px-5 !py-2.5 text-[14px] sm:inline-flex"
              aria-label={`Call ${site.phoneDisplay}`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 16.9v2.6a1.8 1.8 0 0 1-2 1.8 17.6 17.6 0 0 1-7.7-2.7 17.3 17.3 0 0 1-5.3-5.3A17.6 17.6 0 0 1 3.3 5.6 1.8 1.8 0 0 1 5.1 3.6h2.6a1.8 1.8 0 0 1 1.8 1.6c.1.9.3 1.7.6 2.5a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14.2 14.2 0 0 0 5.3 5.3l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.5 2.5.6a1.8 1.8 0 0 1 1.6 1.8Z" />
              </svg>
              {site.phoneDisplay}
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy/15 text-navy transition-colors hover:border-navy/40 lg:hidden"
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>

        {/* --- Mobile nav ------------------------------------------------- */}
        <div
          id="mobile-nav"
          hidden={!open}
          className="border-t border-navy/10 bg-white lg:hidden"
        >
          <div className="shell grid gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-[15px] font-semibold text-navy/80 transition-colors hover:bg-bone hover:text-navy"
              >
                {link.label}
              </a>
            ))}
            <CallButton
              label="Call to order"
              variant="navy"
              full
              magnetic={false}
              showNumber
              className="mt-2"
            />
          </div>
        </div>
      </m.header>

      {/* Gold rule under the nav, mirroring mybluepeak.com's header accent. */}
      <div aria-hidden="true" className="h-1 w-full bg-sun-500" />
    </div>
  );
}
