import { copy } from '@/content/copy';
import { Accent } from './ui';

/**
 * Diferenciação: o fecho dos pilares. Diz que a HAZE liga posicionamento, experiência e comercial
 * em vez de tratar cada um isolado, sem repetir os pilares. Fica dentro da seção dos pilares (mesmo fundo).
 */
export default function Diferenciacao() {
  const { before, accent, problemas, texto } = copy.diferenciacao;

  return (
    <div data-reveal className="mx-auto mt-14 max-w-[760px] border-t border-paper/20 pt-12 text-center md:mt-20 md:pt-16 lg:mt-24 lg:max-w-[980px] lg:pt-20">
      <h3 className="display text-[24px] [text-wrap:balance] md:text-[40px] lg:text-[clamp(44px,4.4vw,64px)]">
        {before} <Accent>{accent}</Accent>
      </h3>

      <ul className="mx-auto mt-6 grid max-w-[640px] gap-3 text-[16px] leading-snug text-paper/90 md:mt-9 md:gap-4 md:text-[19px] lg:text-[20px]">
        {problemas.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <span aria-hidden="true" className="mx-auto mt-7 block h-[3px] w-9 bg-cyan md:mt-9" />

      <p className="mx-auto mt-7 max-w-[680px] text-[16px] font-semibold leading-snug md:mt-9 md:text-[20px]">{texto}</p>
    </div>
  );
}
