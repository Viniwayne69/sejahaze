import { copy } from '@/content/copy';
import StageSection from './StageSection';
import { Backdrop } from './ui';

export default function Porto() {
  return (
    <StageSection
      stage={copy.porto}
      darkCard={1}
      ctaVariant="dark"
      className="bg-cyan"
      background={
        <>
          <Backdrop name="porto" className="bg-cyan" imgClassName="object-[72%_center] opacity-40 md:opacity-55" />
          {/* Mantém a faixa ciano sólida sob o texto, deixando a cena aparecer à direita */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan/80 via-cyan/35 to-cyan/0" />
        </>
      }
    />
  );
}
