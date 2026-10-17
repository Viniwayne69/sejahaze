import { copy } from '@/content/copy';
import Logo from './Logo';
import { Button, Container } from './ui';

export default function Footer() {
  const { tagline, nav, copyright } = copy.footer;

  return (
    <footer className="relative isolate overflow-hidden bg-black pb-7 pt-10 text-paper sm:pt-12">
      {/* HAZE gigante cortado como textura */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.3em] right-[-0.05em] -z-10 select-none font-display text-[clamp(150px,21vw,300px)] font-black leading-none tracking-[-0.08em] text-graphite"
        style={{ fontVariationSettings: "'wdth' 125" }}
      >
        HAZE
      </span>

      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-6">
            <a href="#inicio" aria-label={`${copy.brand}, voltar ao início`}>
              <Logo tone="light" />
            </a>
            <p className="max-w-[190px] text-[13px] leading-snug text-paper/85">{tagline}</p>
          </div>

          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[14px]">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-cyan">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <Button size="sm" className="self-start lg:self-auto lg:min-w-[190px]" />
        </div>

        <p className="mt-10 text-[12px] text-gray">{copyright}</p>
      </Container>
    </footer>
  );
}
