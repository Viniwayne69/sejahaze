import { copy } from '@/content/copy';
import AntesDepois from './AntesDepois';
import { Heading, Section } from './ui';

/** Primeiro o antes e depois (a mesma fachada apagada e depois desejada, que o visitante arrasta), depois a frase que fecha a ideia. */
export default function Promessa() {
  const { before, accent, after, antes, depois, antesFrase, depoisFrase } = copy.promessa;

  return (
    <Section texture="papel-azul" fade="black" labelledBy="promessa-titulo">
      <div data-reveal>
        <AntesDepois antes={antes} depois={depois} antesFrase={antesFrase} depoisFrase={depoisFrase} />
      </div>

      <div data-reveal className="mt-5 md:mx-auto md:mt-10 md:max-w-[820px] md:text-center">
        <Heading id="promessa-titulo" before={before} accent={accent} after={after} className="[text-wrap:wrap]" />
      </div>
    </Section>
  );
}
