import { copy } from '@/content/copy';
import { Accent, Button, Section } from './ui';

/**
 * Quebra de crença, entre as dores e o método:
 * questionamento, valor percebido, conversão e a solução da HAZE, nessa ordem.
 */
export default function Quebra() {
  const { rotulo, before, accent, texto, passos, solucao } = copy.quebra;

  return (
    <Section id="quebra" texture="nevoa" fade="black" labelledBy="quebra-titulo">
      {/* Luz ciano nas laterais, a mesma das outras seções escuras */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-16 top-[26%] h-56 w-32 rounded-full bg-cyan/40 blur-3xl md:-left-24 md:h-[420px] md:w-64" />
        <div className="absolute -right-16 top-[58%] h-56 w-32 rounded-full bg-cyan/40 blur-3xl md:-right-24 md:top-[50%] md:h-[420px] md:w-64" />
      </div>

      {/* 1. Questionamento */}
      <div data-reveal className="md:mx-auto md:max-w-[760px] md:text-center lg:max-w-[980px]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gray md:text-[13px]">{rotulo}</p>
        <h2
          id="quebra-titulo"
          className="display mt-3 text-[26px] md:mt-4 md:text-[44px] lg:text-[clamp(52px,5.2vw,76px)]"
        >
          {before} <Accent>{accent}</Accent>
        </h2>
        <p className="mt-4 text-[16px] leading-snug text-paper/90 md:mt-6 md:text-[19px] lg:text-[20px]">{texto}</p>
      </div>

      {/* 2 e 3. Valor percebido e conversão */}
      <ol className="mt-7 grid gap-4 md:mt-12 md:gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-8">
        {passos.map((p) => (
          <li key={p.numero} data-reveal className="flex">
            <article className="flex w-full flex-col rounded-[24px] border border-cyan/40 bg-graphite px-5 py-6 shadow-[0_0_26px_rgba(1,187,251,.16)] md:px-9 md:py-9 lg:rounded-[18px] lg:px-10 lg:py-11">
              <p className="font-display text-[13px] font-black uppercase tracking-[0.08em] text-cyan md:text-[14px]">
                {p.numero} / {p.rotulo}
              </p>
              <h3 className="display mt-5 text-[22px] md:text-[28px] lg:text-[clamp(26px,2.3vw,34px)]">{p.titulo}</h3>
              <p className="mt-3 text-[15px] leading-snug text-paper/90 md:mt-4 md:text-[17px] lg:mb-6">{p.texto}</p>
              <p className="mt-5 border-l-4 border-cyan pl-4 text-[16px] font-semibold leading-snug text-cyan md:mt-6 md:text-[18px] lg:mt-auto lg:pt-0">
                {p.pergunta}
              </p>
            </article>
          </li>
        ))}
      </ol>

      {/* 4. Solução HAZE */}
      <div
        data-reveal
        className="mt-4 rounded-[24px] bg-cyan px-5 py-7 text-center text-black md:mx-auto md:mt-5 md:px-12 md:py-12 lg:mt-8 lg:max-w-none lg:rounded-[18px] lg:px-16 lg:py-14"
      >
        <p className="font-display text-[12px] font-black uppercase tracking-[0.14em] md:text-[13px]">{solucao.rotulo}</p>
        <h3 className="display mt-3 text-[26px] md:text-[40px] lg:text-[clamp(40px,4vw,58px)]">{solucao.titulo}</h3>
        <p className="mx-auto mt-4 max-w-[760px] text-[16px] font-medium leading-snug md:mt-5 md:text-[19px]">{solucao.texto}</p>
        <div className="mt-6 md:mt-8">
          <Button variant="dark" className="md:min-w-[420px]">
            {solucao.botao}
          </Button>
          <p className="mt-3 text-[13px] font-medium md:text-[14px]">{solucao.nota}</p>
        </div>
      </div>
    </Section>
  );
}
