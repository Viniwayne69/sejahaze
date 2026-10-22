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
      <div className="lg:grid lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-x-16 lg:[grid-template-areas:'chamada_foto'_'frase_foto']">
        <div data-reveal className="text-center lg:self-end lg:text-left lg:[grid-area:chamada]">
          <h2
            id="promessa-chamada"
            className="display whitespace-nowrap text-[clamp(16px,5.6vw,40px)] md:text-[40px] lg:whitespace-normal lg:text-[64px]"
          >
            {chamada}
          </h2>
        </div>

        <div data-reveal className="mt-4 lg:mt-0 lg:[grid-area:foto]">
          <AntesDepois antes={antes} depois={depois} antesFrase={antesFrase} depoisFrase={depoisFrase} />
        </div>

        <div data-reveal className="mt-5 lg:mt-8 lg:self-start lg:[grid-area:frase]">
          <Heading id="promessa-titulo" as="h3" before={before} accent={accent} after={after} className="[text-wrap:wrap] lg:text-[34px]" />
        </div>
      </div>
    </Section>
  );
}
