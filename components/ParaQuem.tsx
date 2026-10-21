import { copy } from '@/content/copy';
import { Bar, Section } from './ui';

export default function ParaQuem() {
  const { title, items } = copy.paraQuem.sim;

  return (
    <Section id="para-quem" texture="fosca" labelledBy="para-quem-titulo">
      <article data-reveal className="rounded-[24px] border border-line bg-graphite px-5 py-5 md:mx-auto md:max-w-[720px] md:px-10 md:py-10">
        <h2 id="para-quem-titulo" className="display text-[22px] leading-none md:text-[30px]">
          {title}
        </h2>
        <ul className="mt-4 grid gap-3 md:mt-6 md:gap-4">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3.5 text-[15px] leading-normal md:text-[17px]">
              {/* Barra curta da marca no lugar de check */}
              <Bar className="mt-[0.62em]" />
              {item}
            </li>
          ))}
        </ul>
      </article>
    </Section>
  );
}
