import { copy } from '@/content/copy';
import HeroFoto from './HeroFoto';
import { Accent, ApplyNote, Button, Container, cn, textureProps } from './ui';

/**
 * Celular: a foto (9:16) ocupa a tela inteira, o título fica no céu limpo em cima (preto sobre o azul)
 * e o subtítulo e o botão ficam embaixo, sobre um degradê preto.
 * Desktop: texto à esquerda e a foto como cartão vertical à direita.
 */
export default function Hero() {
  const { before, accent, after, subtitle } = copy.hero;
  const bg = textureProps('nevoa');

  return (
    <section id="inicio" className={cn('relative isolate overflow-hidden', bg.className)} style={bg.style}>
      <Container className="flex min-h-[max(560px,calc(100svh-53px))] flex-col lg:grid lg:min-h-0 lg:grid-cols-[1fr_minmax(0,400px)] lg:items-center lg:gap-14 lg:py-20">
        {/* Foto: fundo de tela cheia no celular, cartão vertical no desktop */}
        <div className="absolute inset-0 -z-10 lg:relative lg:inset-auto lg:z-0 lg:order-2 lg:aspect-[9/16] lg:max-h-[76vh] lg:w-full lg:justify-self-end lg:overflow-hidden lg:rounded-[24px]">
          <HeroFoto
            src="/images/capa.webp"
            alt="Dona de uma marca olhando por cima do ombro, diante da loja com letreiro ciano e uma fila de clientes com sacolas pretas esperando para entrar"
          />
          {/* Névoa da marca: começa densa, dissipa ao abrir a página e depois flutua devagar */}
          <div aria-hidden="true" className="hero-nevoa pointer-events-none absolute inset-0" />
          {/* Degradê para o subtítulo e o botão lerem bem sobre a foto (só no celular) */}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black via-black/75 to-transparent lg:hidden" />
        </div>

        <div data-reveal className="flex flex-1 flex-col pb-8 pt-7 lg:order-1 lg:flex-none lg:py-0">
          <h1 className="display text-[30px] text-black [--accent-bar:#000] min-[400px]:text-[33px] md:text-[46px] lg:text-[56px] lg:text-paper lg:[--accent-bar:theme(colors.cyan)]">
            {before} <Accent>{accent}</Accent> {after}
          </h1>

          <div className="mt-auto lg:mt-7">
            <p className="max-w-[420px] text-[19px] font-semibold leading-snug text-paper md:text-[22px] lg:text-[21px]">{subtitle}</p>
            <div className="mt-5 lg:mt-8 lg:max-w-[340px]">
              <Button>{copy.apply}</Button>
              <ApplyNote className="text-paper/90" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
