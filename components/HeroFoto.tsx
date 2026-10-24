'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import HeroDither from './HeroDither';

/**
 * Foto do hero com profundidade: respira num zoom bem lento (CSS) e desce um pouco mais devagar
 * que a página ao rolar (parallax). Leva junto a luz pulsante do letreiro, para ela ficar sempre sobre ele.
 * Ao abrir o site, por cima da foto roda o efeito dither com shimmer (HeroDither), que se desmancha em uma onda e deixa
 * a foto nítida; depois disso o canvas sai da tela e nada mais roda.
 */
export default function HeroFoto({ src, alt }: { src: string; alt: string }) {
  const camada = useRef<HTMLDivElement>(null);
  // 'abertura': efeito dither em cena; 'revelando': a onda desmancha o efeito; 'fim': só a foto nítida
  const [fase, setFase] = useState<'abertura' | 'revelando' | 'fim'>('abertura');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const atualizar = () => {
      frame = 0;
      if (camada.current) camada.current.style.transform = `translate3d(0, ${Math.min(window.scrollY * 0.1, 28)}px, 0)`;
    };
    const aoRolar = () => {
      if (!frame) frame = requestAnimationFrame(atualizar);
    };
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', aoRolar);
    };
  }, []);

  return (
    <div ref={camada} className="absolute inset-0 will-change-transform">
      <div className="foto-respira absolute inset-0">
        <Image src={src} alt={alt} fill priority sizes="(min-width: 768px) 400px, 100vw" className={`object-cover object-[50%_42%] transition-opacity duration-[1500ms] ${fase === 'abertura' ? 'opacity-[.62]' : 'opacity-100'}`} />
        {fase !== 'fim' && <HeroDither src={src} posicao={[0.5, 0.42]} aoRevelar={() => setFase('revelando')} aoFim={() => setFase('fim')} />}
        {/* Luz do letreiro ciano pulsando de leve */}
        <div aria-hidden="true" className="letreiro-pulso pointer-events-none absolute -right-[10%] top-[15%] h-[20%] w-[50%] rounded-full bg-cyan mix-blend-screen blur-2xl" />
      </div>
    </div>
  );
}
