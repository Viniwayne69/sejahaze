import { copy } from '@/content/copy';
import AntesDepois from './AntesDepois';
import { Heading, Section } from './ui';

/**
 * Celular: a chamada em cima, o antes e depois (a mesma fachada apagada e depois desejada, que o visitante arrasta)
 * e a frase que fecha a ideia embaixo. Desktop: o texto à esquerda e a foto grande à direita.
 */
export default function Promessa() {
  const { chamada, before, accent, after, antes, depois, antesFrase, depoisFrase } = copy.promessa;

  return (
    <Section texture="papel-azul" fade="black" labelledBy="promessa-chamada">
      <div className="md:grid md:grid-cols-[1fr_minmax(0,440px)] md:gap-x-16 md:[grid-template-areas:'chamada_foto'_'frase_foto']">
        <div data-reveal className="text-center md:self-end md:text-left md:[grid-area:chamada]">
          <h2
            id="promessa-chamada"
            className="display whitespace-nowrap text-[clamp(16px,5.6vw,30px)] md:whitespace-normal md:text-[64px]"
          >
            {chamada}
          </h2>
        </div>

        <div data-reveal className="mt-4 md:mt-0 md:[grid-area:foto]">
          <AntesDepois antes={antes} depois={depois} antesFrase={antesFrase} depoisFrase={depoisFrase} />
        </div>

        <div data-reveal className="mt-5 md:mt-8 md:self-start md:[grid-area:frase]">
          <Heading id="promessa-titulo" as="h3" before={before} accent={accent} after={after} className="[text-wrap:wrap] md:text-[34px]" />
        </div>
      </div>
    </Section>
  );
}
