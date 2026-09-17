import Image from 'next/image';
import type { SiteImage } from '@/lib/content';

type Ratio = 'photo' | 'wide' | 'band' | 'square' | 'portrait';

const RATIOS: Record<Ratio, string> = {
  photo: 'aspect-[4/3]',
  wide: 'aspect-[16/9]',
  band: 'aspect-[5/2]',
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
};

/**
 * Rounded photo panel. Every source image is 1408x768, so each slot sets its own
 * aspect ratio and lets `object-position` decide which part of the frame
 * survives the crop.
 *
 * Images are served through next/image, so each one is re-encoded to AVIF or
 * WebP at the size the device actually asks for.
 */
export default function Figure({
  image,
  ratio = 'photo',
  className = '',
  sizes = '(max-width: 1024px) 100vw, 50vw',
  priority = false,
  rounded = 'rounded-2xl',
}: {
  image: SiteImage;
  ratio?: Ratio;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-bone ${RATIOS[ratio]} ${rounded} ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: image.position ?? '50% 50%' }}
      />
    </div>
  );
}
