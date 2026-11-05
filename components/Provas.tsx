import { copy } from '@/content/copy';
import Carrossel from './Carrossel';
import { Accent, Section } from './ui';

type Prova = (typeof copy.provas.itens)[number];

const etapas = [
  { chave: 'problema', rotulo: 'PROBLEMA INICIAL' },
  { chave: 'intervencao', rotulo: 'INTERVENÇÃO' },
  { chave: 'resultado', rotulo: 'RESULTADO' },
] as const;

function Caso({ p }: { p: Prova }) {
  return (
    <article className="flex h-full flex-col rounded-[24px] border border-cyan/40 bg-graphite px-6 py-6 lg:rounded-[18px] lg:px-8 lg:py-8">
      <header className="leading-tight">
        <p className="font-display text-[18px] font-black uppercase md:text-[20px]">{p.cliente}</p>
        <p className="mt-1 text-[13px] text-gray md:text-[14px]">{p.segmento}</p>
      </header>
      <dl className="mt-5 grid gap-4">
        {etapas.map((e) => (
          <div key={e.chave}>
            <dt className="font-display text-[12px] font-black uppercase tracking-[0.14em] text-cyan">{e.rotulo}</dt>
            <dd className="mt-1 text-[15px] leading-snug text-paper/90 md:text-[16px]">{p[e.chave]}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

/**
 * Provas: casos reais em problema inicial, intervenção e resultado.
 * Só aparece com casos em `copy.provas.itens`; sem caso real a seção não é desenhada
 * (nunca inventamos cliente, número ou depoimento).
 */
export default function Provas() {
  const { rotulo, before, accent, itens } = copy.provas;
  if (itens.length === 0) return null;

  return (
    <Section id="provas" texture="fosca" labelledBy="provas-titulo">
      <div data-reveal className="text-center md:mx-auto md:max-w-[760px] lg:max-w-[980px]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gray md:text-[13px]">{rotulo}</p>
        <h2 id="provas-titulo" className="display mt-3 text-[26px] md:mt-4 md:text-[44px] lg:text-[clamp(52px,5.2vw,76px)]">
          {before} <Accent>{accent}</Accent>
        </h2>
      </div>
      <Carrossel label="Casos de clientes" items={itens.map((p) => <Caso key={p.cliente} p={p} />)} />
    </Section>
  );
}
