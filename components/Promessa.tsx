import Image from 'next/image';
import { copy } from '@/content/copy';
import { Heading, Section, cn } from './ui';

function Foto({
  src,
  alt,
  rotulo,
  destaque = false,
  posicao,
}: {
  src: string;
  alt: string;
  rotulo: string;
  destaque?: boolean;
  posicao: string;
}) {
  return (
    <figure className="relative aspect-[4/5] overflow-hidden rounded-[24px] border-2 border-black bg-black">
      <Image src={src} alt={alt} fill sizes="(min-width: 768px) 300px, 45vw" className={cn('object-cover', posicao)} />
      <figcaption
        className={cn(
          'absolute bottom-3 left-3 rounded-full border-2 border-black px-3 py-1 font-display text-[12px] font-black uppercase leading-none md:text-[14px]',
          destaque ? 'bg-cyan text-black' : 'bg-paper text-black',
        )}
      >
        {rotulo}
      </figcaption>
    </figure>
  );
}

/** Antes e depois no lugar do parágrafo: a mesma fachada apagada e depois desejada. */
export default function Promessa() {
  const { before, accent, antes, depois } = copy.promessa;

  return (
    <Section texture="papel-azul" labelledBy="promessa-titulo">
      <div data-reveal className="md:mx-auto md:max-w-[820px] md:text-center">
        <Heading id="promessa-titulo" before={before} accent={accent} size="lg" />
      </div>

      <div data-reveal className="mx-auto mt-5 grid max-w-[640px] grid-cols-2 gap-3 md:mt-10 md:gap-6">
        <Foto
          src="/images/antes.webp"
          alt="A mesma loja sem movimento: céu nublado, vitrine vazia e a dona sozinha na porta, preocupada"
          rotulo={antes}
          posicao="object-[50%_62%]"
        />
        <Foto
          src="/images/hero.webp"
          alt="A mesma loja desejada: a dona confiante na porta e clientes saindo com sacolas pretas"
          rotulo={depois}
          destaque
          posicao="object-[50%_62%]"
        />
      </div>
    </Section>
  );
}
