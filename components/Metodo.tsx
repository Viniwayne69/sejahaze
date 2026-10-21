import Image from 'next/image';
import { copy } from '@/content/copy';
import { Heading, Section } from './ui';

/** Uma foto por etapa, na mesma ordem de copy.metodo.steps (Dissipar, Acender, Brilhar). */
const fotos = [
  {
    src: '/images/dissipar.webp',
    alt: 'Mão apontando com uma caneta o ponto de queda de um gráfico de vendas, marcado com um círculo ciano',
    posicao: 'object-[50%_45%]',
  },
  {
    src: '/images/acender.webp',
    alt: 'Mesa com a identidade de uma marca: sacola preta, cartões, caderno com faixa ciano e paleta de cores',
    posicao: 'object-[50%_55%]',
  },
  {
    src: '/images/brilhar.webp',
    alt: 'Equipe comemorando uma venda em volta de um notebook, em um escritório claro',
    posicao: 'object-[50%_30%]',
  },
] as const;

/** Cartões que deslizam de lado no celular, cada um com foto, número, nome e uma linha. Grade de 3 no desktop. */
export default function Metodo() {
  const { before, accent, steps, result } = copy.metodo;
  const [resultLabel, ...resultText] = result.split(':');

  return (
    <Section id="metodo" texture="topografica-v3" labelledBy="metodo-titulo">
      <div data-reveal>
        <Heading id="metodo-titulo" before={before} accent={accent} />
      </div>

      <ol
        data-reveal
        aria-label="Etapas do método"
        className="-mx-[22px] mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-[22px] px-[22px] pb-2 [scrollbar-width:none] md:mx-0 md:mt-10 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {steps.map((step, i) => (
          <li key={step.title} className="w-[80%] shrink-0 snap-start sm:w-[320px] md:w-auto">
            <article className="flex h-full flex-col overflow-hidden rounded-[24px] border-2 border-black bg-paper">
              <div className="relative aspect-[5/4] w-full bg-black">
                <Image
                  src={fotos[i].src}
                  alt={fotos[i].alt}
                  fill
                  sizes="(min-width: 768px) 340px, 80vw"
                  className={`object-cover ${fotos[i].posicao}`}
                />
                <span className="absolute left-3 top-3 grid size-10 place-items-center rounded-[12px] border-2 border-black bg-cyan font-display text-[15px] font-black text-black">
                  {step.number}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-1.5 px-4 pb-4 pt-3.5 md:px-5 md:pb-5">
                <h3 className="font-display text-[22px] font-black uppercase leading-none md:text-[26px]">{step.title}</h3>
                <p className="text-[14.5px] leading-snug md:text-[15px]">{step.body}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>

      <p data-reveal className="mt-3 rounded-[24px] border-2 border-black bg-paper px-4 py-3 text-center text-[14px] leading-snug md:mx-auto md:mt-8 md:max-w-[720px] md:rounded-full md:text-[16px]">
        <strong>{resultLabel}:</strong>
        {resultText.join(':')}
      </p>
    </Section>
  );
}
