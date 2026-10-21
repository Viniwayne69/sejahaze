import { copy } from '@/content/copy';
import { Button, Heading, Section } from './ui';

export default function Dores() {
  const { title, items, closing, cta } = copy.dores;

  return (
    <Section texture="fosca" labelledBy="dores-titulo">
      <div data-reveal className="md:mx-auto md:max-w-[760px]">
        <Heading id="dores-titulo" before={title} />

        <ol className="mt-5 grid gap-3.5 md:mt-8 md:gap-4">
          {items.map((item, i) => (
            <li key={item} className="flex items-center gap-4 text-[15.5px] leading-snug md:text-[18px]">
              <span className="w-8 shrink-0 font-display text-[22px] font-black leading-none text-cyan md:text-[26px]">
                {String(i + 1).padStart(2, '0')}
              </span>
              {item}
            </li>
          ))}
        </ol>

        <p className="mt-6 text-center text-[19px] font-semibold leading-snug text-cyan md:mt-10 md:text-[24px]">{closing}</p>

        <div className="mt-5 text-center md:mt-8">
          <Button>{cta}</Button>
        </div>
      </div>
    </Section>
  );
}
