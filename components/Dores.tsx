import { copy } from '@/content/copy';
import Carrossel from './Carrossel';
import { Button, Heading, Section } from './ui';

/** Cartões inteiros que deslizam no celular (com bolinhas), grade de 3 no desktop. */
export default function Dores() {
  const { title, items, closing, cta } = copy.dores;

  return (
    <Section texture="fosca" labelledBy="dores-titulo">
      <div data-reveal className="md:mx-auto md:max-w-[760px] md:text-center">
        <Heading id="dores-titulo" before={title} />
      </div>

      <Carrossel
        label="Sinais de que a marca precisa mudar"
        items={items.map((item) => (
          <div key={item} className="flex h-full min-h-[120px] items-center rounded-[24px] border border-line bg-graphite px-5 py-6 pr-12 md:min-h-[160px] md:px-7 md:py-7 md:pr-7">
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
