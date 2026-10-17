import { copy } from '@/content/copy';
import { Accent, Button, Container, cn } from './ui';

const cardStyles = [
  'bg-black text-paper border-black',
  'bg-cyan text-black border-cyan',
  'bg-paper/60 text-black border-gray/70',
] as const;

const badgeStyles = ['border-paper/70', 'border-black', 'border-gray'] as const;

export default function Metodo() {
  const { before, accent, name, cards, body } = copy.metodo;

  return (
    <section
      id="solucoes"
      className="paper-grain relative isolate overflow-hidden bg-paper py-12 sm:py-14 lg:pb-12 lg:pt-11"
    >
      {/* HAZE gigante em cinza claríssimo + brilhos ciano nos cantos */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-[2vw] -top-[4vw] -z-10 select-none font-display text-[34vw] font-black leading-none tracking-[-0.07em] text-white/60"
        style={{ fontVariationSettings: "'wdth' 125" }}
      >
        HAZE
      </span>
      <div
        aria-hidden="true"
        className="absolute -right-40 top-0 -z-10 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(1_187_251/0.32),transparent)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -left-48 -z-10 size-[460px] rounded-full bg-[radial-gradient(closest-side,rgb(1_187_251/0.18),transparent)] blur-2xl"
      />

      <Container>
        <div data-reveal className="mx-auto max-w-[920px] text-center">
          <h2 className="display text-[clamp(1.6rem,0.55rem+2.05vw,2.5rem)] leading-[1.02]">
            {before} <Accent>{accent}</Accent>
          </h2>
          <p className="mt-4 font-display text-[clamp(1.4rem,1rem+0.9vw,1.85rem)] tracking-[-0.03em] text-cyan">
            <span className="font-semibold">{name.lead}</span> <span className="font-black">{name.strong}</span>
          </p>
        </div>

        {/* Linha tracejada que desce do título e se ramifica para os três cartões */}
        <div aria-hidden="true" className="relative mx-auto hidden h-12 max-w-[1120px] md:block">
          <span className="absolute left-1/2 top-0 h-full border-l border-dashed border-gray/70" />
          <span className="absolute left-1/2 top-[38%] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
          <span className="absolute inset-x-[16.5%] bottom-0 h-1/2 rounded-t-2xl border border-b-0 border-dashed border-gray/70" />
        </div>

        <ol className="mx-auto mt-8 grid max-w-[1120px] gap-4 md:mt-0 md:grid-cols-3 md:gap-5">
          {cards.map((card, i) => (
            <li key={card.title} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <a
                href={card.href}
                className={cn(
                  'group flex h-full flex-col rounded-[22px] border px-6 py-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift lg:px-7 lg:py-7',
                  cardStyles[i],
                )}
              >
                <div className="flex items-center gap-4 md:gap-3 lg:gap-4">
                  <span
                    className={cn(
                      'grid size-11 shrink-0 place-items-center rounded-full border text-sm font-semibold md:size-9 md:text-xs lg:size-12 lg:text-sm',
                      badgeStyles[i],
                    )}
                  >
                    {card.number}
                  </span>
                  <div>
                    <h3 className="display text-[22px] leading-none tracking-[-0.03em] md:text-[16px] lg:text-[23px] xl:text-[26px]">{card.title}</h3>
                    <p className={cn('mt-1.5 text-[13.5px] leading-snug', i === 1 && 'italic')}>{card.question}</p>
                  </div>
                </div>
                <p className="mt-5 text-[14.5px] leading-[1.5] lg:text-[15px]">{card.body}</p>
              </a>
            </li>
          ))}
        </ol>

        <div data-reveal className="mx-auto mt-7 max-w-[900px] text-center">
          <p className="text-[16px] leading-[1.45] sm:text-[17px]">{body}</p>
          <Button className="mt-5" />
        </div>
      </Container>
    </section>
  );
}
