import { copy } from '@/content/copy';
import { ApplyNote, Button, Heading, Section } from './ui';

/** Única seção ciano da página: texto preto, barra preta e botão preto. */
export default function Aplicacao() {
  const { before, accent, body, cta, passos } = copy.aplicacao;

  return (
    <Section id="aplicar" texture="ciano" labelledBy="aplicar-titulo">
      {/* Luz clara pulsando atrás do título, como a do letreiro no hero */}
      <div aria-hidden="true" className="luz-pulsa pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-[120%] -translate-x-1/2 rounded-full bg-paper/70 blur-3xl md:h-80 md:w-[640px]" />
      <div data-reveal className="mx-auto max-w-[680px] text-center">
        <Heading id="aplicar-titulo" before={before} accent={accent} bar="black" />
        <p className="mt-3 text-[15.5px] font-medium leading-[1.45] md:mt-5 md:text-[18px]">{body}</p>
        <ol className="relative mx-auto mt-5 grid max-w-[460px] grid-cols-3 gap-2 md:mt-8">
          <span aria-hidden="true" className="absolute left-[16.6%] right-[16.6%] top-[18px] h-[3px] bg-black" />
          {passos.map((passo, i) => (
            <li key={passo} className="relative flex flex-col items-center gap-2 text-center">
              <span className="grid size-9 place-items-center rounded-full border-2 border-black bg-black font-display text-[14px] font-black text-cyan">
                {i + 1}
              </span>
              <span className="text-[12.5px] font-semibold leading-tight md:text-[14px]">{passo}</span>
            </li>
          ))}
        </ol>
        <div className="mt-5 md:mt-8">
          <Button variant="dark">{cta}</Button>
          <ApplyNote />
        </div>
      </div>
    </Section>
  );
}
