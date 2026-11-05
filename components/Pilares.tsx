import { copy } from '@/content/copy';
import Carrossel from './Carrossel';
import { Accent, Section } from './ui';

/**
 * Os 3 pilares de uma marca desejada, como um único sistema: três linhas separadas por divisores finos,
 * numeração grande em ciano e muito espaço. Sem botão: conduz o visitante ao método logo abaixo.
 */
export default function Pilares() {
  const { rotulo, before, accent, texto, itens, fechamento } = copy.pilares;

  return (
    <Section id="pilares" texture="fosca-azul" fade="black" labelledBy="pilares-titulo">
      <div data-reveal className="md:mx-auto md:max-w-[760px] md:text-center lg:max-w-[980px]">
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
          setaTop="top-[62%]"
          items={itens.map((p) => (
            <article key={p.numero} className="relative isolate flex h-full flex-col overflow-hidden rounded-[24px] border border-cyan/50 bg-graphite shadow-[0_0_30px_rgba(1,187,251,.2)]">
              {/* Faixa ciano: o nome do pilar e o número grande */}
              <div className="flex items-center justify-between bg-cyan px-5 py-3.5 text-black md:px-9 md:py-5">
                <span className="font-display text-[13px] font-black uppercase tracking-[0.14em] md:text-[15px]">{p.rotulo}</span>
                <span className="font-display text-[52px] font-black leading-none md:text-[72px]">{p.numero}</span>
              </div>

              {/* Número gigante apagado atrás do texto, para o cartão não ficar vazio */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -right-2 -z-10 select-none font-display text-[190px] font-black leading-none text-cyan/[0.07] md:text-[240px]"
              >
                {p.numero}
              </span>

              <div className="flex flex-1 flex-col px-5 pb-7 pt-6 pr-12 md:px-9 md:pb-10 md:pt-8 md:pr-16">
                <h3 className="display text-[26px] md:text-[34px]">{p.titulo}</h3>
                <span aria-hidden="true" className="mt-4 block h-[4px] w-10 bg-cyan" />
                <p className="mt-4 text-[15.5px] leading-snug text-paper/90 md:text-[18px]">{p.texto}</p>
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

      {/* Fechamento: os três são um só sistema, e leva ao método */}
      <div data-reveal className="mt-10 md:mx-auto md:mt-16 md:max-w-[820px] md:text-center lg:mt-24 lg:max-w-[1000px]">
        <h3 className="display text-[26px] md:text-[40px] lg:text-[clamp(40px,4.2vw,62px)]">{fechamento.titulo}</h3>
        <p className="mt-4 text-[16px] leading-snug text-paper/90 md:mt-6 md:text-[19px]">{fechamento.texto}</p>
        <p className="mt-5 inline-block border-l-4 border-cyan pl-4 text-left text-[18px] font-semibold text-cyan md:mt-7 md:text-[22px]">{fechamento.fecho}</p>
      </div>
    </Section>
  );
}
