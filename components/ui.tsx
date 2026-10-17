import Image from 'next/image';
import { APPLY_URL } from '@/config';
import { copy } from '@/content/copy';

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('relative mx-auto w-full max-w-site px-5 sm:px-8 xl:px-0', className)}>{children}</div>;
}

type ButtonVariant = 'cyan' | 'dark';

const buttonVariants: Record<ButtonVariant, string> = {
  cyan: 'bg-cyan text-black hover:brightness-[.93]',
  dark: 'bg-black text-paper hover:bg-graphite',
};

export function Button({
  href = APPLY_URL,
  variant = 'cyan',
  size = 'lg',
  className,
  children = copy.apply,
}: {
  href?: string;
  variant?: ButtonVariant;
  size?: 'sm' | 'lg';
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center justify-center rounded-full text-center font-semibold leading-tight',
        'transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0',
        size === 'lg' ? 'min-h-[50px] min-w-[240px] px-8 py-3 text-[15px] sm:min-w-[274px]' : 'min-h-[42px] px-6 py-2.5 text-[13.5px]',
        buttonVariants[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}

/** Etiqueta pílula com contorno ("PARTE 1 · PORTO", "PARA QUEM É"...). */
export function Eyebrow({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p
      className={cn(
        'inline-flex rounded-full border border-black/45 px-3 py-[5px] text-[11px] font-semibold uppercase leading-none tracking-[0.12em] sm:text-xs',
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * Palavra de destaque com a barra que se desenha ao entrar na tela.
 * Por padrão em serifa itálica; `sans` mantém a fonte do título (ex.: "DEPOIS").
 */
export function Accent({
  children,
  bar = 'cyan',
  sans = false,
}: {
  children: React.ReactNode;
  bar?: 'cyan' | 'black';
  sans?: boolean;
}) {
  return (
    <em
      className={cn('accent', sans && 'accent-sans')}
      style={bar === 'black' ? ({ '--accent-bar': '#000' } as React.CSSProperties) : undefined}
    >
      {children}
    </em>
  );
}

/** Foto de fundo decorativa ocupando toda a seção. */
export function Backdrop({
  name,
  priority = false,
  className,
  imgClassName,
}: {
  name: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div aria-hidden="true" className={cn('absolute inset-0 -z-20 overflow-hidden', className)}>
      <Image
        src={`/images/${name}.webp`}
        alt=""
        fill
        sizes="100vw"
        priority={priority}
        className={cn('object-cover', imgClassName)}
      />
    </div>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('grid size-6 shrink-0 place-items-center rounded-full bg-cyan text-black', className)}>
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 8.5l3 3 6-7" />
      </svg>
    </span>
  );
}

export function CrossIcon({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('grid size-6 shrink-0 place-items-center text-gray', className)}>
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M4 4l8 8M12 4l-8 8" />
      </svg>
    </span>
  );
}

export function CheckList({
  items,
  negative = false,
  className,
}: {
  items: readonly string[];
  negative?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn('grid gap-4 sm:gap-[18px]', className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3.5 text-[15px] leading-normal sm:text-base">
          {negative ? <CrossIcon /> : <CheckIcon />}
          <span className="pt-px">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Pílula "Resultado: ..." no fim de cada parte do método. */
export function ResultPill({ label, text, className }: { label: string; text: string; className?: string }) {
  return (
    <p
      className={cn(
        'rounded-2xl border border-black/50 px-5 py-2.5 text-center text-[13.5px] leading-snug backdrop-blur-sm sm:rounded-full sm:px-7 sm:text-[15px]',
        className,
      )}
    >
      <strong className="mr-2 font-bold sm:mr-3">{label}</strong>
      {text}
    </p>
  );
}
