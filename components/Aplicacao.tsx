import { copy } from '@/content/copy';
import { ApplyNote, Button, Heading, Section } from './ui';

/** Única seção ciano da página: texto preto, barra preta e botão preto. */
export default function Aplicacao() {
  const { before, accent, body, cta, passos } = copy.aplicacao;

  return (
    <Section id="aplicar" texture="ciano" fade="black" labelledBy="aplicar-titulo">
      <div data-reveal className="mx-auto max-w-[680px] text-center lg:max-w-[1100px]">
        <Heading id="aplicar-titulo" before={before} accent={accent} bar="black" className="lg:text-[clamp(64px,7.2vw,108px)]" />
        <p className="mt-3 text-[15.5px] font-medium leading-[1.45] md:mt-5 md:text-[18px] lg:hidden">{body}</p>
        <ol className="relative mx-auto mt-5 grid max-w-[460px] grid-cols-3 gap-2 md:mt-8 lg:mt-14 lg:max-w-[980px] lg:gap-6">
          <span aria-hidden="true" className="absolute left-[16.6%] right-[16.6%] top-[18px] h-[3px] bg-black lg:top-[24px]" />
          {passos.map((passo, i) => (
            <li key={passo} className="relative flex flex-col items-center gap-2 text-center">
              <span className="grid size-9 place-items-center rounded-full border-2 border-black bg-black font-display text-[14px] font-black text-cyan lg:size-12 lg:text-[18px]">
                {i + 1}
              </span>
              <span className="text-[12.5px] font-semibold leading-tight md:text-[14px] lg:text-[17px] lg:font-bold lg:uppercase">{passo}</span>
            </li>
          ))}
        </ol>
        <div className="mt-5 md:mt-8 lg:mt-12">
          <Button variant="dark" className="lg:min-h-[64px] lg:min-w-[520px] lg:text-[17px] lg:font-bold lg:uppercase lg:tracking-[0.02em]">
            {cta}
          </Button>
          <ApplyNote />
        </div>
      </div>
    </Section>
  );
}
