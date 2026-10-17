import { copy } from '@/content/copy';
import StageSection from './StageSection';
import { Backdrop } from './ui';

export default function Travessia() {
  return (
    <StageSection
      stage={copy.travessia}
      darkCard={1}
      ctaVariant="cyan"
      className="bg-paper"
      background={
        <>
          <Backdrop name="travessia" imgClassName="object-[65%_center] md:object-[center_55%]" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-paper/85 via-paper/35 to-paper/60" />
        </>
      }
    />
  );
}
