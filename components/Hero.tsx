import Image from 'next/image';
import { copy } from '@/content/copy';
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
      <Container className="flex min-h-[max(560px,calc(100svh-53px))] flex-col md:grid md:min-h-0 md:grid-cols-[1fr_minmax(0,400px)] md:items-center md:gap-14 md:py-20">
        {/* Foto: fundo de tela cheia no celular, cartão vertical no desktop */}
        <div className="absolute inset-0 -z-10 md:relative md:inset-auto md:z-0 md:order-2 md:aspect-[9/16] md:max-h-[76vh] md:w-full md:justify-self-end md:overflow-hidden md:rounded-[24px]">
          <Image
            src="/images/capa.webp"
            alt="Dona de uma marca olhando por cima do ombro, diante da loja com letreiro ciano e uma fila de clientes com sacolas pretas esperando para entrar"
            fill
            priority
            sizes="(min-width: 768px) 400px, 100vw"
            className="object-cover object-[50%_42%]"
          />
          {/* Névoa da marca: começa densa, dissipa ao abrir a página e depois flutua devagar */}
          <div aria-hidden="true" className="hero-nevoa pointer-events-none absolute inset-0" />
          {/* Luz do letreiro ciano pulsando de leve */}
          <div aria-hidden="true" className="letreiro-pulso pointer-events-none absolute -right-[10%] top-[15%] h-[20%] w-[50%] rounded-full bg-cyan mix-blend-screen blur-2xl" />
          {/* Degradê para o subtítulo e o botão lerem bem sobre a foto (só no celular) */}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black via-black/75 to-transparent md:hidden" />
        </div>

        <div data-reveal className="flex flex-1 flex-col pb-8 pt-7 md:order-1 md:flex-none md:py-0">
          <h1 className="display text-[30px] text-black [--accent-bar:#000] min-[400px]:text-[33px] md:text-[56px] md:text-paper md:[--accent-bar:theme(colors.cyan)]">
            {before} <Accent>{accent}</Accent> {after}
          </h1>

          <div className="mt-auto md:mt-7">
            <p className="max-w-[420px] text-[19px] font-semibold leading-snug text-paper md:text-[21px]">{subtitle}</p>
            <div className="mt-5 md:mt-8 md:max-w-[340px]">
              <Button>{copy.apply}</Button>
              <ApplyNote className="text-paper/90" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
