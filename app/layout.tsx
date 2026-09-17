import type { Metadata, Viewport } from 'next';
import { Figtree } from 'next/font/google';
import { hero, images, site, startingPrice, topSpeedGbps } from '@/lib/content';
import SiteMotion from '@/components/primitives/SiteMotion';
import './globals.css';

/**
 * Bluepeak's own brand face is Sharp Sans, which is licensed and not
 * redistributable. Figtree is the closest open equivalent in weight, width and
 * geometry, and it is self-hosted by next/font so there is no render-blocking
 * request to Google.
 */
const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
  weight: ['400', '500', '600', '700', '800', '900'],
});

/**
 * Absolute base for Open Graph URLs.
 *
 * Set NEXT_PUBLIC_SITE_URL to the production domain once it exists. Until then
 * Vercel's own VERCEL_URL keeps preview deployments resolving correctly, rather
 * than pointing social cards at a placeholder domain.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Bluepeak Fiber Internet | ${site.entity}`,
    template: `%s | ${site.entity}`,
  },
  description: `Order Bluepeak fiber internet from an independent authorized retailer. Symmetrical speeds up to ${topSpeedGbps} Gig from $${startingPrice}/mo with autopay, modem and eero Wi-Fi included, unlimited data and no annual contract.`,
  applicationName: site.entity,
  keywords: [
    'Bluepeak fiber internet',
    'Bluepeak internet plans',
    'fiber internet',
    'symmetrical fiber',
    'Bluepeak TV',
    'authorized retailer',
  ],
  openGraph: {
    type: 'website',
    siteName: site.entity,
    title: `Bluepeak Fiber Internet | ${site.entity}`,
    description: hero.subline,
    images: [
      {
        url: images.og.src,
        width: 1258,
        height: 768,
        alt: images.og.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Bluepeak Fiber Internet | ${site.entity}`,
    description: hero.subline,
    images: [images.og.src],
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#060048',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className="min-h-screen bg-white font-sans">
        <a
          href="#fiber"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-[14px] focus:font-bold focus:text-white"
        >
          Skip to plans
        </a>

        <SiteMotion>{children}</SiteMotion>
      </body>
    </html>
  );
}
