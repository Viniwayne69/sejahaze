import { copy } from '@/content/copy';
import StageSection from './StageSection';
import { Backdrop } from './ui';

export default function Rota() {
  return (
    <StageSection
      stage={copy.rota}
      darkCard={0}
      numbered
      ctaVariant="cyan"
      className="paper-grain bg-paper"
      background={
        <>
          <div aria-hidden="true" className="topo-lines absolute inset-0 -z-30 opacity-[0.22]" />
          {/* Colinas na metade de baixo, esmaecendo para o papel no topo */}
          <Backdrop
            name="rota"
            className="top-[28%] [mask-image:linear-gradient(to_bottom,transparent,black_38%)]"
            imgClassName="object-[60%_75%]"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-paper via-paper/40 to-paper/0" />
        </>
      }
    />
  );
}
