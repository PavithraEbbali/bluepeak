'use client';

import {
  addOns,
  addOnsCopy,
  finePrint,
  finePrintCopy,
  plansByLine,
} from '@/lib/content';
import CallButton from '@/components/primitives/CallButton';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/primitives/Reveal';
import { ClipWipe, SectionHead } from '@/components/primitives/Section';
import AmbientShades from '@/components/visuals/AmbientShades';

/**
 * The honest fine-print grid. Every column and every value in this table is
 * generated from the fiber plans in lib/content.ts, so the table can never
 * disagree with the cards above it.
 */
export default function FinePrint() {
  const fiber = plansByLine('fiber');
  const { columns, rows } = finePrint;

  return (
    <ClipWipe className="bg-bone">
      <section
        id="details"
        className="section relative scroll-mt-28 overflow-hidden"
      >
      <AmbientShades />
      <div className="shell relative">
        <SectionHead
          eyebrow={finePrintCopy.eyebrow}
          heading={finePrintCopy.heading}
          intro={finePrintCopy.intro}
        />

        {/* ---- Desktop table ------------------------------------------- */}
        <Reveal delay={0.1}>
          <div className="mt-12 hidden overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card lg:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Bluepeak fiber plan comparison: pricing, hardware and inclusions
              </caption>

              <thead>
                <tr className="border-b border-navy/10 bg-navy text-white">
                  <th
                    scope="col"
                    className="w-[30%] px-6 py-5 text-[13px] font-bold uppercase tracking-[0.12em] text-white/70"
                  >
                    Detail
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="px-6 py-5 text-[15px] font-black"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-navy/[0.07] transition-colors duration-200 hover:bg-bone/60 ${
                      i % 2 ? 'bg-bone/25' : 'bg-white'
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 align-top text-[14px] font-bold text-navy"
                    >
                      {row.label}
                      {row.note && (
                        <span className="mt-1 block text-[12px] font-medium leading-snug text-navy/50">
                          {row.note}
                        </span>
                      )}
                    </th>
                    {row.values.map((value, j) => (
                      <td
                        key={`${row.label}-${columns[j]}`}
                        className="px-6 py-4 align-top text-[14px] font-semibold text-navy/80"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}

                <tr className="bg-white">
                  <td className="px-6 py-6" />
                  {fiber.map((plan) => (
                    <td key={plan.id} className="px-6 py-6 align-top">
                      <CallButton plan={plan} variant="primary" full magnetic={false} />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* ---- Mobile / tablet stack ------------------------------------ */}
        <StaggerGroup as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:hidden">
          {fiber.map((plan, planIndex) => (
            <StaggerItem as="li" key={plan.id} className="min-w-0">
              <div className="card h-full overflow-hidden">
                <div className="bg-navy px-5 py-4">
                  <p className="text-[15px] font-black text-white">
                    {columns[planIndex]}
                  </p>
                </div>

                <dl className="divide-y divide-navy/[0.07]">
                  {rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-start justify-between gap-4 px-5 py-3.5"
                    >
                      <dt className="text-[13px] font-semibold text-navy/60">
                        {row.label}
                      </dt>
                      <dd className="text-right text-[13.5px] font-bold text-navy">
                        {row.values[planIndex]}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="px-5 pb-5 pt-5">
                  <CallButton plan={plan} variant="primary" full magnetic={false} />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* ---- Add-ons -------------------------------------------------- */}
        <div id="addons" className="mt-20 scroll-mt-28">
          <SectionHead
            eyebrow={addOnsCopy.eyebrow}
            heading={addOnsCopy.heading}
            intro={addOnsCopy.intro}
          />

          <StaggerGroup
            as="ul"
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {addOns.map((addOn) => (
              <StaggerItem as="li" key={addOn.id} className="min-w-0">
                <div className="card h-full p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[16px] font-black text-navy">
                      {addOn.name}
                    </h3>
                    <span className="shrink-0 rounded-full bg-sun-500/20 px-3 py-1.5 text-[13px] font-black text-navy">
                      {addOn.price}
                    </span>
                  </div>

                  <p className="mt-3 text-[14px] leading-relaxed text-navy/65">
                    {addOn.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {addOn.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-[13.5px] text-navy/75"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
      </section>
    </ClipWipe>
  );
}
