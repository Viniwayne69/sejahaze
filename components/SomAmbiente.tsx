'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from './ui';

/**
 * Botão de som do formulário: o navegador só deixa o áudio tocar depois de um toque da pessoa,
 * então a música só é baixada e começa quando ela liga. Fica em loop, com volume baixo, e para ao sair da página.
 */
export default function SomAmbiente({ src, rotulo }: { src: string; rotulo: string }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [ligado, setLigado] = useState(false);

  useEffect(() => {
    return () => {
      audio.current?.pause();
      audio.current = null;
    };
  }, []);

  const alternar = async () => {
    if (!audio.current) {
      const a = new Audio(src);
      a.loop = true;
      a.volume = 0.35;
      audio.current = a;
    }
    const a = audio.current;
    if (ligado) {
      a.pause();
      setLigado(false);
      return;
    }
    try {
      await a.play();
      setLigado(true);
    } catch {
      setLigado(false);
    }
  };

  return (
    <button
      type="button"
      onClick={alternar}
      aria-pressed={ligado}
      aria-label={ligado ? 'Desligar o som' : 'Ligar o som'}
      className={cn(
        'mx-auto mt-4 inline-flex items-center gap-2.5 rounded-full border-2 border-black px-3.5 py-2 text-[13px] font-semibold leading-tight transition duration-200 active:scale-[0.98] md:text-[14px]',
        ligado ? 'bg-cyan shadow-[0_0_18px_rgba(1,187,251,.6)]' : 'bg-paper hover:border-cyan',
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" />
        {ligado ? (
          <>
            <path d="M15.5 9a4 4 0 0 1 0 6" />
            <path d="M18 6.5a8 8 0 0 1 0 11" />
          </>
        ) : (
          <path d="M16 9.5l5 5M21 9.5l-5 5" />
        )}
      </svg>
      <span>{rotulo}</span>
    </button>
  );
}
