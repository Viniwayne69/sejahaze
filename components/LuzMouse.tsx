'use client';

import { useEffect } from 'react';

/**
 * Luz que segue o mouse nas seções escuras (as que têm a classe `glow`): só guarda a posição do cursor
 * nas variáveis --mx e --my da seção, e o CSS desenha o brilho. Não faz nada em tela de toque.
 */
export default function LuzMouse() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let frame = 0;
    let ultimo: PointerEvent | null = null;

    const atualizar = () => {
      frame = 0;
      const alvo = (ultimo?.target as Element | null)?.closest<HTMLElement>('.glow');
      if (!alvo || !ultimo) return;
      const r = alvo.getBoundingClientRect();
      alvo.style.setProperty('--mx', `${ultimo.clientX - r.left}px`);
      alvo.style.setProperty('--my', `${ultimo.clientY - r.top}px`);
    };
    const aoMover = (e: PointerEvent) => {
      ultimo = e;
      if (!frame) frame = requestAnimationFrame(atualizar);
    };

    document.addEventListener('pointermove', aoMover, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', aoMover);
    };
  }, []);

  return null;
}
