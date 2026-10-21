'use client';

import { useId, useState } from 'react';
import { copy } from '@/content/copy';
import { ChevronIcon, QuestionIcon } from './icons';
import { Heading, Section, cn } from './ui';

export default function Perguntas() {
  const { title, items } = copy.perguntas;
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <Section id="perguntas" tone="paper" labelledBy="perguntas-titulo" className="paper-grain">
      <div data-reveal className="md:text-center">
        <Heading id="perguntas-titulo" before={title} />
      </div>

      <div data-reveal className="mt-5 grid gap-2.5 md:mx-auto md:mt-10 md:max-w-[780px] md:gap-3">
        {items.map((item, i) => {
          const isOpen = open === i;
          const buttonId = `${baseId}-q${i}`;
          const panelId = `${baseId}-a${i}`;

          return (
            <div key={item.question} className={cn('rounded-[14px] bg-white transition-shadow', isOpen && 'shadow-lift')}>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-[15px] font-semibold leading-snug md:px-6 md:py-5 md:text-[17px]"
                >
                  <QuestionIcon className="shrink-0 text-cyan" />
                  <span className="flex-1">{item.question}</span>
                  <ChevronIcon className={cn('shrink-0 text-black/60 transition-transform duration-300', isOpen && 'rotate-180')} />
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
                  <p className="px-4 pb-4 pl-12 text-[14.5px] leading-relaxed text-black/75 md:px-6 md:pb-6 md:pl-14 md:text-[16px]">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
