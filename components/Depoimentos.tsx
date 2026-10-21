'use client';

import { useEffect, useRef, useState } from 'react';
import { copy } from '@/content/copy';
import { DoubleCheck } from './icons';
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
    <Section id="depoimentos" tone="white" labelledBy="depoimentos-titulo">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <Heading id="depoimentos-titulo" before={before} accent={accent} />
          <p className="mt-2 text-[15px] text-black/70 md:text-[17px]">{subtitle}</p>
        </div>
        {illustrative && (
          <p className="rounded-full border border-black/15 px-2.5 py-1 text-[11px] font-medium text-black/60">{illustrativeNote}</p>
        )}
      </div>

      <ul
        ref={trackRef}
        aria-label="Depoimentos"
        className="-mx-[22px] mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-[22px] px-[22px] pb-2 [scrollbar-width:none] md:mx-0 md:mt-10 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <li key={item.name} className="w-[82%] shrink-0 snap-start sm:w-[300px] md:w-[calc((100%-24px)/3)]">
            <figure className="flex h-full flex-col overflow-hidden rounded-2xl bg-black text-paper">
              <figcaption className="flex items-center gap-3 border-b border-line px-4 py-3">
                <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-cyan font-display text-[14px] font-black text-black">
                  {item.name.charAt(0)}
                </span>
                <span className="leading-tight">
                  <span className="block text-[14px] font-semibold">{item.name}</span>
                  <span className="block text-[12px] text-paper/60">{item.business}</span>
                </span>
              </figcaption>
              <div className="flex-1 bg-graphite px-3.5 pb-4 pt-5">
                <blockquote className="relative ml-1 rounded-xl rounded-tl-none bg-paper px-3.5 pb-2 pt-2.5 text-[14px] leading-[1.45] text-black">
                  <span aria-hidden="true" className="absolute -left-2 top-0 size-0 border-r-[8px] border-t-[8px] border-r-paper border-t-transparent" />
                  {item.message}
                  <span className="mt-1 flex items-center justify-end gap-1 text-[11px] text-black/50">
                    {item.time}
                    <DoubleCheck className="text-cyan" />
                  </span>
                </blockquote>
              </div>
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
              className={cn('h-1.5 rounded-full transition-all', active === i ? 'w-5 bg-cyan' : 'w-1.5 bg-black/20')}
            />
          ))}
        </div>
        <p className="text-[12px] text-black/55">{hint}</p>
      </div>
    </Section>
  );
}
