import { Fragment } from 'react';
import { copy } from '@/content/copy';
import HeroFoto from './HeroFoto';
import HeroPC from './HeroPC';
import { Accent, ApplyNote, Button, Container, cn, textureProps } from './ui';

/**
 * Celular: a foto (9:16) ocupa a tela inteira, o título fica no céu limpo em cima (preto sobre o azul)
 * e o subtítulo e o botão ficam embaixo, sobre um degradê preto.
 * Computador: texto à esquerda e, à direita, a foto sangrando até a borda da tela, com a mulher saindo da moldura.
 */
/** Cada palavra do título entra com um estalo elétrico, uma depois da outra (só no computador). */
const palavras = (texto: string, inicio: number) =>
  texto.split(' ').map((palavra, i) => (
    <Fragment key={`${inicio}-${i}`}>
      <span className="hero-pal lg:inline-block" style={{ '--i': inicio + i } as React.CSSProperties}>
        {palavra}
      </span>{' '}
    </Fragment>
  ));

export default function Hero() {
  const { before, accent, after, subtitle } = copy.hero;
  const nAntes = before.split(' ').length;
  const bg = textureProps('nevoa');

  return (
    <section
      id="inicio"
      className={cn('relative isolate overflow-hidden lg:h-[clamp(max(40vw,620px),min(51.2vw,calc(100svh_-_80px)),1400px)]', bg.className)}
      style={bg.style}
    >
      <Container className="flex min-h-[max(560px,calc(100svh-53px))] flex-col lg:h-full lg:min-h-0 lg:max-w-[1280px] lg:flex-row lg:items-center min-[1700px]:max-w-[1280px]">
        {/* Foto: fundo de tela cheia no celular (no computador entra a foto com recorte, mais abaixo) */}
        <div className="absolute inset-0 -z-10 lg:hidden">
          <HeroFoto
            src="/images/capa.webp"
            alt="Dona de uma marca olhando por cima do ombro, diante da loja com letreiro ciano e uma fila de clientes com sacolas pretas esperando para entrar"
          />
          {/* Névoa da marca: começa densa, dissipa ao abrir a página e depois flutua devagar */}
          <div aria-hidden="true" className="hero-nevoa pointer-events-none absolute inset-0" />
          {/* Degradê para o subtítulo e o botão lerem bem sobre a foto (só no celular) */}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black via-black/75 to-transparent lg:hidden" />
        </div>

        <div data-reveal className="flex flex-1 flex-col pb-8 pt-7 lg:z-10 lg:w-[52%] lg:flex-none lg:py-0">
          <h1 className="display text-[30px] text-black [--accent-bar:theme(colors.cyan)] min-[400px]:text-[33px] md:text-[46px] lg:max-w-[8.4em] lg:text-[clamp(52px,5.5vw,80px)] lg:leading-[0.98] lg:tracking-[-0.01em] lg:text-paper lg:[font-variation-settings:'wdth'_62] lg:[word-spacing:0.14em]">
            {palavras(before, 0)}
            <span className="hero-pal lg:block lg:w-fit" style={{ '--i': nAntes } as React.CSSProperties}>
              <Accent>{accent}</Accent>
            </span>
            {after ? <> <span className="lg:block">{palavras(after, nAntes + 1)}</span></> : null}
          </h1>

          <div className="mt-auto lg:mt-7">
            <p style={{ '--d': '1400ms' } as React.CSSProperties} className="hero-in max-w-[420px] text-[19px] font-semibold leading-snug text-paper md:text-[22px] lg:max-w-[min(480px,38vw)] lg:text-[22px] lg:font-normal lg:text-paper/80">{subtitle}</p>
            <div style={{ '--d': '1650ms' } as React.CSSProperties} className="hero-in mt-5 lg:mt-9 lg:w-[min(400px,38vw)]">
              <Button className="lg:min-h-[64px] lg:w-full lg:min-w-0 lg:text-[20px] lg:font-bold">{copy.apply}</Button>
              <ApplyNote className="text-paper/90 lg:mt-3 lg:text-[13px]">{copy.hero.nota}</ApplyNote>
            </div>
          </div>
        </div>
      </Container>

      {/* Computador: foto na moldura com a mulher saindo dela */}
      <HeroPC alt="Dona de uma marca olhando por cima do ombro, diante da loja HAZE ao pôr do sol, com uma fila de clientes com sacolas pretas esperando para entrar" />
    </section>
  );
}
