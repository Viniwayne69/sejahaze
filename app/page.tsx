import Aplicacao from '@/components/Aplicacao';
import Dores from '@/components/Dores';
import Hero from '@/components/Hero';
import Metodo from '@/components/Metodo';
import ParaQuem from '@/components/ParaQuem';
import Perguntas from '@/components/Perguntas';
import Promessa from '@/components/Promessa';
import RevealObserver from '@/components/RevealObserver';
import ScrollProgress from '@/components/ScrollProgress';
import StickyBar from '@/components/StickyBar';
import TopBar from '@/components/TopBar';
import UltimoAviso from '@/components/UltimoAviso';
import { copy } from '@/content/copy';

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="fixed left-3 top-3 z-[100] -translate-y-[200%] rounded-full bg-black px-5 py-3 text-sm font-semibold text-paper transition focus:translate-y-0"
      >
        {copy.skipLink}
      </a>
      <ScrollProgress />
      <TopBar />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Promessa />
        <Dores />
        <Metodo />
        <ParaQuem />
        <Aplicacao />
        <Perguntas />
      </main>
      <UltimoAviso />
      <StickyBar />
      <RevealObserver />
    </>
  );
}
