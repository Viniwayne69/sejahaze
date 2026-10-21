import Image from 'next/image';
import { cn } from './ui';

/**
 * Logo HAZE a partir dos arquivos oficiais (Identidade-HAZE/logos), nunca recriada em texto.
 * `tone="light"`: logo-principal (off-white + barra ciano) para fundos escuros.
 * `tone="dark"`: logo-claro (preta + barra ciano) para fundos claros.
 */
const sizes = {
  sm: 'h-[26px] w-auto',
  md: 'h-[34px] w-auto md:h-[40px]',
};

export default function Logo({
  tone = 'light',
  size = 'md',
  className,
}: {
  tone?: 'dark' | 'light';
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <Image
      src={tone === 'light' ? '/logos/logo-principal.png' : '/logos/logo-claro.png'}
      alt="HAZE"
      width={1338}
      height={406}
      className={cn(sizes[size], className)}
    />
  );
}
