import { copy } from '@/content/copy';
import { TagIcon, TrendDownIcon, UsersIcon } from './icons';
import { Button, Heading, Section } from './ui';

const icons = [TrendDownIcon, TagIcon, UsersIcon];

export default function Dores() {
  const { title, items, closing, cta } = copy.dores;

  return (
    <Section tone="dark" labelledBy="dores-titulo">
      <div data-reveal className="md:mx-auto md:max-w-[760px]">
        <Heading id="dores-titulo" before={title} />

        <ul className="mt-5 grid gap-3.5 md:mt-8 md:gap-4">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <li key={item} className="flex items-center gap-3.5 text-[15.5px] leading-snug md:text-[18px]">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan">
                  <Icon />
                </span>
                {item}
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-center font-serif text-[24px] italic leading-tight text-cyan md:mt-10 md:text-[32px]">{closing}</p>

        <div className="mt-5 text-center md:mt-8">
          <Button>{cta}</Button>
        </div>
      </div>
    </Section>
  );
}
