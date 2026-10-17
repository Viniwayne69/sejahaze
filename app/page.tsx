import AntesDepois from '@/components/AntesDepois';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Metodo from '@/components/Metodo';
import ParaQuem from '@/components/ParaQuem';
import Perguntas from '@/components/Perguntas';
import Porto from '@/components/Porto';
import ProximoPasso from '@/components/ProximoPasso';
import RevealObserver from '@/components/RevealObserver';
import Rota from '@/components/Rota';
import Travessia from '@/components/Travessia';

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Metodo />
        <Porto />
        <Rota />
        <Travessia />
        <AntesDepois />
        <ParaQuem />
        <Perguntas />
        <ProximoPasso />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
