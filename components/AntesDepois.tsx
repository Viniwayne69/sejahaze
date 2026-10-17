import { copy } from '@/content/copy';
import { Accent, Backdrop, CheckList, Container, Eyebrow } from './ui';

export default function AntesDepois() {
  const { label, before, accent, antes, depois } = copy.antesDepois;

  return (
    <section id="antes-e-depois" aria-labelledby="antes-depois-titulo" className="relative isolate overflow-hidden bg-paper py-16 sm:py-20 lg:py-24">
      <Backdrop name="antes-depois" imgClassName="object-[30%_center] md:object-center" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-paper/80 via-paper/40 to-paper/70" />

      <Container>
        <div data-reveal className="text-center">
          <Eyebrow>{label}</Eyebrow>
          <h2 id="antes-depois-titulo" className="display mt-5 text-[clamp(2.4rem,0.9rem+4.4vw,5rem)] leading-[0.95]">
            {before}{' '}
            <Accent sans>{accent}</Accent>
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1000px] items-center gap-4 md:mt-14 md:grid-cols-[1fr_72px_1.12fr] md:gap-0">
          <article
            data-reveal
            className="rounded-[22px] border border-white/60 bg-gray/[0.14] px-7 py-8 backdrop-blur-md transition duration-300 hover:-translate-y-1 sm:px-9"
          >
            <h3 className="font-display text-[24px] font-extrabold tracking-[-0.02em] text-black/80 sm:text-[26px]">{antes.title}</h3>
            <CheckList items={antes.items} negative className="mt-6 text-black/75" />
          </article>

          {/* Seta fina ligando os painéis (vertical no mobile) */}
          <div aria-hidden="true" className="flex justify-center py-1 md:py-0">
            <svg viewBox="0 0 64 16" className="h-4 w-14 rotate-90 text-black md:rotate-0" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 8h58M53 2l7 6-7 6" />
            </svg>
          </div>

          <article
            data-reveal
            style={{ transitionDelay: '120ms' }}
            className="rounded-[24px] border-2 border-cyan bg-paper px-7 py-10 shadow-glow transition duration-300 hover:-translate-y-1 sm:px-10 sm:py-12"
          >
            <h3 className="font-display text-[24px] font-extrabold tracking-[-0.02em] sm:text-[28px]">{depois.title}</h3>
            <CheckList items={depois.items} className="mt-6" />
          </article>
        </div>
      </Container>
    </section>
  );
}
