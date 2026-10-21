import { APPLY_URL } from '@/config';
import { copy } from '@/content/copy';

/** Barra fixa de ação no rodapé do celular (some no desktop), como na referência. */
export default function StickyBar() {
  const { lead, note } = copy.stickyBar;

  return (
    <aside
      aria-label="Ação rápida"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-black/95 px-[22px] pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 text-paper backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex max-w-[520px] items-center justify-between gap-4">
        <p className="leading-tight">
          <span className="block text-[12px] text-paper/65">{lead}</span>
          <span className="block whitespace-nowrap font-display text-[14px] font-extrabold">{note}</span>
        </p>
        <a
          href={APPLY_URL}
          className="inline-flex min-h-[48px] w-[175px] shrink-0 items-center justify-center rounded-full bg-cyan px-4 text-[14px] font-bold text-black transition active:scale-[0.98]"
        >
          {copy.apply}
        </a>
      </div>
    </aside>
  );
}
