'use client';

import { images, whyUs } from '@/lib/content';
import CallButton from '@/components/primitives/CallButton';
import Figure from '@/components/primitives/Figure';
import PhotoBackdrop from '@/components/primitives/PhotoBackdrop';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/primitives/Reveal';
import { SectionHead } from '@/components/primitives/Section';
import AmbientShades from '@/components/visuals/AmbientShades';

export default function WhyUs() {
  return (
    <div id="why" className="scroll-mt-28">
      {/* ---- How it works, on white ------------------------------------ */}
      <section className="section relative overflow-hidden bg-white">
        <AmbientShades />
        <div className="shell relative">
          <SectionHead eyebrow={whyUs.eyebrow} heading={whyUs.heading} />

          <StaggerGroup
            as="ol"
            className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6"
          >
            {whyUs.steps.map((step) => (
              <StaggerItem as="li" key={step.n} className="min-w-0">
                <div className="h-full border-t-[3px] border-sun-500 pt-6">
                  <span
                    aria-hidden="true"
                    className="text-[26px] font-black leading-none tracking-[-0.02em] text-navy/25"
                  >
                    {step.n}
                  </span>

                  <h3 className="mt-4 text-[18px] font-black leading-snug text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-navy/65">
                    {step.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.15}>
            <div className="mt-12 grid items-center gap-8 overflow-hidden rounded-2xl border border-navy/12 bg-bone lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-0">
              <Figure
                image={images.install}
                ratio="wide"
                rounded="rounded-none"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="p-6 pt-0 lg:p-10 lg:pt-10">
                <h3 className="text-[19px] font-black leading-snug text-navy">
                  A local technician does the install
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-navy/65">
                  We will confirm your address, your speed tier and your exact
                  monthly rate before anything is scheduled. On the day, the
                  technician runs the fiber, sets up your eero and checks real
                  speeds on your own devices before leaving.
                </p>
                <CallButton
                  label="Call to order"
                  variant="navy"
                  className="mt-6"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Why Bluepeak fiber, over the equipment photograph --------- */}
      {/* A light wash here, because the cards below carry their own backing
          and do not need the whole photograph darkened to stay readable. */}
      <PhotoBackdrop image={images.equipment} overlay="soft">
        <div className="section shell relative">
          <SectionHead
            eyebrow={whyUs.benefitsEyebrow}
            heading={whyUs.benefitsHeading}
            intro={whyUs.benefitsIntro}
            onDark
          />

          <StaggerGroup
            as="ul"
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {whyUs.benefits.map((benefit) => (
              <StaggerItem as="li" key={benefit.title} className="min-w-0">
                <div className="group h-full rounded-2xl border border-white/15 bg-navy/80 p-6 backdrop-blur-md transition-[transform,background-color,border-color] duration-500 ease-brand hover:-translate-y-1 hover:border-sun-500/60 hover:bg-navy/90">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sun-500/20 transition-colors duration-500 group-hover:bg-sun-500/35"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-sun-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />
                    </svg>
                  </span>

                  <h3 className="mt-4 text-[16px] font-black text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-white/70">
                    {benefit.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </PhotoBackdrop>
    </div>
  );
}
