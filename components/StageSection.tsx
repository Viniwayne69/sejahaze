import type { Stage } from '@/content/copy';
import { Button, Container, Eyebrow, ResultPill, cn } from './ui';

type StageSectionProps = {
  stage: Stage;
  /** Índice do cartão preto (os outros ficam off-white). */
  darkCard: number;
  /** Mostra o selo numerado no canto dos cartões. */
  numbered?: boolean;
  ctaVariant: 'cyan' | 'dark';
  /** Fundo da seção (foto, gradientes, texturas). */
  background: React.ReactNode;
  className?: string;
};

export default function StageSection({ stage, darkCard, numbered = false, ctaVariant, background, className }: StageSectionProps) {
  return (
    <section
      id={stage.id}
      aria-labelledby={`${stage.id}-titulo`}
      className={cn('relative isolate overflow-hidden py-12 sm:py-14 lg:pb-11 lg:pt-12', className)}
    >
      {background}

      <Container>
        <div data-reveal className="max-w-[820px]">
          <Eyebrow>{stage.label}</Eyebrow>
          <h2 id={`${stage.id}-titulo`} className="display mt-4 text-[clamp(1.6rem,0.55rem+2.1vw,2.6rem)] leading-[1] [text-wrap:wrap]">
            {stage.title}
          </h2>
          <p className="mt-3 max-w-[560px] text-[15px] leading-snug sm:text-[17px]">{stage.subtitle}</p>
        </div>

        <ul className="mt-7 grid gap-3.5 md:gap-4 lg:mt-8 lg:grid-cols-3 lg:gap-5">
          {stage.cards.map((card, i) => (
            <li
              key={card.title}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
              className={cn(
                'relative rounded-[20px] border px-6 py-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift lg:px-7',
                i === darkCard ? 'border-black bg-black text-paper' : 'border-white/60 bg-paper/95 text-black backdrop-blur-sm',
              )}
            >
              {numbered && (
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute right-5 top-5 grid size-7 place-items-center rounded-full border text-[11px] font-semibold',
                    i === darkCard ? 'border-paper/60' : 'border-gray',
                  )}
                >
                  {i + 1}
                </span>
              )}
              <h3 className={cn('font-display text-[17px] font-extrabold uppercase leading-tight tracking-[-0.01em] lg:text-[18px]', numbered && 'pr-9')}>
                {card.title}
              </h3>
              <p className={cn('mt-3 text-[14.5px] leading-[1.5]', i === darkCard ? 'text-paper/90' : 'text-black/85')}>{card.body}</p>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-6 flex flex-col items-center gap-4">
          <ResultPill label={stage.result.label} text={stage.result.text} />
          <Button variant={ctaVariant} className="min-w-[260px]">
            {stage.cta}
          </Button>
        </div>
      </Container>
    </section>
  );
}
