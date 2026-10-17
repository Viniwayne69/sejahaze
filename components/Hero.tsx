import { copy } from '@/content/copy';
import { Accent, Backdrop, Button } from './ui';

export default function Hero() {
  const { before, accent, after, subtitle } = copy.hero;

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[600px] items-center justify-center overflow-hidden px-5 pb-14 pt-28 text-center sm:min-h-[640px] lg:h-[41vw] lg:max-h-[760px] lg:min-h-[590px] lg:pb-10 lg:pt-24"
    >
      <Backdrop name="hero" priority imgClassName="object-[50%_60%]" />
      {/* Clareia o centro para o título preto ler bem sobre a foto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_48%_58%_at_50%_46%,rgb(255_255_255/0.62),rgb(255_255_255/0.18)_60%,transparent_80%)]"
      />

      <div data-reveal className="mx-auto max-w-[720px]">
        <h1 className="display text-[clamp(1.85rem,0.6rem+3.1vw,3rem)] leading-[0.94]">
          <span className="block">{before}</span>
          <span className="my-[0.04em] block text-[1.12em]">
            <Accent>{accent}</Accent>
          </span>
          <span className="block">{after}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-[500px] text-[16px] leading-snug sm:text-[18px]">{subtitle}</p>

        <div className="mt-6 flex flex-col items-center">
          <Button />
          <p className="mt-2.5 text-[11px] font-medium">{copy.applyNote}</p>
        </div>
      </div>
    </section>
  );
}
