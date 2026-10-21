import Image from 'next/image';
import { copy } from '@/content/copy';
import { MegaphoneIcon } from './icons';
import Logo from './Logo';
import { Accent, ApplyNote, Button, Container, DarkTexture } from './ui';

/** Fechamento: último aviso + rodapé no mesmo bloco escuro, como na referência. */
export default function UltimoAviso() {
  const { before, accent, body, cta } = copy.ultimoAviso;
  const { tagline, copyright } = copy.footer;

  return (
    <footer className="relative isolate overflow-hidden bg-black pb-[96px] text-paper md:pb-10">
      <DarkTexture />
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image src="/images/proximo-passo.webp" alt="" fill sizes="100vw" className="object-cover opacity-[0.12]" />
      </div>

      <section aria-labelledby="ultimo-aviso-titulo" className="pt-7 md:pt-20">
        <Container className="text-center">
          <div data-reveal className="mx-auto max-w-[680px]">
            <h2 id="ultimo-aviso-titulo" className="display flex items-center justify-center gap-3 text-[30px] leading-none md:text-[48px]">
              <MegaphoneIcon className="size-8 shrink-0 text-cyan md:size-11" />
              <span>
                {before} <Accent>{accent}</Accent>
              </span>
            </h2>
            <p className="mt-4 text-[16px] leading-[1.45] text-paper/85 md:mt-6 md:text-[19px]">{body}</p>
            <div className="mt-5 md:mt-8">
              <Button>{cta}</Button>
              <ApplyNote />
            </div>
          </div>
        </Container>
      </section>

      <Container className="mt-10 flex flex-col items-center gap-3 border-t border-line pt-8 text-center md:mt-20 md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-5">
          <Logo tone="light" />
          <p className="text-[13px] text-paper/70">{tagline}</p>
        </div>
        <p className="text-[12px] text-gray">{copyright}</p>
      </Container>
    </footer>
  );
}
