import { copy } from '@/content/copy';
import Carrossel from './Carrossel';
import { Accent, Section } from './ui';

type Passo = (typeof copy.quebra.passos)[number];

/**
 * Cartão preto sobre o fundo claro: nome do problema na etiqueta ciano, título, texto
 * e a pergunta que pesa, num bloco ciano no pé do cartão.
 */
function Cartao({ p }: { p: Passo }) {
  return (
    <article className="flex h-full flex-col justify-center overflow-hidden rounded-[24px] bg-black text-center text-paper shadow-[0_14px_34px_rgba(0,0,0,.22)] lg:justify-start lg:rounded-[18px]">
      <div className="px-10 pt-7 md:px-16 md:pt-10 lg:px-10 lg:pt-12">
        <span className="inline-block bg-cyan px-3 py-1.5 font-display text-[12px] font-black uppercase tracking-[0.14em] text-black md:text-[13px]">
          {p.rotulo}
        </span>
        <h3 className="display mt-5 text-[22px] md:mt-6 md:text-[32px] lg:text-[clamp(26px,2.3vw,34px)]">{p.titulo}</h3>
        <p className="mt-4 text-[15.5px] leading-snug text-paper/85 md:mt-5 md:text-[18px]">{p.texto}</p>
      </div>
      <div className="p-3 pt-7 md:p-4 md:pt-9 lg:mt-auto">
        <p className="rounded-[16px] bg-cyan px-4 py-4 text-[16px] font-semibold leading-snug text-black md:px-6 md:py-5 md:text-[19px]">{p.pergunta}</p>
      </div>
    </article>
  );
}

/**
 * Quebra de crença, entre as dores e o método:
 * o problema afirmado e os dois motivos, cada um num cartão. A resposta vem nos pilares logo abaixo.
 */
export default function Quebra() {
  const { rotulo, before, accent, texto, passos } = copy.quebra;

  return (
    <Section id="quebra" texture="papel-azul" fade="black" labelledBy="quebra-titulo">
      {/* 1. Questionamento */}
      <div data-reveal className="text-center md:mx-auto md:max-w-[760px] lg:max-w-[980px]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-black/60 md:text-[13px]">{rotulo}</p>
        <h2
          id="quebra-titulo"
          className="display mt-3 text-[24px] [text-wrap:balance] md:mt-4 md:text-[44px] lg:text-[clamp(52px,5.2vw,76px)]"
        >
          {before} <Accent>{accent}</Accent>
        </h2>
        <p className="mt-4 text-[17px] leading-snug font-medium text-black/80 [text-wrap:balance] md:mt-6 md:text-[19px] lg:text-[20px]">{texto}</p>
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
    </Section>
  );
}
