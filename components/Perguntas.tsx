'use client';

import { useId, useState } from 'react';
import { copy } from '@/content/copy';
import { Heading, Section, cn } from './ui';

/** Indicador de abrir/fechar feito com as barras ciano da marca (+ fechado, − aberto). */
function Toggle({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative size-4 shrink-0">
      <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-cyan" />
      <span className={cn('absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-cyan transition-transform duration-300', open && 'scale-y-0')} />
    </span>
  );
}

export default function Perguntas() {
  const { title, items } = copy.perguntas;
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <Section id="perguntas" texture="topografica-v3" fade="cyan" labelledBy="perguntas-titulo">
      <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-20">
      <div data-reveal className="md:text-center lg:self-start lg:text-left">
        <Heading id="perguntas-titulo" before={title} className="lg:text-[clamp(56px,5.8vw,84px)]" />
      </div>

      <div data-reveal className="mt-5 grid gap-2.5 md:mx-auto md:mt-10 md:max-w-[780px] md:gap-3 lg:mx-0 lg:mt-0 lg:max-w-none">
        {items.map((item, i) => {
          const isOpen = open === i;
          const buttonId = `${baseId}-q${i}`;
          const panelId = `${baseId}-a${i}`;

          return (
            <div key={item.question} className="rounded-[24px] border-2 border-black bg-paper">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold leading-snug md:px-7 md:py-5 md:text-[17px]"
                >
                  {item.question}
                  <Toggle open={isOpen} />
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
                  <p className="px-5 pb-5 text-[14.5px] leading-relaxed md:px-7 md:pb-6 md:text-[16px]">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </Section>
  );
}
