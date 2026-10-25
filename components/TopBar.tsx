import { APPLY_URL } from '@/config';
import { copy } from '@/content/copy';
import Logo from './Logo';
import { Bar, Container } from './ui';

/**
 * Celular: barra fina com o status. Computador: barra alta e fixa, com o logo, o menu das seções
 * e o botão do diagnóstico.
 */
export default function TopBar() {
  return (
    <div className="border-b border-line bg-graphite text-paper lg:sticky lg:top-0 lg:z-50 lg:bg-black">
      <Container className="flex h-[53px] items-center justify-between lg:h-[80px] lg:max-w-[1280px] min-[1700px]:max-w-[1280px]">
        <Logo tone="light" size="sm" className="lg:h-[34px]" />
        <p className="flex items-center gap-2.5 text-[13px] font-semibold lg:hidden">
          <Bar className="ao-vivo h-[3px] w-3.5" />
          {copy.topBar.status}
        </p>
        <nav aria-label="Seções do site" className="hidden items-center gap-12 lg:flex">
          {copy.topBar.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12px] font-semibold uppercase tracking-[0.18em] text-paper/90 transition hover:text-cyan"
            >
              {link.rotulo}
            </a>
          ))}
        </nav>
        <a
          href={APPLY_URL}
          className="hidden rounded-full bg-cyan px-6 py-3 text-[14px] font-semibold leading-none text-black transition hover:brightness-[.93] lg:inline-flex"
        >
          {copy.topBar.status}
        </a>
      </Container>
    </div>
  );
}
