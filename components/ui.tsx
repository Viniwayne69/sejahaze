import { APPLY_URL } from '@/config';
import { copy } from '@/content/copy';

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Coluna central: 22px de margem no celular, como na página de referência. */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('relative mx-auto w-full max-w-[1080px] px-[22px] md:px-10 min-[1700px]:max-w-[1240px]', className)}>{children}</div>;
}

/** Texturas da marca (Identidade-HAZE/texturas) e a cor de texto que cada uma pede. */
export const textures = {
  nevoa: 'dark',
  fosca: 'dark',
  'fosca-azul': 'dark',
  'papel-azul': 'light',
  'topografica-v3': 'light',
  ciano: 'cyan',
} as const;

export type Texture = keyof typeof textures;

const toneStyles = {
  dark: 'bg-black text-paper',
  light: 'bg-paper text-black',
  cyan: 'bg-cyan text-black',
} as const;

/** Fundo de seção com textura da marca (cover), texto por cima. */
export function textureProps(texture: Texture) {
  return {
    className: cn('texture', toneStyles[textures[texture]], textures[texture] === 'dark' && 'glow'),
    style: { backgroundImage: `url('/textures/${texture}.webp')` },
  };
}

/** Toda emenda é azul: a névoa ciano da marca, qualquer que seja a cor da seção de cima. */
const fadeFrom = { paper: 'from-cyan/40', black: 'from-cyan/40', cyan: 'from-cyan/40' } as const;

/**
 * Emenda entre seções: `fade` esfuma uma névoa ciano no topo da seção. Fica atrás do conteúdo.
 */
export function Emenda({ fade }: { fade?: keyof typeof fadeFrom }) {
  return (
    <>
      {fade && <div aria-hidden="true" className={cn('pointer-events-none absolute inset-x-0 top-0 h-7 bg-gradient-to-b via-cyan/15 to-transparent md:h-14', fadeFrom[fade])} />}
    </>
  );
}

/** Seção com o ritmo da página: 24px de respiro no celular, mais no desktop. */
export function Section({
  id,
  texture,
  className,
  children,
  labelledBy,
  fade,
}: {
  id?: string;
  texture: Texture;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
  fade?: keyof typeof fadeFrom;
}) {
  const bg = textureProps(texture);
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative isolate overflow-hidden py-6 md:py-20', bg.className, className)}
      style={bg.style}
    >
      <Emenda fade={fade} />
      <Container>{children}</Container>
    </section>
  );
}

type ButtonVariant = 'cyan' | 'dark';

const buttonVariants: Record<ButtonVariant, string> = {
  cyan: 'brilho bg-cyan text-black hover:brightness-[.93]',
  dark: 'bg-black text-paper hover:bg-graphite',
};

/** Botão de ação: pílula, largura total no celular, como na referência. */
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
        'inline-flex min-h-[52px] w-full items-center justify-center rounded-full px-6 py-3 text-center text-[16px] font-semibold leading-tight',
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

/** Título de seção em caixa alta larga, com palavra-chave sublinhada opcional. */
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
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <Tag id={id} className={cn('display', headingSizes[size], className)}>
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

/** Palavra-chave: mesma Archivo 900 da frase, com a barra reta que se desenha ao entrar na tela. */
export function Accent({ children, bar = 'cyan' }: { children: React.ReactNode; bar?: 'cyan' | 'black' }) {
  return (
    <span className="accent" style={bar === 'black' ? ({ '--accent-bar': '#000' } as React.CSSProperties) : undefined}>
      {children}
    </span>
  );
}

/** Pequena nota abaixo dos botões ("Leva menos de 3 minutos"). */
export function ApplyNote({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <p className={cn('mt-2.5 text-center text-[12px] font-medium', className)}>{children ?? copy.applyNote}</p>;
}

/** Barra curta reta da marca, usada no lugar de marcadores e ícones. */
export function Bar({ tone = 'cyan', className }: { tone?: 'cyan' | 'gray' | 'black'; className?: string }) {
  const color = { cyan: 'bg-cyan', gray: 'bg-gray', black: 'bg-black' }[tone];
  return <span aria-hidden="true" className={cn('inline-block h-[4px] w-5 shrink-0', color, className)} />;
}
