import Image from 'next/image';
import { copy } from '@/content/copy';
import { BridgeIcon, CompassIcon, RouteIcon } from './icons';
import { Accent, Container, DarkTexture } from './ui';

const stepIcons = [CompassIcon, RouteIcon, BridgeIcon];

export default function Hero() {
  const { before, accent, after, subtitle, steps } = copy.hero;

  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-black pb-[72px] pt-[30px] text-paper md:pb-28 md:pt-16">
      <DarkTexture />
      {/* Barras ciano da marca nos cantos, no lugar dos grafismos da referência */}
      <span aria-hidden="true" className="absolute -left-6 top-10 -z-10 h-[18px] w-24 -rotate-[24deg] rounded-sm bg-cyan md:left-8 md:top-24 md:h-6 md:w-40" />
      <span aria-hidden="true" className="absolute -right-8 bottom-8 -z-10 h-[18px] w-28 -rotate-[24deg] rounded-sm bg-cyan md:right-10 md:h-6 md:w-44" />
      <span aria-hidden="true" className="absolute -right-3 bottom-16 -z-10 h-2 w-14 -rotate-[24deg] rounded-sm bg-cyan/60 md:right-16 md:bottom-20 md:w-20" />

      <Container className="text-center">
        <div data-reveal>
          <h1 className="display mx-auto max-w-[760px] text-[27px] leading-[1.02] min-[400px]:text-[29px] md:text-[52px]">
            <span className="block">{before}</span>
            <span className="my-1 block text-[1.18em] md:my-1.5">
              <Accent>{accent}</Accent>
            </span>
            <span className="block">{after}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-[17px] leading-[1.35] text-paper/85 md:mt-6 md:text-[20px]">{subtitle}</p>
        </div>

        <div data-reveal className="relative mx-auto mt-6 aspect-[16/10] max-w-[860px] overflow-hidden rounded-2xl border border-paper/15 shadow-[0_20px_60px_rgb(0_0_0/0.5)] md:mt-10 md:aspect-[21/9]">
          <Image
            src="/images/hero.webp"
            alt="Escadaria de pedra clara entre colunas, com vista para um lago e montanhas"
            fill
            priority
            sizes="(min-width: 900px) 860px, 100vw"
            className="object-cover object-[50%_62%]"
          />
        </div>

        <ul data-reveal className="mx-auto mt-6 grid max-w-[620px] grid-cols-3 gap-2 md:mt-10 md:gap-8">
          {steps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <li key={step.title} className="flex flex-col items-center gap-1.5 text-center md:flex-row md:justify-center md:gap-3 md:text-left">
                <Icon className="size-[26px] shrink-0 text-cyan md:size-8" />
                <span className="leading-[1.1]">
                  <span className="block font-display text-[13px] font-extrabold uppercase tracking-[-0.01em] md:text-[17px]">{step.title}</span>
                  <span className="block text-[12px] text-paper/70 md:text-[14px]">{step.label}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
