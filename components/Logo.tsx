import { cn } from './ui';

/**
 * Wordmark HAZE: Archivo 900 expandida, letras levemente sobrepostas
 * e barra ciano grossa sob o H.
 * `tone="dark"` para fundos claros, `tone="light"` (off-white) para fundos escuros.
 */
const sizes = {
  sm: 'text-[24px] sm:text-[26px]',
  md: 'text-[34px] sm:text-[42px]',
};

export default function Logo({
  tone = 'dark',
  size = 'md',
  className,
}: {
  tone?: 'dark' | 'light';
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'relative inline-block select-none pb-[0.1em] font-display font-black leading-[0.8] tracking-[-0.085em]',
        sizes[size],
        tone === 'dark' ? 'text-black' : 'text-paper',
        className,
      )}
      style={{ fontVariationSettings: "'wdth' 125" }}
    >
      HAZE
      <span aria-hidden="true" className="absolute bottom-[-0.09em] left-0 h-[0.13em] w-[0.72em] bg-cyan" />
    </span>
  );
}
