'use client';

import { AnimatePresence, m } from 'framer-motion';
import { useId, useState } from 'react';
import CallButton from '@/components/primitives/CallButton';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Availability checker.
 *
 * This is a front-end build with no lookup service behind it, so the form never
 * claims a result it cannot know. It validates the ZIP, holds on to it for the
 * conversation, and hands the visitor to a person who can confirm the address
 * properly. Claiming "available!" without a real check would be both wrong and
 * a policy problem.
 */
export default function ZipChecker({ onDark = false }: { onDark?: boolean }) {
  const inputId = useId();
  const [zip, setZip] = useState('');
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const clean = zip.trim();

    if (!/^\d{5}$/.test(clean)) {
      setError('Enter a 5-digit ZIP code.');
      setSubmitted(null);
      return;
    }

    setError(null);
    setSubmitted(clean);
  };

  const label = onDark ? 'text-white/70' : 'text-navy/70';

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor={inputId} className={`mb-2 block text-[13px] font-semibold ${label}`}>
          Check availability at your address
        </label>

        <div className="flex w-full flex-col gap-2.5 sm:flex-row">
          <div className="relative flex-1">
            <input
              id={inputId}
              name="zip"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              placeholder="ZIP code"
              value={zip}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `${inputId}-error` : undefined}
              onChange={(e) => {
                setZip(e.target.value.replace(/\D/g, '').slice(0, 5));
                if (error) setError(null);
              }}
              className={`h-[52px] w-full rounded-full border-2 px-5 text-[16px] font-semibold outline-none transition-colors duration-200 ${
                onDark
                  ? 'border-white/20 bg-white/10 text-white placeholder:text-white/45 focus:border-teal-300'
                  : 'border-navy/15 bg-white text-navy placeholder:text-navy/40 focus:border-teal-500'
              }`}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary shrink-0 sm:!px-7"
          >
            Check my address
          </button>
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className={`mt-2 text-[13px] font-semibold ${
              onDark ? 'text-sun-400' : 'text-royal-600'
            }`}
          >
            {error}
          </p>
        )}
      </form>

      <AnimatePresence initial={false}>
        {submitted && (
          <m.div
            key="zip-result"
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div
              className={`mt-4 rounded-2xl border p-4 sm:p-5 ${
                onDark
                  ? 'border-teal-300/30 bg-teal-500/10'
                  : 'border-teal-500/25 bg-teal-50'
              }`}
            >
              <p
                className={`text-[15px] font-bold ${
                  onDark ? 'text-white' : 'text-navy'
                }`}
              >
                Got it — ZIP {submitted}
              </p>
              <p
                className={`mt-1.5 text-[14px] leading-relaxed ${
                  onDark ? 'text-white/75' : 'text-navy/70'
                }`}
              >
                Bluepeak builds street by street, so two homes in the same ZIP
                can be on different timelines. Give us 60 seconds on the phone
                and we will confirm exactly what is live at your address and what
                it costs.
              </p>

              <CallButton
                label="Call to order"
                variant={onDark ? 'primary' : 'navy'}
                className="mt-4 !min-h-[46px]"
                magnetic={false}
              />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
