import { copy } from '@/content/copy';
import { ApplyNote, Button, Heading, Section } from './ui';

export default function Aplicacao() {
  const { before, accent, body, cta } = copy.aplicacao;

  return (
    <Section id="aplicar" tone="dark" labelledBy="aplicar-titulo">
      {/* Brilho ciano suave atrás do bloco */}
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(1_187_251/0.22),transparent)] md:size-[680px]" />
      <div data-reveal className="mx-auto max-w-[680px] text-center">
        <Heading id="aplicar-titulo" before={before} accent={accent} />
        <p className="mt-3 text-[15.5px] leading-[1.45] text-paper/85 md:mt-5 md:text-[18px]">{body}</p>
        <div className="mt-5 md:mt-8">
          <Button>{cta}</Button>
          <ApplyNote />
        </div>
      </div>
    </Section>
  );
}
