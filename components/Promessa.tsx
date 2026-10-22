import { copy } from '@/content/copy';
import AntesDepois from './AntesDepois';
import { Heading, Section } from './ui';

/** Antes e depois no lugar do parágrafo: a mesma fachada apagada e depois desejada, que o visitante arrasta. */
export default function Promessa() {
  const { before, accent, antes, depois } = copy.promessa;

  return (
    <Section texture="papel-azul" labelledBy="promessa-titulo">
      <div data-reveal className="md:mx-auto md:max-w-[820px] md:text-center">
        <Heading id="promessa-titulo" before={before} accent={accent} size="lg" />
      </div>

      <div data-reveal className="mt-5 md:mt-10">
        <AntesDepois antes={antes} depois={depois} />
      </div>
    </Section>
  );
}
