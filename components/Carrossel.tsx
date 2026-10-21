'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from './ui';

/**
 * Celular: cartões lado a lado que deslizam, cada um INTEIRO na tela (sem corte na borda),
 * com uma seta e bolinhas mostrando em qual está e quantos existem. Desktop: grade de 3 colunas.
 * `setaTop` ajusta a altura das setas (ex.: no meio da foto de cada cartão).
 */
export default function Carrossel({
  label,
  items,
  setaTop = 'top-1/2',
}: {
  label: string;
  items: React.ReactNode[];
  setaTop?: string;
}) {
  const trilho = useRef<HTMLOListElement>(null);
  const [ativo, setAtivo] = useState(0);
  // A seta vira ao chegar no último cartão e só desvira quando volta ao primeiro
  const [voltando, setVoltando] = useState(false);

  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    const aoRolar = () => {
      const largura = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 1;
      const i = Math.min(items.length - 1, Math.max(0, Math.round(el.scrollLeft / (largura + 12))));
      setAtivo(i);
      if (i === items.length - 1) setVoltando(true);
      else if (i === 0) setVoltando(false);
    };
    el.addEventListener('scroll', aoRolar, { passive: true });
    return () => el.removeEventListener('scroll', aoRolar);
  }, [items.length]);

  const irPara = (i: number) => {
    const el = trilho.current;
    const alvo = el?.children[i] as HTMLElement | undefined;
    if (el && alvo) el.scrollTo({ left: alvo.offsetLeft - el.offsetLeft, behavior: 'smooth' });
  };

  return (
    <div data-reveal className="mt-5 md:mt-10">
      <div className="relative">
        <ol
          ref={trilho}
          aria-label={label}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-5 md:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => (
            <li key={i} className="w-full shrink-0 snap-center md:w-auto">
              {item}
            </li>
          ))}
        </ol>

        {/* Uma seta só, na direita: ao chegar no último cartão ela vira e continua virada (voltando) até o primeiro */}
        <button
          type="button"
          onClick={() => irPara(voltando ? Math.max(0, ativo - 1) : ativo + 1)}
          aria-label={voltando ? 'Cartão anterior' : 'Próximo cartão'}
          className={cn(
            'absolute right-1.5 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full border-2 border-black bg-cyan text-black transition-transform duration-300 active:scale-95 md:hidden',
            setaTop,
            voltando && 'rotate-180',
          )}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mt-3.5 flex justify-center gap-1.5 md:hidden" role="group" aria-label="Escolher cartão">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => irPara(i)}
            aria-label={`Ver cartão ${i + 1} de ${items.length}`}
            aria-current={ativo === i}
            className={cn('h-1.5 transition-all duration-300', ativo === i ? 'w-6 bg-cyan' : 'w-2.5 bg-gray')}
          />
        ))}
      </div>
    </div>
  );
}
