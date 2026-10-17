'use client';

import { useEffect, useRef, useState } from 'react';
import { copy } from '@/content/copy';
import Logo from './Logo';
import { Button, cn } from './ui';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 24);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const openMenu = () => {
    dialogRef.current?.showModal();
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => dialogRef.current?.close();

  return (
    <>
      <a
        href="#conteudo"
        className="fixed left-3 top-3 z-[100] -translate-y-[200%] rounded-full bg-black px-5 py-3 text-sm font-semibold text-paper transition focus:translate-y-0"
      >
        {copy.skipLink}
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300',
          scrolled ? 'bg-paper/90 shadow-header backdrop-blur-md' : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-site items-center justify-between px-5 sm:h-[88px] sm:px-8 xl:px-0">
          <a href="#inicio" aria-label={`${copy.brand}, voltar ao início`}>
            <Logo />
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-9 md:flex">
            {copy.nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className={cn('text-[15px] transition-opacity hover:opacity-60', i === 0 ? 'font-semibold' : 'font-normal')}
              >
                {item.label}
              </a>
            ))}
            <Button size="sm" className="ml-2 min-w-[178px]" />
          </nav>

          <button
            type="button"
            onClick={openMenu}
            aria-label={copy.openMenu}
            aria-controls="menu-movel"
            aria-haspopup="dialog"
            className="grid size-11 place-items-center rounded-full bg-paper/80 backdrop-blur md:hidden"
          >
            <span aria-hidden="true" className="flex w-[18px] flex-col gap-[5px]">
              <span className="h-0.5 bg-black" />
              <span className="h-0.5 bg-black" />
              <span className="h-0.5 bg-black" />
            </span>
          </button>
        </div>

        <div ref={progressRef} aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-cyan" />
      </header>

      <dialog
        id="menu-movel"
        ref={dialogRef}
        aria-label="Menu"
        onClose={() => {
          document.body.style.overflow = '';
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeMenu();
        }}
        className="m-0 ml-auto h-dvh max-h-none w-[min(88vw,400px)] max-w-none bg-paper p-0 text-black backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      >
        <div className="flex min-h-full flex-col px-6 pb-8 pt-5">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={closeMenu}
              aria-label={copy.closeMenu}
              className="grid size-11 place-items-center rounded-full border border-black/15"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          </div>

          <nav aria-label="Menu móvel" className="mt-14 flex flex-col gap-1">
            {copy.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="display border-b border-black/10 py-4 text-[26px]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-10" onClick={closeMenu}>
            <Button className="w-full" />
            <p className="mt-3 text-center text-xs font-medium">{copy.applyNote}</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
