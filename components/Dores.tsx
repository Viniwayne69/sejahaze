import Image from 'next/image';
import { copy } from '@/content/copy';
import Carrossel from './Carrossel';
import { Button, Heading, Section } from './ui';

/** Uma foto por dor, na mesma ordem de copy.dores.items. */
const fotos = [
  { src: '/images/dor-1.webp', alt: 'Homem pensativo diante de um notebook cujo gráfico de vendas sobe e trava em uma linha reta', posicao: 'object-[50%_55%]' },
  { src: '/images/dor-2.webp', alt: 'Vitrine com etiqueta de preço riscada ao lado de uma loja de fachada ciano cheia de gente', posicao: 'object-[50%_75%]' },
  { src: '/images/dor-3.webp', alt: 'Pessoa comparando preços de tênis no celular enquanto um cliente sai da loja sem comprar', posicao: 'object-[50%_65%]' },
] as const;

/** Cartões inteiros que deslizam no celular (com bolinhas), grade de 3 no desktop. */
export default function Dores() {
  const { title, items, closing, cta } = copy.dores;

  return (
    <Section texture="fosca" labelledBy="dores-titulo">
      {/* Luz ciano saindo das laterais e do fundo: dá vida ao escuro sem tirar a tensão */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-16 top-[22%] h-56 w-32 rounded-full bg-cyan/40 blur-3xl md:-left-24 md:h-[420px] md:w-64" />
        <div className="absolute -right-16 top-[40%] h-56 w-32 rounded-full bg-cyan/40 blur-3xl md:-right-24 md:top-[30%] md:h-[420px] md:w-64" />
        <div className="absolute -bottom-20 left-1/2 h-40 w-[70%] -translate-x-1/2 rounded-full bg-cyan/25 blur-3xl md:h-56 md:w-[480px]" />
      </div>

      <div data-reveal className="md:mx-auto md:max-w-[760px] md:text-center">
        <Heading id="dores-titulo" before={title} />
      </div>

      <Carrossel
        label="Sinais de que a marca precisa mudar"
        items={items.map((item, i) => (
          <figure key={item} className="relative aspect-square overflow-hidden rounded-[24px] border border-cyan/40 bg-black shadow-[0_0_26px_rgba(1,187,251,.16)] md:aspect-[4/5]">
            <Image
              src={fotos[i].src}
              alt={fotos[i].alt}
              fill
              sizes="(min-width: 768px) 340px, 100vw"
              className={`object-cover ${fotos[i].posicao}`}
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-4 pr-14 text-[20px] font-semibold leading-snug md:px-6 md:pb-6 md:pr-6 md:text-[22px]">
              {item}
            </figcaption>
          </figure>
        ))}
      />

      <div data-reveal className="md:mx-auto md:max-w-[760px]">
        <p className="mt-5 text-center text-[19px] font-semibold leading-snug text-cyan md:mt-10 md:text-[24px]">{closing}</p>
        <div className="mt-4 text-center md:mt-8">
          <Button>{cta}</Button>
        </div>
      </div>
    </Section>
  );
}
