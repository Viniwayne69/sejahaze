import type { Metadata, Viewport } from 'next';
import { Archivo, Inter } from 'next/font/google';
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

const title = 'HAZE | Marcas desejadas começam pela clareza';
const description =
  'Criamos e aceleramos marcas que atraem os clientes certos, elevam o valor percebido e vendem mais, conheça o Método HAZE: Raio-X, Arquitetura e Implementação';
const ogImage = { url: '/og.png', width: 1200, height: 630, alt: 'HAZE' };

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
    images: [ogImage],
  },
  twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${archivo.variable} ${inter.variable}`}>
      <head>
        {/* Marca o documento como "com JS" antes da pintura, para as animações de entrada não piscarem */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
