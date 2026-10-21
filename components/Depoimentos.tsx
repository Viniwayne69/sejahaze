'use client';

import { useEffect, useRef, useState } from 'react';
import { copy } from '@/content/copy';
import { Heading, Section, cn } from './ui';

export default function Depoimentos() {
  const { before, accent, subtitle, hint, illustrative, illustrativeNote, items } = copy.depoimentos;
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  // Atualiza o indicador conforme o carrossel é deslizado
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const card = track.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.offsetWidth + 12;
      setActive(Math.min(items.length - 1, Math.round(track.scrollLeft / step)));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [items.length]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (track && card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  };

  return (
    <Section id="depoimentos" texture="papel-azul" labelledBy="depoimentos-titulo">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <Heading id="depoimentos-titulo" before={before} accent={accent} />
          <p className="mt-2 text-[15px] md:text-[17px]">{subtitle}</p>
        </div>
        {illustrative && (
          <p className="rounded-full border-2 border-black bg-paper px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.06em]">
            {illustrativeNote}
          </p>
        )}
      </div>

      <ul
        ref={trackRef}
        aria-label="Depoimentos"
        className="-mx-[22px] mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-[22px] px-[22px] pb-2 [scrollbar-width:none] md:mx-0 md:mt-10 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <li key={item.name} className="w-[82%] shrink-0 snap-start sm:w-[300px] md:w-[calc((100%-24px)/3)]">
            <figure className="flex h-full flex-col justify-between gap-5 rounded-[24px] border-2 border-black bg-paper px-5 py-5 md:px-6 md:py-6">
              <blockquote className="text-[15px] leading-[1.5]">{item.message}</blockquote>
              <figcaption className="leading-tight">
                <span className="block font-display text-[15px] font-black uppercase">
                  {item.name}
                </span>
                <span className="mt-1 block text-[13px] font-medium text-gray">{item.business}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-col items-center gap-2 md:hidden">
        <div className="flex gap-1.5">
          {items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ver depoimento ${i + 1}`}
              aria-current={active === i}
              className={cn('h-1.5 transition-all', active === i ? 'w-5 bg-cyan' : 'w-2.5 bg-gray')}
            />
          ))}
        </div>
        <p className="text-[12px]">{hint}</p>
      </div>
    </Section>
  );
}
