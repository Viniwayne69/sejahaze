import { copy } from '@/content/copy';
import { Accent, Backdrop, Button, Container, Eyebrow } from './ui';

export default function ProximoPasso() {
  const { label, before, accent, body } = copy.proximoPasso;

  return (
    <section id="aplicar" aria-labelledby="aplicar-titulo" className="relative isolate overflow-hidden bg-cyan py-16 text-center sm:py-20 lg:py-24">
      <Backdrop name="proximo-passo" className="bg-cyan" imgClassName="opacity-25" />

      <Container>
        <div data-reveal className="mx-auto max-w-[980px]">
          <Eyebrow>{label}</Eyebrow>
          <h2 id="aplicar-titulo" className="display mt-5 text-[clamp(2.1rem,0.8rem+3.9vw,4.4rem)] leading-[0.96]">
            {before}
            <span className="mt-[0.06em] block">
              <Accent bar="black">{accent}</Accent>
            </span>
          </h2>
          <p className="mx-auto mt-7 max-w-[560px] text-[16px] leading-snug sm:text-[18px]">{body}</p>
          <div className="mt-7 flex flex-col items-center">
            <Button variant="dark" />
            <p className="mt-2.5 text-[11px] font-medium">{copy.applyNote}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
