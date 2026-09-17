import {
  featuredPlan,
  formatSpeed,
  hero,
  heroPlan,
  images,
  marqueeItems,
  topSpeedGbps,
  topSpeedMbps,
} from '@/lib/content';
import CallButton from '@/components/primitives/CallButton';
import Marquee from '@/components/primitives/Marquee';
import PriceLockup from '@/components/primitives/PriceLockup';
import { Reveal, WordReveal } from '@/components/primitives/Reveal';
import HeroBackdrop from '@/components/visuals/HeroBackdrop';
import SpeedGauge from '@/components/visuals/SpeedGauge';
import ZipChecker from './ZipChecker';

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-teal-300"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/**
 * The photograph is the entire hero background, edge to edge, with no colour
 * cast over it.
 *
 * It does carry a shading layer, and that is not optional: measured across the
 * frame, the left fifth is its brightest region at luminance 155 (the window),
 * which is exactly where the copy sits. White text on that reads at roughly
 * 2.8:1 and fails WCAG AA. The shading is pure black — zero hue — so it darkens
 * without tinting, and the photograph keeps its own colour throughout.
 */
export default function Hero() {
  return (
    <section id="hero">
      <div className="relative isolate overflow-hidden bg-navy-950">
        <HeroBackdrop image={images.hero} />

        {/* Neutral black, weighted left on desktop where the copy sits, and
            even below lg where the content spans the full width. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.74)_55%,rgba(0,0,0,0.84)_100%)] lg:bg-[linear-gradient(95deg,rgba(0,0,0,0.90)_0%,rgba(0,0,0,0.82)_30%,rgba(0,0,0,0.48)_56%,rgba(0,0,0,0.06)_88%)]"
        />

        <div className="shell relative pb-14 pt-[120px] lg:min-h-[660px] lg:pb-20 lg:pt-[136px]">
          <div className="lg:max-w-[560px]">
            <Reveal y={14}>
              <p className="eyebrow text-teal-300">
                <span
                  aria-hidden="true"
                  className="h-[3px] w-7 rounded-full bg-sun-500"
                />
                {hero.eyebrow}
              </p>
            </Reveal>

            <WordReveal
              text={hero.headline}
              highlight={hero.headlineHighlight}
              as="h1"
              delay={0.06}
              className="mt-5 text-display font-black text-white"
            />

            <Reveal delay={0.14} y={16}>
              <p className="mt-5 max-w-lg text-[16.5px] leading-relaxed text-white/80">
                {hero.subline}
              </p>
            </Reveal>

            <Reveal delay={0.2} y={14}>
              <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13.5px] font-bold text-white/90">
                <span>Plans from ${heroPlan.price}/mo</span>
                <span aria-hidden="true" className="text-sun-500">
                  ·
                </span>
                <span>Speeds to {topSpeedGbps} Gig</span>
                <span aria-hidden="true" className="text-sun-500">
                  ·
                </span>
                <span>Same speed up and down</span>
              </p>
            </Reveal>

            {/* ---- ZIP checker --------------------------------------------- */}
            <Reveal delay={0.26} y={16}>
              <div className="mt-7 max-w-lg">
                <ZipChecker onDark />
              </div>
            </Reveal>

            {/* ---- Trust chips --------------------------------------------- */}
            <Reveal delay={0.32} y={14}>
              <ul className="mt-6 flex flex-wrap gap-2">
                {hero.trustChips.map((chip) => (
                  <li key={chip} className="chip !py-1.5 !text-[12.5px]">
                    <Check />
                    {chip}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* ---- Featured plan bar --------------------------------------- */}
            <Reveal delay={0.38} y={18}>
              {/* Ringed in gold so it reads as the pick, not another panel. */}
              <div className="relative mt-9 max-w-xl rounded-2xl bg-white p-4 shadow-[0_26px_70px_-24px_rgba(0,0,0,0.75)] ring-2 ring-sun-500 sm:p-5">
                {featuredPlan.badge && (
                  <span className="absolute -top-3 left-5 inline-flex rounded-full bg-sun-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-navy shadow-sm">
                    {featuredPlan.badge}
                  </span>
                )}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                  <SpeedGauge
                    compact
                    speedMbps={featuredPlan.speedDown ?? 0}
                    maxMbps={topSpeedMbps}
                    className="!mx-0 shrink-0"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-[14.5px] font-black leading-tight text-navy">
                      {featuredPlan.name}
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-navy/55">
                      {formatSpeed(featuredPlan.speedDown)} down ·{' '}
                      {formatSpeed(featuredPlan.speedUp)} up
                    </p>
                    <PriceLockup
                      plan={featuredPlan}
                      size="compact"
                      hideQualifier
                      className="mt-2"
                    />
                  </div>

                  <CallButton
                    plan={featuredPlan}
                    variant="primary"
                    magnetic={false}
                    className="shrink-0 !px-5"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ---- Trust ticker -------------------------------------------------- */}
      <div className="border-y border-navy/10 bg-bone py-3.5 text-navy/70">
        <Marquee items={marqueeItems} durationSeconds={44} />
      </div>
    </section>
  );
}
