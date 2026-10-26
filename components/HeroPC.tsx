'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

/** As duas imagens têm o mesmo tamanho (1536x1024) e o mesmo enquadramento, então o palco é o mesmo para as duas. */
const palco = 'absolute left-0 top-0 aspect-[3/2] h-full -translate-x-[16.28%]';

/**
 * Foto do hero no computador: a cena fica dentro da moldura com a quina de cima arredondada à esquerda,
 * e o recorte da mulher (fundo transparente) passa por cima, saindo da moldura para a esquerda.
 * A moldura mostra só da posição 250 à 1250 da imagem; o resto fica cortado.
 *
 * Abertura (globals.css, "Abertura do hero no computador"): um feixe ciano varre a moldura e a revela, o clarão
 * acende e a mulher sai da moldura. Depois, o recorte e o fundo seguem o mouse em profundidade (--mx e --my).
 */
export default function HeroPC({ alt }: { alt: string }) {
  const caixa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = caixa.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const aoMover = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--mx', String(((e.clientX / window.innerWidth) * 2 - 1).toFixed(3)));
        el.style.setProperty('--my', String(((e.clientY / window.innerHeight) * 2 - 1).toFixed(3)));
      });
    };
    window.addEventListener('pointermove', aoMover, { passive: true });
    return () => {
      window.removeEventListener('pointermove', aoMover);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={caixa} className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
      <div className="hero-quadro absolute inset-0 overflow-hidden rounded-tl-[48px]">
        <div className={palco}>
          <div className="hero-par-fundo absolute inset-0">
            <Image src="/images/hero-pc.webp" alt={alt} fill priority sizes="80vw" className="object-cover" />
          </div>
        </div>
        {/* Clarão ciano no instante em que ela sai da moldura */}
        <div aria-hidden="true" className="hero-flash pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_55%,rgba(1,187,251,.75),rgba(1,187,251,0)_65%)] opacity-0 mix-blend-screen" />
      </div>

      {/* Feixe de luz que varre a moldura da esquerda para a direita */}
      <div aria-hidden="true" className="hero-feixe pointer-events-none absolute inset-y-0 left-0 z-10 w-[3px] bg-cyan opacity-0 shadow-[0_0_26px_6px_rgba(1,187,251,.85)]">
        <span className="absolute inset-y-0 right-full w-40 bg-gradient-to-l from-cyan/35 to-transparent" />
      </div>

      <div aria-hidden="true" className={palco}>
        <div className="hero-par absolute inset-0">
          <div className="hero-sai absolute inset-0">
            <Image src="/images/hero-pc-recorte.webp" alt="" fill priority sizes="80vw" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
