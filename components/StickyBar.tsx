'use client';

import { useEffect, useState } from 'react';
import { APPLY_URL } from '@/config';
import { copy } from '@/content/copy';
import { cn } from './ui';

/**
 * Barra fixa de ação no rodapé do celular (some no desktop).
 * Fica escondida enquanto o hero está na tela, porque o hero já tem o botão grande.
 */
export default function StickyBar() {
  const { lead, note } = copy.stickyBar;
  const [heroVisivel, setHeroVisivel] = useState(true);

  useEffect(() => {
    const hero = document.getElementById('inicio');
    if (!hero || !('IntersectionObserver' in window)) {
      setHeroVisivel(false);
      return;
    }
    // Mostra a barra assim que o botão do hero sai da tela
    const observer = new IntersectionObserver(([entry]) => setHeroVisivel(entry.intersectionRatio > 0.6), {
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-label="Ação rápida"
      aria-hidden={heroVisivel}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-line bg-black px-4 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 text-paper transition-transform duration-300 min-[400px]:px-[22px] md:hidden',
        heroVisivel && 'translate-y-full',
      )}
    >
      {/* O texto encolhe e quebra se faltar espaço, o botão ocupa o resto sem passar da tela */}
      <div className="mx-auto flex max-w-[520px] items-center justify-between gap-3">
        <p className="min-w-0 flex-1 leading-tight">
          <span className="block text-[12px] text-gray">{lead}</span>
          <span className="block font-display text-[13px] font-black min-[380px]:text-[14px]">{note}</span>
        </p>
        <a
          href={APPLY_URL}
          tabIndex={heroVisivel ? -1 : undefined}
          className="brilho inline-flex min-h-[48px] w-[156px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-cyan px-4 text-[14px] font-semibold text-black transition active:scale-[0.98] min-[380px]:w-[175px]"
        >
          {copy.apply}
        </a>
      </div>
    </aside>
  );
}
