import Image from 'next/image';

/** As duas imagens têm o mesmo tamanho (1536x1024) e o mesmo enquadramento, então o palco é o mesmo para as duas. */
const palco = 'absolute left-0 top-0 aspect-[3/2] h-full -translate-x-[16.28%]';

/**
 * Foto do hero no computador: a cena fica dentro da moldura com a quina de cima arredondada à esquerda,
 * e o recorte da mulher (fundo transparente) passa por cima, saindo da moldura para a esquerda.
 * A moldura mostra só da posição 250 à 1250 da imagem; o resto fica cortado.
 */
export default function HeroPC({ alt }: { alt: string }) {
  return (
    <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
      <div className="absolute inset-0 overflow-hidden rounded-tl-[48px]">
        <div className={palco}>
          <Image src="/images/hero-pc.webp" alt={alt} fill priority sizes="80vw" className="object-cover" />
        </div>
      </div>
      <div aria-hidden="true" className={palco}>
        <Image src="/images/hero-pc-recorte.webp" alt="" fill priority sizes="80vw" className="object-cover" />
      </div>
    </div>
  );
}
