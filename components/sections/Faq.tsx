'use client';

import { faqs } from '@/lib/content';
import CallButton from '@/components/primitives/CallButton';
import { Reveal } from '@/components/primitives/Reveal';
import { SectionHead } from '@/components/primitives/Section';
import AmbientShades from '@/components/visuals/AmbientShades';
import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

function Row({
  item,
  index,
  open,
  onToggle,
}: {
  item: { q: string; a: string };
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <li className="border-b border-navy/10 last:border-b-0">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-5 py-5 text-left transition-colors duration-200 hover:text-teal-700 sm:py-6"
        >
          <span className="text-[16px] font-bold leading-snug text-navy sm:text-[17px]">
            {item.q}
          </span>

          <span
            aria-hidden="true"
            className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-navy/15 transition-[transform,background-color,border-color] duration-400 ease-brand ${
              open
                ? 'rotate-45 border-teal-500 bg-teal-500 text-white'
                : 'bg-white text-navy'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key={panelId}
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-6 pr-10 text-[15px] leading-relaxed text-navy/70">
              {item.a}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section relative scroll-mt-28 overflow-hidden bg-bone"
    >
      <AmbientShades />
      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHead
              eyebrow="Questions"
              heading="Frequently asked questions"
              intro="Equipment, installation and speeds, answered in detail."
            />

            <Reveal delay={0.15}>
              <div className="mt-8 rounded-2xl border border-navy/10 bg-white p-6">
                <p className="text-[15px] font-bold text-navy">
                  Still deciding on a speed?
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-navy/65">
                  Tell us how many people and devices share the house and we
                  will point you at the right tier.
                </p>
                <CallButton
                  label="Call to order"
                  variant="navy"
                  full
                  magnetic={false}
                  className="mt-5"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ul className="rounded-2xl border border-navy/10 bg-white px-6 sm:px-8">
              {faqs.map((item, i) => (
                <Row
                  key={item.q}
                  item={item}
                  index={i}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
