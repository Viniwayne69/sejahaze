import type { Metadata, Viewport } from 'next';
import { Archivo, Inter, Instrument_Serif } from 'next/font/google';
import { SITE_URL } from '@/config';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-instrument',
  display: 'swap',
});

const title = 'HAZE | Marcas desejadas começam por um destino claro';
const description =
  'Criamos e aceleramos marcas que atraem os clientes certos, elevam o valor percebido e vendem mais. Conheça o Método HAZE: Porto, Rota e Travessia.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    locale: 'pt_BR',
    type: 'website',
    siteName: 'HAZE',
    images: [{ url: '/images/hero.webp', width: 2400, height: 1024, alt: '' }],
  },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport: Viewport = {
  themeColor: '#F1EEE7',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${archivo.variable} ${inter.variable} ${instrument.variable}`}>
      <head>
        {/* Marca o documento como "com JS" antes da pintura, para as animações de entrada não piscarem */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
