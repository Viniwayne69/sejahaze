'use client';

import { useId, useState } from 'react';
import { copy } from '@/content/copy';
import { Container, Eyebrow, cn } from './ui';

export default function Perguntas() {
  const { label, title, items } = copy.perguntas;
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="perguntas" aria-labelledby="perguntas-titulo" className="paper-grain relative isolate overflow-hidden bg-paper py-16 sm:py-20 lg:py-28">
      <div aria-hidden="true" className="topo-lines absolute inset-0 -z-20 opacity-[0.18]" />
      {/* Raio de luz suave no canto */}
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-40 -z-10 h-[620px] w-[760px] rotate-[-18deg] bg-[radial-gradient(closest-side,rgb(255_255_255/0.95),rgb(255_255_255/0))]"
      />

      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div data-reveal>
          <Eyebrow>{label}</Eyebrow>
          <h2 id="perguntas-titulo" className="display mt-5 text-[clamp(1.9rem,0.9rem+2.4vw,3rem)] leading-[1]">
            {title}
          </h2>
        </div>

        <div data-reveal className="border-t border-gray/50">
          {items.map((item, i) => {
            const isOpen = open === i;
            const buttonId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;

            return (
              <div key={item.question} className="border-b border-gray/50">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-[15px] font-semibold leading-snug transition-colors hover:text-black/70 sm:py-6 sm:text-[17px]"
                  >
                    {item.question}
                    <span aria-hidden="true" className="relative size-5 shrink-0 text-cyan">
                      <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded bg-current" />
                      <span
                        className={cn(
                          'absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 rounded bg-current transition-transform duration-300',
                          isOpen && 'scale-y-0',
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                  className={cn(
                    'grid transition-[grid-template-rows,opacity] duration-[400ms] ease-out',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[640px] pb-6 text-[15px] leading-relaxed text-black/80 sm:text-base">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
