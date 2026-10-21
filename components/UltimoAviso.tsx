import { copy } from '@/content/copy';
import Logo from './Logo';
import { ApplyNote, Button, Container, Heading, cn, textureProps } from './ui';

/** Fechamento: último aviso + rodapé no mesmo bloco, só com a textura fosca-azul. */
export default function UltimoAviso() {
  const { before, accent, body, cta } = copy.ultimoAviso;
  const { tagline, copyright } = copy.footer;
  const bg = textureProps('fosca-azul');

  return (
    <footer className={cn('relative isolate overflow-hidden pb-[96px] md:pb-10', bg.className)} style={bg.style}>
      <section aria-labelledby="ultimo-aviso-titulo" className="pt-7 md:pt-20">
        <Container className="text-center">
          <div data-reveal className="mx-auto max-w-[680px]">
            <Heading id="ultimo-aviso-titulo" before={before} accent={accent} size="lg" />
            <p className="mt-4 text-[16px] leading-[1.45] md:mt-6 md:text-[19px]">{body}</p>
            <div className="mt-5 md:mt-8">
              <Button>{cta}</Button>
              <ApplyNote className="text-gray" />
            </div>
          </div>
        </Container>
      </section>

      <Container className="mt-10 flex flex-col items-center gap-3 border-t border-line pt-8 text-center md:mt-20 md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-5">
          <Logo tone="light" />
          <p className="text-[13px]">{tagline}</p>
        </div>
        <p className="text-[12px] text-gray">{copyright}</p>
      </Container>
    </footer>
  );
}
