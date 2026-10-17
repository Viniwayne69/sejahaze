import { copy } from '@/content/copy';
import { Accent, Backdrop, CheckList, Container, Eyebrow } from './ui';

export default function ParaQuem() {
  const { label, before, accent, sim, nao } = copy.paraQuem;

  return (
    <section id="para-quem" aria-labelledby="para-quem-titulo" className="relative isolate overflow-hidden bg-paper py-16 sm:py-20 lg:py-24">
      <Backdrop name="para-quem" imgClassName="object-[40%_center] md:object-[center_58%]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-paper/85 via-paper/50 to-paper/30" />

      <Container>
        <div data-reveal className="max-w-[1080px]">
          <Eyebrow>{label}</Eyebrow>
          <h2 id="para-quem-titulo" className="display mt-5 text-[clamp(2rem,0.8rem+3.2vw,3.6rem)] leading-[0.98]">
            {before} <Accent>{accent}</Accent>
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
          <article
            data-reveal
            className="rounded-[24px] border border-white/70 bg-paper/95 px-7 py-8 transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:px-10 sm:py-10"
          >
            <h3 className="font-display text-[23px] font-extrabold tracking-[-0.02em] sm:text-[26px]">{sim.title}</h3>
            <CheckList items={sim.items} className="mt-6" />
          </article>

          <article
            data-reveal
            style={{ transitionDelay: '120ms' }}
            className="rounded-[24px] border border-line bg-black px-7 py-8 text-paper transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:px-10 sm:py-10"
          >
            <h3 className="font-display text-[23px] font-extrabold tracking-[-0.02em] sm:text-[26px]">{nao.title}</h3>
            <CheckList items={nao.items} negative className="mt-6 text-paper/90" />
          </article>
        </div>
      </Container>
    </section>
  );
}
