import { copy } from '@/content/copy';
import Carrossel from './Carrossel';
import { Accent, Section } from './ui';

/**
 * Os 3 pilares de uma marca desejada, como um único sistema: três linhas separadas por divisores finos,
 * numeração grande em ciano e muito espaço. Sem botão nem fechamento: termina nos pilares e segue para o método.
 */
export default function Pilares() {
  const { rotulo, before, accent, texto, itens } = copy.pilares;

  return (
    <Section id="pilares" texture="fosca-azul" fade="black" labelledBy="pilares-titulo">
      <div data-reveal className="text-center md:mx-auto md:max-w-[760px] lg:max-w-[980px]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gray md:text-[13px]">{rotulo}</p>
        <h2 id="pilares-titulo" className="display mt-3 text-[26px] md:mt-4 md:text-[44px] lg:text-[clamp(52px,5.2vw,76px)]">
          {before} <Accent>{accent}</Accent>
        </h2>
        <p className="mt-4 text-[16px] leading-snug text-paper/90 md:mt-6 md:text-[19px] lg:text-[20px]">{texto}</p>
      </div>

      {/* Celular e tablet: cartões que deslizam, como nas outras seções */}
      <div className="lg:hidden">
        <Carrossel
          label="Os 3 pilares de uma marca desejada"
          setaTop="top-[64%]"
          items={itens.map((p) => (
            <article key={p.numero} className="relative isolate flex h-full flex-col overflow-hidden rounded-[24px] border border-cyan/50 bg-line shadow-[0_0_30px_rgba(1,187,251,.2)]">
              {/* Faixa ciano: o nome do pilar e o número grande */}
              <div className="flex items-center justify-between bg-cyan px-5 py-2.5 text-black md:px-9 md:py-4">
                <span className="font-display text-[12px] font-black uppercase tracking-[0.14em] md:text-[14px]">{p.rotulo}</span>
                <span className="font-display text-[38px] font-black leading-none md:text-[56px]">{p.numero}</span>
              </div>

              {/* Número gigante apagado atrás do texto, para o cartão não ficar vazio */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -right-2 -z-10 select-none font-display text-[130px] font-black leading-none text-cyan/[0.07] md:text-[200px]"
              >
                {p.numero}
              </span>

              <div className="flex flex-1 flex-col justify-center px-9 pb-5 pt-5 text-center md:px-16 md:pb-8 md:pt-7">
                <h3 className="display text-[20px] md:text-[30px]">{p.titulo}</h3>
                <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-9 bg-cyan" />
                <p className="mt-3 text-[14.5px] leading-snug text-paper/90 md:text-[17px]">{p.texto}</p>
              </div>
            </article>
          ))}
        />
      </div>

      {/* Computador: três linhas separadas por divisores */}
      <div data-reveal className="mt-20 hidden lg:block">
        <ol className="border-t border-paper/20">
          {itens.map((p) => (
            <li
              key={p.numero}
              className="border-b border-paper/20 py-7 md:py-10 lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,5fr)_minmax(0,4fr)] lg:items-start lg:gap-x-12 lg:py-14"
            >
              <div className="flex items-end gap-4 lg:block">
                <span className="font-display text-[56px] font-black leading-none text-cyan md:text-[72px] lg:text-[clamp(88px,8vw,128px)]">{p.numero}</span>
                <span className="pb-1 font-display text-[12px] font-black uppercase tracking-[0.14em] text-cyan md:text-[13px] lg:mt-4 lg:block lg:pb-0">
                  <span aria-hidden="true">/ </span>
                  {p.rotulo}
                </span>
              </div>
              <h3 className="display mt-4 text-[24px] md:text-[32px] lg:mt-0 lg:text-[clamp(30px,2.8vw,42px)]">{p.titulo}</h3>
              <p className="mt-3 text-[15px] leading-snug text-paper/90 md:mt-4 md:text-[17px] lg:mt-1">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
