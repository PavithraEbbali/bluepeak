'use client';

import { coverage, images, site } from '@/lib/content';
import PhotoBackdrop from '@/components/primitives/PhotoBackdrop';
import { Reveal } from '@/components/primitives/Reveal';
import { SectionHead } from '@/components/primitives/Section';
import ZipChecker from './ZipChecker';

/**
 * Availability, rebuilt around address verification rather than a directory.
 *
 * Two earlier passes tried to present 31 communities as a browsable list, and
 * both read as filler. The reference sites do not carry one at all: they put a
 * ZIP field front and centre and route everything else to the phone, because a
 * visitor wants an answer about *their* address, not a list of towns. The
 * communities stay on the page as a single quiet line — useful for local search,
 * no longer pretending to be the point of the section.
 */
export default function Coverage() {
  const totalCities = coverage.states.reduce(
    (sum, s) => sum + s.cities.length,
    0,
  );

  const stats = [
    { value: String(coverage.states.length), label: 'States served' },
    { value: `${totalCities}+`, label: 'Communities' },
    { value: 'FTTH', label: 'Fiber to the home' },
  ];

  const allCities = coverage.states.flatMap((s) => s.cities);

  return (
    <section id="coverage" className="scroll-mt-28">
      <PhotoBackdrop image={images.coverage} overlay="even">
        <div className="section shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHead
              eyebrow={coverage.eyebrow}
              heading={coverage.heading}
              intro={coverage.intro}
              onDark
              align="center"
            />

            {/* ---- The actual job of this section --------------------- */}
            <Reveal delay={0.16}>
              <div className="mx-auto mt-10 max-w-xl text-left">
                <ZipChecker onDark />
              </div>

              <p className="mt-4 text-[13.5px] font-medium text-white/60">
                {coverage.note} Or call{' '}
                {/* Vertical padding on an inline element grows the tap target
                    without changing the line box, so the sentence still flows. */}
                <a
                  href={site.phoneHref}
                  data-call-cta
                  className="py-2 font-bold text-white underline underline-offset-4 transition-colors hover:text-teal-300"
                >
                  {site.phoneDisplay}
                </a>
              </p>
            </Reveal>
          </div>

          {/* ---- Footprint at a glance -------------------------------- */}
          <Reveal delay={0.2}>
            <dl className="mx-auto mt-14 grid max-w-3xl gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-navy/60 px-6 py-7 text-center backdrop-blur-sm"
                >
                  <span
                    aria-hidden="true"
                    className="mx-auto block h-[3px] w-8 rounded-full bg-sun-500"
                  />
                  <dd className="mt-4 text-[34px] font-black leading-none tracking-[-0.03em] text-white">
                    {stat.value}
                  </dd>
                  <dt className="mt-2 text-[12px] font-black uppercase tracking-[0.12em] text-white/55">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* ---- Quiet line for local search -------------------------- */}
          <Reveal delay={0.24}>
            <div className="mx-auto mt-10 max-w-4xl text-center">
              <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-white/50">
                {coverage.states.map((s) => s.state).join(' · ')}
              </p>
              <p className="mt-3 text-[12.5px] leading-relaxed text-white/40">
                Including {allCities.join(', ')}.
              </p>
            </div>
          </Reveal>
        </div>
      </PhotoBackdrop>
    </section>
  );
}
