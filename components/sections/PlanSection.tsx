'use client';

import {
  formatSpeed,
  plansByLine,
  sectionImages,
  serviceLineMeta,
  topSpeedMbps,
  type PlanItem,
  type SectionTone,
  type ServiceLine,
} from '@/lib/content';
import CallButton from '@/components/primitives/CallButton';
import Figure from '@/components/primitives/Figure';
import PhotoBackdrop from '@/components/primitives/PhotoBackdrop';
import PriceLockup from '@/components/primitives/PriceLockup';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/primitives/Reveal';
import { ClipWipe, SectionHead } from '@/components/primitives/Section';
import TiltCard from '@/components/primitives/TiltCard';
import SpeedGauge from '@/components/visuals/SpeedGauge';
import AmbientShades from '@/components/visuals/AmbientShades';

function Tick({ onBlue }: { onBlue: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`mt-[3px] h-4 w-4 shrink-0 ${
        onBlue ? 'text-sun-500' : 'text-teal-600'
      }`}
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
 * Card treatment mirrors mybluepeak.com: white cards across the row with the
 * featured plan inverted onto Bluepeak royal blue, a gold badge, and the same
 * teal action button on every card.
 */
function PlanCard({ plan }: { plan: PlanItem }) {
  const onBlue = Boolean(plan.isPopular);
  /* Fiber tiers carry the gold dial; TV and bundles keep the chip treatment. */
  const showGauge = plan.serviceLine === 'fiber' && Boolean(plan.speedDown);

  const shell = onBlue
    ? 'bg-royal-600 shadow-card-lift'
    : 'border border-navy/12 bg-white shadow-card';

  const title = onBlue ? 'text-white' : 'text-navy';
  const body = onBlue ? 'text-white/75' : 'text-navy/65';
  const rule = onBlue ? 'border-white/15' : 'border-navy/10';

  return (
    <TiltCard className="h-full" max={5}>
      <div className={`flex h-full flex-col overflow-hidden rounded-2xl ${shell}`}>
        {plan.badge && (
          <div className="absolute right-5 top-5 z-10">
            <span className="inline-flex rounded-full bg-sun-500 px-3 py-1 text-[10.5px] font-black uppercase tracking-[0.1em] text-navy">
              {plan.badge}
            </span>
          </div>
        )}

        <div className="p-6 sm:p-7">
          {showGauge && (
            <>
              <SpeedGauge
                speedMbps={plan.speedDown as number}
                maxMbps={topSpeedMbps}
                onBlue={onBlue}
                className="mt-2"
              />
              <p
                className={`mt-4 text-center text-[13px] font-semibold ${body}`}
              >
                {formatSpeed(plan.speedDown)} down ·{' '}
                {formatSpeed(plan.speedUp)} up
              </p>
            </>
          )}

          {/* Only reserve room for the badge on cards that actually have one. */}
          <h3
            className={`text-[19px] font-black leading-tight ${
              showGauge ? 'mt-6 text-center' : ''
            } ${plan.badge && !showGauge ? 'pr-28' : ''} ${title}`}
          >
            {plan.name}
          </h3>

          {plan.tagline && (
            <p
              className={`mt-2 text-[14px] leading-relaxed ${
                showGauge ? 'text-center' : ''
              } ${body}`}
            >
              {plan.tagline}
            </p>
          )}

          <PriceLockup
            plan={plan}
            size="card"
            onDark={onBlue}
            className={`mt-6 ${showGauge ? 'flex flex-col items-center' : ''}`}
          />

          {/* Chips carry the speeds only where there is no dial to say it. */}
          {!showGauge && (plan.speedDown || plan.channelCount) && (
            <div
              className={`mt-5 flex flex-wrap items-center gap-2 border-t pt-5 ${rule}`}
            >
              {plan.speedDown && (
                <span className={onBlue ? 'chip' : 'chip-light'}>
                  {formatSpeed(plan.speedDown)} down
                </span>
              )}
              {plan.speedUp && (
                <span className={onBlue ? 'chip' : 'chip-light'}>
                  {formatSpeed(plan.speedUp)} up
                </span>
              )}
              {plan.channelCount && (
                <span className={onBlue ? 'chip' : 'chip-light'}>
                  {plan.channelCount}
                </span>
              )}
            </div>
          )}
        </div>

        <div className={`border-t px-6 pb-6 pt-6 sm:px-7 ${rule}`}>
          {/* The price lock gets its own pill below, so drop it from the list
              rather than stating it twice on the same card. */}
          <ul className="space-y-3">
            {plan.features
              .filter((feature) => feature !== plan.priceLock)
              .map((feature) => (
              <li
                key={feature}
                className={`flex gap-2.5 text-[14px] leading-snug ${
                  onBlue ? 'text-white/85' : 'text-navy/80'
                }`}
              >
                <Tick onBlue={onBlue} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {plan.priceLock && (
            <p
              className={`mt-5 inline-flex rounded-full px-3.5 py-1.5 text-[12px] font-black ${
                onBlue ? 'bg-white text-navy' : 'bg-navy text-white'
              }`}
            >
              {plan.priceLock}
            </p>
          )}

          {plan.bestFor && (
            <p
              className={`mt-4 text-[12.5px] font-semibold leading-snug ${
                onBlue ? 'text-sun-400' : 'text-teal-700/85'
              }`}
            >
              Best for: {plan.bestFor}
            </p>
          )}
        </div>

        {/* CTA pinned to the bottom so cards line up across the row. */}
        <div className="mt-auto px-6 pb-7 sm:px-7">
          {/* Label comes from ctaLabelFor(): priced plans read "Call to order",
              unpriced plans read "Call for pricing". */}
          <CallButton plan={plan} variant="primary" full magnetic={false} />

          {(plan.equipmentFee || plan.contractTerm) && (
            <p
              className={`mt-3.5 text-center text-[12px] leading-snug ${
                onBlue ? 'text-white/55' : 'text-navy/50'
              }`}
            >
              {[plan.equipmentFee, plan.dataPolicy, plan.contractTerm]
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}
        </div>
      </div>
    </TiltCard>
  );
}

/**
 * One component renders every service line. It reads its heading, intro, anchor
 * id and plan list straight out of lib/content.ts, so a new service line needs
 * no new layout code and a removed one disappears without a trace.
 */
export default function PlanSection({
  line,
  tone = 'white',
}: {
  line: ServiceLine;
  tone?: SectionTone;
}) {
  const meta = serviceLineMeta[line];
  const items = plansByLine(line);

  if (items.length === 0) return null;

  const onPhoto = tone === 'photo';
  /* On a photographic section the picture is the background, so the heading
     does not also need one beside it. */
  const sidePhoto = onPhoto ? undefined : sectionImages[line];

  const head = (
    <SectionHead
      eyebrow={meta.eyebrow}
      heading={meta.heading}
      intro={meta.intro}
      onDark={onPhoto}
    />
  );

  const inner = (
    <div className="shell">
      {sidePhoto ? (
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-14">
          {head}
          <Reveal delay={0.1} y={22} className="min-w-0">
            <Figure
              image={sidePhoto}
              ratio="wide"
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="shadow-card"
            />
          </Reveal>
        </div>
      ) : (
        head
      )}

      <StaggerGroup
        as="ul"
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((plan) => (
          <StaggerItem as="li" key={plan.id} className="min-w-0">
            <PlanCard plan={plan} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );

  if (onPhoto) {
    const backdrop = sectionImages[line];
    if (backdrop) {
      return (
        <section id={meta.id} className="scroll-mt-28">
          <PhotoBackdrop image={backdrop} overlay="even">
            <div className="section relative">{inner}</div>
          </PhotoBackdrop>
        </section>
      );
    }
  }

  if (tone === 'white') {
    return (
      <section
        id={meta.id}
        className="section relative scroll-mt-28 overflow-hidden bg-white"
      >
        <AmbientShades />
        <div className="relative">{inner}</div>
      </section>
    );
  }

  /* Muted sections keep the clip-path wipe: the angled top edge is visible
     against the white section above it. */
  return (
    <ClipWipe className="bg-bone">
      <section
        id={meta.id}
        className="section relative scroll-mt-28 overflow-hidden"
      >
        <AmbientShades />
        <div className="relative">{inner}</div>
      </section>
    </ClipWipe>
  );
}
