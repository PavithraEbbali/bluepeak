import { footerColumns, legal, legalLinks, site } from '@/lib/content';
import Logo from '@/components/visuals/Logo';

/**
 * Dark four-column footer: link columns, a "talk to a human" column, the
 * retailer lockup and description, then the disclosure block and a bottom bar
 * of legal links and copyright.
 *
 * Server component on purpose. There is nothing interactive down here, so it
 * ships zero JavaScript.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="legal" className="scroll-mt-28 bg-navy-950 text-white">
      <div className="shell py-16 lg:py-20">
        {/* ---- Columns --------------------------------------------------- */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,0.68fr))_minmax(0,1.3fr)] lg:gap-8">
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-teal-300">
                {column.title}
              </h2>

              <ul className="mt-4 space-y-0.5 sm:mt-5 sm:space-y-1">
                {column.links.map((link) => {
                  const isTel = link.href.startsWith('tel:');
                  return (
                    <li key={`${column.title}-${link.label}`}>
                      <a
                        href={link.href}
                        {...(isTel ? { 'data-call-cta': true } : {})}
                        className="inline-flex min-h-[40px] items-center text-[14.5px] font-medium text-white/65 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}

          {/* ---- Talk to a human + identity ------------------------------ */}
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-teal-300">
              Talk to a human
            </h2>

            <a
              href={site.phoneHref}
              data-call-cta
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[26px] font-black tracking-tight text-white transition-colors duration-200 hover:text-teal-300"
            >
              {site.phoneDisplay}
            </a>
            <p className="mt-1.5 text-[13.5px] font-medium text-white/55">
              {site.hours}
            </p>

            <div className="mt-8 border-t border-white/10 pt-8">
              <Logo onDark />
              <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-white/55">
                Independent authorized retailer helping households order
                Bluepeak fiber internet and Bluepeak TV.
              </p>
            </div>
          </div>
        </div>

        {/* ---- Disclosures ----------------------------------------------- */}
        <div className="mt-14 border-t border-white/10 pt-10">
          <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-white/40">
            Offer details
          </h2>

          <div className="mt-5 grid gap-x-10 gap-y-3.5 lg:grid-cols-2">
            {legal.disclosures.map((line) => (
              <p
                key={line}
                className="text-[12.5px] leading-relaxed text-white/45"
              >
                {line}
              </p>
            ))}
          </div>

          <p className="mt-6 max-w-4xl text-[12.5px] leading-relaxed text-white/55">
            {legal.reseller}
          </p>
        </div>
      </div>

      {/* ---- Bottom bar --------------------------------------------------- */}
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-flex min-h-[36px] items-center text-[12.5px] font-semibold text-white/50 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="text-[12.5px] font-medium text-white/40">
            &copy; {year} {site.entity} (independent)
          </p>
        </div>
      </div>
    </footer>
  );
}
