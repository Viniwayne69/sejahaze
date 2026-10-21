import Image from 'next/image';
import { copy } from '@/content/copy';
import { Accent, Container, cn, textureProps } from './ui';

export default function Hero() {
  const { before, accent, after, subtitle, steps } = copy.hero;
  const bg = textureProps('nevoa');

  return (
    <section id="inicio" className={cn('relative isolate overflow-hidden pb-8 pt-[30px] md:pb-24 md:pt-16', bg.className)} style={bg.style}>
      <Container className="text-center">
        <div data-reveal>
          <h1 className="display mx-auto max-w-[760px] text-[27px] min-[400px]:text-[29px] md:text-[52px]">
            {before} <Accent>{accent}</Accent> {after}
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-[17px] leading-[1.35] md:mt-6 md:text-[20px]">{subtitle}</p>
        </div>

        {/* Mockup inteiro, na proporção original, sem recorte */}
        <div data-reveal className="mx-auto mt-6 max-w-[860px] md:mt-10">
          <Image
            src="/images/letreiro.webp"
            alt="Letreiro da HAZE em letras pretas com a barra ciano, iluminado numa parede clara"
            width={1600}
            height={926}
            priority
            sizes="(min-width: 900px) 860px, 100vw"
            className="h-auto w-full rounded-[24px] object-contain"
          />
        </div>

        <ul data-reveal className="mx-auto mt-6 grid max-w-[620px] grid-cols-3 gap-2 md:mt-10 md:gap-8">
          {steps.map((step) => (
            <li key={step.title} className="flex flex-col items-center gap-1 text-center md:flex-row md:justify-center md:gap-3 md:text-left">
              <span className="font-display text-[22px] font-black leading-none text-cyan md:text-[30px]">
                {step.number}
              </span>
              <span className="leading-[1.15]">
                <span className="block font-display text-[13px] font-black uppercase md:text-[17px]">{step.title}</span>
                <span className="block text-[12px] text-gray md:text-[14px]">{step.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
