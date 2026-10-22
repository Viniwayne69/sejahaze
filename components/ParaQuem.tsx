'use client';

import { useState } from 'react';
import { copy } from '@/content/copy';
import { Button, Section, cn } from './ui';

/**
 * Lista tocável: o visitante marca o que o descreve e, com pelo menos uma marcação,
 * aparece a resposta ("Então a HAZE é para você") junto com o botão.
 */
export default function ParaQuem() {
  const { title, items, dica, resposta } = copy.paraQuem.sim;
  const [marcados, setMarcados] = useState<number[]>([]);
  const alguem = marcados.length > 0;

  const alternar = (i: number) => {
    // Vibração curta no celular ao marcar (ignora onde não existe)
    if (!marcados.includes(i)) navigator.vibrate?.(12);
    setMarcados((atual) => (atual.includes(i) ? atual.filter((n) => n !== i) : [...atual, i]));
  };

  return (
    <Section id="para-quem" texture="fosca" fade="paper" labelledBy="para-quem-titulo">
      {/* Luz ciano saindo das laterais, a mesma das "Dores" */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-16 top-[18%] h-56 w-32 rounded-full bg-cyan/40 blur-3xl md:-left-24 md:h-[420px] md:w-64" />
        <div className="absolute -right-16 top-[48%] h-56 w-32 rounded-full bg-cyan/40 blur-3xl md:-right-24 md:top-[30%] md:h-[420px] md:w-64" />
      </div>

      <article
        data-reveal
        className="rounded-[24px] border border-cyan/40 bg-graphite px-5 py-5 shadow-[0_0_26px_rgba(1,187,251,.16)] md:mx-auto md:max-w-[720px] md:px-10 md:py-10"
      >
        <h2 id="para-quem-titulo" className="display text-[22px] leading-none md:text-[30px]">
          {title}
        </h2>
        <p className="mt-3 text-[13px] text-gray md:text-[14px]">{dica}</p>

        <ul className="mt-3 grid gap-2.5 md:mt-4 md:gap-3">
          {items.map((item, i) => {
            const marcado = marcados.includes(i);
            return (
              <li key={item}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={marcado}
                  onClick={() => alternar(i)}
                  className={cn(
                    'flex w-full items-start gap-3.5 rounded-[16px] border-2 px-3.5 py-3 text-left text-[15px] leading-normal transition duration-200 active:scale-[0.99] md:px-5 md:py-4 md:text-[17px]',
                    marcado ? 'border-cyan bg-cyan/10' : 'border-line hover:border-cyan/60',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-[0.18em] grid size-5 shrink-0 place-items-center rounded-[6px] border-2 border-cyan transition-colors duration-200',
                      marcado && 'bg-cyan',
                    )}
                  >
                    <svg viewBox="0 0 24 24" className={cn('size-3.5 text-black transition-opacity', marcado ? 'opacity-100' : 'opacity-0')} fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  {item}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Aparece ao marcar o primeiro item */}
        <div
          inert={!alguem}
          className={cn(
            'grid transition-[grid-template-rows,opacity] duration-500 ease-out',
            alguem ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden">
            <p className="mt-5 text-center text-[19px] font-semibold leading-snug text-cyan md:text-[22px]">{resposta}</p>
            <div className="mt-3.5 text-center md:mt-5">
              <Button>{copy.apply}</Button>
            </div>
          </div>
        </div>
      </article>
    </Section>
  );
}
