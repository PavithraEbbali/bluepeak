/**
 * Ambient colour for the light sections: three heavily blurred brand-tinted
 * discs drifting very slowly behind the content.
 *
 * Deliberately cheap. No canvas, no JS, no state — three spans animating
 * `transform` only, which the compositor handles without touching layout or
 * paint. Opacity is kept low enough that it reads as a tint in the paper rather
 * than as decoration competing with the cards.
 *
 * Positioned rather than negatively stacked: the parent clips it with
 * `overflow-hidden` and the section's own content sits in a `relative` wrapper
 * after it, so it paints underneath without needing a stacking context.
 */
export default function AmbientShades({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <span className="animate-drift-a absolute -left-24 -top-28 block h-[300px] w-[300px] rounded-full bg-teal-300/25 blur-[55px] sm:-left-32 sm:-top-40 sm:h-[560px] sm:w-[560px] sm:blur-[100px]" />
      <span className="animate-drift-b absolute -right-28 top-[18%] block h-[280px] w-[280px] rounded-full bg-royal-400/[0.14] blur-[55px] sm:-right-40 sm:h-[520px] sm:w-[520px] sm:blur-[110px]" />
      <span className="animate-drift-c absolute -bottom-28 left-[28%] block h-[260px] w-[260px] rounded-full bg-sun-500/[0.16] blur-[55px] sm:-bottom-48 sm:left-[32%] sm:h-[440px] sm:w-[440px] sm:blur-[100px]" />
    </div>
  );
}
