import { copy } from '@/content/copy';
import { Button, Heading, Section } from './ui';

/** Cartões que deslizam de lado no celular (um de cada vez, o próximo "espia"), grade de 3 no desktop. */
export default function Dores() {
  const { title, items, closing, cta } = copy.dores;

  return (
    <Section texture="fosca" labelledBy="dores-titulo">
      <div data-reveal className="md:mx-auto md:max-w-[760px] md:text-center">
        <Heading id="dores-titulo" before={title} />
      </div>

      <ol
        data-reveal
        aria-label="Sinais de que a marca precisa mudar"
        className="-mx-[22px] mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-[22px] px-[22px] pb-2 [scrollbar-width:none] md:mx-0 md:mt-10 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <li key={item} className="w-[78%] shrink-0 snap-start sm:w-[300px] md:w-auto">
            <div className="flex h-full flex-col justify-between gap-6 rounded-[24px] border border-line bg-graphite px-5 py-5 md:px-7 md:py-7">
              <span className="font-display text-[56px] font-black leading-none text-cyan md:text-[68px]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[19px] font-semibold leading-snug md:text-[21px]">{item}</p>
            </div>
          </li>
        ))}
      </ol>

      <div data-reveal className="md:mx-auto md:max-w-[760px]">
        <p className="mt-5 text-center text-[19px] font-semibold leading-snug text-cyan md:mt-10 md:text-[24px]">{closing}</p>
        <div className="mt-4 text-center md:mt-8">
          <Button>{cta}</Button>
        </div>
      </div>
    </Section>
  );
}
