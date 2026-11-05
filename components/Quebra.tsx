import { copy } from '@/content/copy';
import Carrossel from './Carrossel';
import { Accent, Button, Section } from './ui';

type Passo = (typeof copy.quebra.passos)[number];

/**
 * Cartão claro sobre o fundo preto: nome do problema na etiqueta preta, título, texto
 * e a pergunta que pesa, num bloco preto no pé do cartão.
 */
function Cartao({ p }: { p: Passo }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[24px] bg-paper text-center text-black shadow-[0_0_34px_rgba(1,187,251,.28)] lg:rounded-[18px]">
      <div className="px-10 pb-1 pt-6 md:px-16 md:pt-9 lg:px-10 lg:pt-10">
        <span className="inline-block bg-black px-3 py-1.5 font-display text-[12px] font-black uppercase tracking-[0.14em] text-cyan md:text-[13px]">
          {p.rotulo}
        </span>
        <h3 className="display mt-4 text-[22px] md:mt-5 md:text-[34px] lg:text-[clamp(28px,2.4vw,36px)]">{p.titulo}</h3>
        <p className="mt-3 text-[15.5px] leading-snug text-black/80 md:mt-4 md:text-[18px]">{p.texto}</p>
      </div>
      <div className="mt-auto p-3 pt-6 md:p-4 md:pt-8">
        <p className="rounded-[16px] bg-black px-4 py-4 text-[16px] font-semibold leading-snug text-cyan md:px-6 md:py-5 md:text-[19px]">{p.pergunta}</p>
      </div>
    </article>
  );
}

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
      <div data-reveal className="text-center md:mx-auto md:max-w-[760px] lg:max-w-[980px]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gray md:text-[13px]">{rotulo}</p>
        <h2
          id="quebra-titulo"
          className="display mt-3 text-[24px] [text-wrap:balance] md:mt-4 md:text-[44px] lg:text-[clamp(52px,5.2vw,76px)]"
        >
          {before} <Accent>{accent}</Accent>
        </h2>
        <p className="mt-4 text-[16px] leading-snug text-paper/90 md:mt-6 md:text-[19px] lg:text-[20px]">{texto}</p>
      </div>

      {/* 2 e 3. Valor percebido e conversão: carrossel no celular e no tablet, duas colunas no computador */}
      <div className="lg:hidden">
        <Carrossel label="O que pode estar travando a sua marca" setaTop="top-[11%]" items={passos.map((p) => <Cartao key={p.rotulo} p={p} />)} />
      </div>
      <div data-reveal className="mt-14 hidden gap-8 lg:grid lg:grid-cols-2">
        {passos.map((p) => (
          <Cartao key={p.rotulo} p={p} />
        ))}
      </div>

      {/* 4. Solução HAZE */}
      <div
        data-reveal
        className="mt-6 rounded-[24px] bg-cyan px-5 py-8 text-center text-black md:mx-auto md:mt-8 md:px-12 md:py-12 lg:mt-8 lg:max-w-none lg:rounded-[18px] lg:px-16 lg:py-14"
      >
        <p className="inline-block bg-black px-3 py-1.5 font-display text-[12px] font-black uppercase tracking-[0.14em] text-cyan md:text-[13px]">{solucao.rotulo}</p>
        <h3 className="display mt-4 text-[26px] [text-wrap:balance] md:text-[40px] lg:text-[clamp(40px,4vw,58px)]">{solucao.titulo}</h3>
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
