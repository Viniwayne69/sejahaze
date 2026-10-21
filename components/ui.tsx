import { APPLY_URL } from '@/config';
import { copy } from '@/content/copy';

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Coluna central: 22px de margem no celular, como na página de referência. */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('relative mx-auto w-full max-w-[1080px] px-[22px] md:px-10', className)}>{children}</div>;
}

type Tone = 'dark' | 'paper' | 'white';

const toneStyles: Record<Tone, string> = {
  dark: 'bg-black text-paper',
  paper: 'bg-paper text-black',
  white: 'bg-white text-black',
};

/** Seção com o ritmo da página: 24px de respiro no celular, mais no desktop. */
export function Section({
  id,
  tone,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone: Tone;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative isolate overflow-hidden py-6 md:py-20', toneStyles[tone], className)}
    >
      {tone === 'dark' && <DarkTexture />}
      <Container>{children}</Container>
    </section>
  );
}

/** Linhas topográficas bem discretas sobre o preto. */
export function DarkTexture() {
  return <div aria-hidden="true" className="topo-lines absolute inset-0 -z-10 opacity-[0.07] invert" />;
}

type ButtonVariant = 'cyan' | 'dark';

const buttonVariants: Record<ButtonVariant, string> = {
  cyan: 'bg-cyan text-black hover:brightness-[.93]',
  dark: 'bg-black text-paper hover:bg-graphite',
};

/** Botão de ação: largura total no celular, como na referência. */
export function Button({
  href = APPLY_URL,
  variant = 'cyan',
  className,
  children = copy.apply,
}: {
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex min-h-[52px] w-full items-center justify-center rounded-full px-6 py-3 text-center text-[16px] font-bold leading-tight',
        'transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0 md:w-auto md:min-w-[340px]',
        buttonVariants[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}

const headingSizes = {
  md: 'text-[26px] md:text-[44px]',
  lg: 'text-[30px] md:text-[52px]',
};

/** Título de seção em caixa alta larga, com palavra de destaque opcional. */
export function Heading({
  id,
  before,
  accent,
  after,
  bar = 'cyan',
  size = 'md',
  className,
  as: Tag = 'h2',
}: {
  id?: string;
  before: string;
  accent?: string;
  after?: string;
  bar?: 'cyan' | 'black';
  size?: keyof typeof headingSizes;
  className?: string;
  as?: 'h1' | 'h2';
}) {
  return (
    <Tag id={id} className={cn('display leading-[1.04]', headingSizes[size], className)}>
      {before}
      {accent && (
        <>
          {' '}
          <Accent bar={bar}>{accent}</Accent>
        </>
      )}
      {after && <> {after}</>}
    </Tag>
  );
}

/** Palavra em serifa itálica com a barra que se desenha ao entrar na tela. */
export function Accent({ children, bar = 'cyan' }: { children: React.ReactNode; bar?: 'cyan' | 'black' }) {
  return (
    <em className="accent" style={bar === 'black' ? ({ '--accent-bar': '#000' } as React.CSSProperties) : undefined}>
      {children}
    </em>
  );
}

/** Pequena nota abaixo dos botões ("Leva menos de 2 minutos"). */
export function ApplyNote({ className }: { className?: string }) {
  return <p className={cn('mt-2.5 text-center text-[12px] font-medium opacity-75', className)}>{copy.applyNote}</p>;
}
