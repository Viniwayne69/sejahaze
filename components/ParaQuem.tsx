import { copy } from '@/content/copy';
import { Bar, Section, cn } from './ui';

function AudienceCard({ title, items, negative = false }: { title: string; items: readonly string[]; negative?: boolean }) {
  return (
    <article data-reveal className="rounded-[24px] border border-line bg-graphite px-5 py-5 md:px-8 md:py-8">
      <h2 className="display text-[22px] leading-none md:text-[30px]">{title}</h2>
      <ul className="mt-4 grid gap-3 md:mt-6 md:gap-4">
        {items.map((item) => (
          <li key={item} className={cn('flex items-start gap-3.5 text-[15px] leading-normal md:text-[16px]', negative && 'text-gray')}>
            {/* Barra curta da marca no lugar de check/xis */}
            <Bar tone={negative ? 'gray' : 'cyan'} className="mt-[0.62em]" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function ParaQuem() {
  const { sim, nao } = copy.paraQuem;

  return (
    <Section id="para-quem" texture="fosca">
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <AudienceCard title={sim.title} items={sim.items} />
        <AudienceCard title={nao.title} items={nao.items} negative />
      </div>
    </Section>
  );
}
