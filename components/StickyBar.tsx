import { APPLY_URL } from '@/config';
import { copy } from '@/content/copy';

/** Barra fixa de ação no rodapé do celular (some no desktop), como na referência. */
export default function StickyBar() {
  const { lead, note } = copy.stickyBar;

  return (
    <aside
      aria-label="Ação rápida"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-black px-4 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 text-paper min-[400px]:px-[22px] md:hidden"
    >
      {/* O texto encolhe e quebra se faltar espaço, o botão ocupa o resto sem passar da tela */}
      <div className="mx-auto flex max-w-[520px] items-center justify-between gap-3">
        <p className="min-w-0 flex-1 leading-tight">
          <span className="block text-[12px] text-gray">{lead}</span>
          <span className="block font-display text-[13px] font-black min-[380px]:text-[14px]">{note}</span>
        </p>
        <a
          href={APPLY_URL}
          className="inline-flex min-h-[48px] w-[156px] shrink-0 items-center min-[380px]:w-[175px] justify-center whitespace-nowrap rounded-full bg-cyan px-4 text-[14px] font-semibold text-black transition active:scale-[0.98]"
        >
          {copy.apply}
        </a>
      </div>
    </aside>
  );
}
