import { copy } from '@/content/copy';
import Logo from './Logo';
import { ApplyNote, Button, Container, Emenda, Heading, cn, textureProps } from './ui';

/** Fechamento: último aviso + rodapé no mesmo bloco, só com a textura fosca-azul. */
export default function UltimoAviso() {
  const { before, accent, body, cta } = copy.ultimoAviso;
  const { tagline, copyright } = copy.footer;
  const bg = textureProps('fosca-azul');

  return (
    <footer className={cn('site-pc relative isolate overflow-hidden pb-[96px] md:pb-10', bg.className)} style={bg.style}>
      <Emenda fade="paper" />
      <section aria-labelledby="ultimo-aviso-titulo" className="pt-7 md:pt-20 lg:pt-28">
        <Container className="text-center lg:max-w-[1280px] min-[1700px]:max-w-[1280px]">
          <div data-reveal className="mx-auto max-w-[680px]">
            <Heading id="ultimo-aviso-titulo" before={before} accent={accent} size="lg" className="lg:text-[clamp(64px,7vw,104px)]" />
            <p className="mt-4 text-[16px] leading-[1.45] md:mt-6 md:text-[19px]">{body}</p>
            <div className="mt-5 md:mt-8">
              <Button>{cta}</Button>
              <ApplyNote className="text-gray" />
            </div>
          </div>
        </Container>
      </section>

      <Container className="mt-8 flex flex-col items-center gap-2 border-t border-line pt-6 text-center md:mt-20 md:flex-row md:justify-between md:text-left lg:max-w-[1280px] min-[1700px]:max-w-[1280px]">
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-5">
          <Logo tone="light" />
          <p className="text-[13px]">{tagline}</p>
        </div>
        <nav aria-label="Seções do site" className="hidden items-center gap-10 lg:flex">
          {copy.topBar.links.map((link) => (
            <a key={link.href} href={link.href} className="text-[12px] font-semibold uppercase tracking-[0.18em] text-paper/80 transition hover:text-cyan">
              {link.rotulo}
            </a>
          ))}
        </nav>
        <p className="text-[12px] text-gray">{copyright}</p>
      </Container>
    </footer>
  );
}
