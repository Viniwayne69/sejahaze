import { copy } from '@/content/copy';
import { ApplyNote, Button, Heading, Section } from './ui';

/** Única seção ciano da página: texto preto, barra preta e botão preto. */
export default function Aplicacao() {
  const { before, accent, body, cta } = copy.aplicacao;

  return (
    <Section id="aplicar" texture="ciano" labelledBy="aplicar-titulo">
      <div data-reveal className="mx-auto max-w-[680px] text-center">
        <Heading id="aplicar-titulo" before={before} accent={accent} bar="black" />
        <p className="mt-3 text-[15.5px] font-medium leading-[1.45] md:mt-5 md:text-[18px]">{body}</p>
        <div className="mt-5 md:mt-8">
          <Button variant="dark">{cta}</Button>
          <ApplyNote />
        </div>
      </div>
    </Section>
  );
}
