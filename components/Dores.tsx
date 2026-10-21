import { copy } from '@/content/copy';
import Carrossel from './Carrossel';
import { Button, Heading, Section } from './ui';

/** Cartões inteiros que deslizam no celular (com bolinhas), grade de 3 no desktop. */
export default function Dores() {
  const { title, items, closing, cta } = copy.dores;

  return (
    <Section texture="fosca" labelledBy="dores-titulo">
      {/* Luz ciano saindo das laterais e do fundo: dá vida ao escuro sem tirar a tensão */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-16 top-[22%] h-56 w-32 rounded-full bg-cyan/40 blur-3xl md:-left-24 md:h-[420px] md:w-64" />
        <div className="absolute -right-16 top-[40%] h-56 w-32 rounded-full bg-cyan/40 blur-3xl md:-right-24 md:top-[30%] md:h-[420px] md:w-64" />
        <div className="absolute -bottom-20 left-1/2 h-40 w-[70%] -translate-x-1/2 rounded-full bg-cyan/25 blur-3xl md:h-56 md:w-[480px]" />
      </div>

      <div data-reveal className="md:mx-auto md:max-w-[760px] md:text-center">
        <Heading id="dores-titulo" before={title} />
      </div>

      <Carrossel
        label="Sinais de que a marca precisa mudar"
        items={items.map((item) => (
          <div key={item} className="flex h-full min-h-[120px] items-center rounded-[24px] border border-cyan/40 bg-graphite shadow-[0_0_26px_rgba(1,187,251,.16)] px-5 py-6 pr-12 md:min-h-[160px] md:px-7 md:py-7 md:pr-7">
            <p className="text-[20px] font-semibold leading-snug md:text-[22px]">{item}</p>
          </div>
        ))}
      />

      <div data-reveal className="md:mx-auto md:max-w-[760px]">
        <p className="mt-5 text-center text-[19px] font-semibold leading-snug text-cyan md:mt-10 md:text-[24px]">{closing}</p>
        <div className="mt-4 text-center md:mt-8">
          <Button>{cta}</Button>
        </div>
      </div>
    </Section>
  );
}
