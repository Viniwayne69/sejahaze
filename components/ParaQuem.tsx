import { copy } from '@/content/copy';
import { CheckCircle, CrossCircle } from './icons';
import { Section, cn } from './ui';

function AudienceCard({ title, items, negative = false }: { title: string; items: readonly string[]; negative?: boolean }) {
  return (
    <article
      data-reveal
      className={cn(
        'rounded-2xl border px-5 py-5 md:px-8 md:py-8',
        negative ? 'border-line bg-graphite/80' : 'border-cyan/40 bg-graphite',
      )}
    >
      <h2 className="display text-[22px] leading-none md:text-[30px]">{title}</h2>
      <ul className="mt-4 grid gap-3 md:mt-6 md:gap-4">
        {items.map((item) => (
          <li key={item} className={cn('flex items-start gap-3 text-[15px] leading-normal md:text-[16px]', negative && 'text-paper/75')}>
            {negative ? <CrossCircle className="mt-px" /> : <CheckCircle className="mt-px" />}
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
    <Section id="para-quem" tone="dark">
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <AudienceCard title={sim.title} items={sim.items} />
        <AudienceCard title={nao.title} items={nao.items} negative />
      </div>
    </Section>
  );
}
