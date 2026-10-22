'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const suavizar = 'clip-path 0.8s ease, left 0.8s ease';

/**
 * Antes e depois arrastável: a mesma loja apagada e depois desejada, com uma linha que o visitante
 * arrasta (mouse, dedo ou setas do teclado). Ao aparecer na tela, a linha balança uma vez de convite.
 * `touch-action: pan-y` deixa a página rolar na vertical enquanto o arrasto horizontal é da linha.
 */
export default function AntesDepois({
  antes,
  depois,
  antesFrase,
  depoisFrase,
}: {
  antes: string;
  depois: string;
  antesFrase: string;
  depoisFrase: string;
}) {
  const caixa = useRef<HTMLDivElement>(null);
  const arrastando = useRef(false);
  const mexeu = useRef(false);
  const [pos, setPos] = useState(50);
  const [suave, setSuave] = useState(false);

  const moverPara = useCallback((clientX: number) => {
    const r = caixa.current?.getBoundingClientRect();
    if (!r || !r.width) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  useEffect(() => {
    const el = caixa.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (mexeu.current) return;
        setSuave(true);
        for (const [atraso, valor] of [[0, 28], [800, 72], [1600, 50]]) {
          timers.push(window.setTimeout(() => !mexeu.current && setPos(valor), atraso));
        }
        timers.push(window.setTimeout(() => setSuave(false), 2500));
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const comecar = (e: React.PointerEvent) => {
    mexeu.current = true;
    arrastando.current = true;
    setSuave(false);
    e.currentTarget.setPointerCapture(e.pointerId);
    moverPara(e.clientX);
  };

  const teclas = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    mexeu.current = true;
    setSuave(false);
    setPos((p) => Math.min(100, Math.max(0, p + (e.key === 'ArrowRight' ? 5 : -5))));
  };

  const transicao = suave ? { transition: suavizar } : undefined;

  return (
    <div
      ref={caixa}
      role="slider"
      tabIndex={0}
      aria-label="Comparar antes e depois"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-valuetext={pos < 50 ? depois : antes}
      onPointerDown={comecar}
      onPointerMove={(e) => arrastando.current && moverPara(e.clientX)}
      onPointerUp={() => (arrastando.current = false)}
      onPointerCancel={() => (arrastando.current = false)}
      onKeyDown={teclas}
      className="relative mx-auto aspect-[4/5] w-full max-w-[420px] cursor-ew-resize select-none overflow-hidden rounded-[24px] border-2 border-black bg-black [touch-action:pan-y]"
    >
      <Image
        src="/images/antes.webp"
        alt="A loja sem movimento: céu nublado, vitrine vazia e a dona sozinha na porta, preocupada"
        fill
        sizes="(min-width: 768px) 420px, 100vw"
        draggable={false}
        className="pointer-events-none object-cover object-[50%_62%]"
      />
      <p className="pointer-events-none absolute left-3 top-3 max-w-[47%] rounded-[14px] border-2 border-black bg-paper px-2.5 py-1.5 font-display text-[11.5px] font-black uppercase leading-tight text-black md:text-[15px]">
        {antesFrase}
      </p>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)`, ...transicao }}>
        <Image
          src="/images/hero.webp"
          alt="A mesma loja desejada: a dona confiante na porta e clientes saindo com sacolas pretas"
          fill
          sizes="(min-width: 768px) 420px, 100vw"
          draggable={false}
          className="pointer-events-none object-cover object-[50%_62%]"
        />
        <p className="pointer-events-none absolute right-3 top-3 max-w-[47%] rounded-[14px] border-2 border-black bg-cyan px-2.5 py-1.5 text-right font-display text-[11.5px] font-black uppercase leading-tight text-black md:text-[15px]">
          {depoisFrase}
        </p>
      </div>

      <span className="pointer-events-none absolute bottom-3 left-3 rounded-full border-2 border-black bg-paper px-3 py-1 font-display text-[12px] font-black uppercase leading-none text-black md:text-[14px]">
        {antes}
      </span>
      <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border-2 border-black bg-cyan px-3 py-1 font-display text-[12px] font-black uppercase leading-none text-black md:text-[14px]">
        {depois}
      </span>

      {/* Linha e botão de arrastar */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-cyan" style={{ left: `${pos}%`, ...transicao }} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-black bg-cyan text-black"
        style={{ left: `${pos}%`, ...transicao }}
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
        </svg>
      </div>
    </div>
  );
}
