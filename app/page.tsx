import { activeServiceLines, serviceLineMeta } from '@/lib/content';
import TopChrome from '@/components/sections/TopChrome';
import Hero from '@/components/sections/Hero';
import PlanSection from '@/components/sections/PlanSection';
import FinePrint from '@/components/sections/FinePrint';
import WhyUs from '@/components/sections/WhyUs';
import Coverage from '@/components/sections/Coverage';
import Faq from '@/components/sections/Faq';
import Footer from '@/components/sections/Footer';

/**
 * Canonical page order:
 *
 *   1. Top disclosure bar + 2. sticky header   (TopChrome)
 *   3. Hero
 *   4. Service lines, in canonical order, driven entirely by lib/content.ts.
 *      Lines with no plans never render, which is why there is no Cable,
 *      Mobile or Phone section on the page.
 *   5. Honest fine-print grid + add-ons
 *   6. How it works / why us, then service area
 *   7. FAQ
 *   8. Footer
 */
export default function Page() {
  return (
    <>
      <TopChrome />

      <main>
        <Hero />

        {activeServiceLines.map((line, i) => (
          <PlanSection
            key={line}
            line={line}
            /* A line can name its own treatment; anything that does not falls
               back to alternating white and muted. */
            tone={serviceLineMeta[line].tone ?? (i % 2 === 1 ? 'muted' : 'white')}
          />
        ))}

        <FinePrint />
        <WhyUs />
        <Coverage />
        <Faq />
      </main>

      <Footer />
    </>
  );
}
