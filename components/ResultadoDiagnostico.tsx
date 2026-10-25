'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { areas, textosAplicacao as t, type AreaId } from '@/content/aplicacao';
import type { Diagnostico } from '@/lib/diagnostico';
import { Accent, btnPrincipal, cn } from './ui';

/** Quem tem "reduzir movimento" ligado no aparelho vê tudo pronto, sem animar. */
const semMovimento = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Vibração curta no celular (ignora onde não existe). */
const vibrar = (ms = 10) => {
  try {
    navigator.vibrate?.(ms);
  } catch {
    // sem vibração, segue normal
  }
};

/**
 * Número que sobe de 0 até a nota na entrada e, depois, desliza suavemente sempre que a nota muda (simulação).
 */
function useNumeroVivo(alvo: number) {
  const [valor, setValor] = useState(0);
  const atual = useRef(0);
  const entrou = useRef(false);
  useEffect(() => {
    if (semMovimento()) {
      atual.current = alvo;
      setValor(alvo);
      return;
    }
    const delay = entrou.current ? 0 : 1300;
    const duracao = entrou.current ? 450 : 1600;
    const de = atual.current;
    const inicio = performance.now() + delay;
    let frame = 0;
    const passo = (agora: number) => {
      const p = Math.min(1, Math.max(0, (agora - inicio) / duracao));
      const v = Math.round(de + (alvo - de) * p);
      atual.current = v;
      setValor(v);
      if (p < 1) frame = requestAnimationFrame(passo);
      else entrou.current = true;
    };
    frame = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(frame);
  }, [alvo]);
  return valor;
}

/** Texto que aparece letra por letra. O texto inteiro fica reservado (invisível) para a tela não pular de altura. */
function Digitado({ texto, inicioMs, velocidadeMs = 28 }: { texto: string; inicioMs: number; velocidadeMs?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (semMovimento()) {
      setN(texto.length);
      return;
    }
    let frame = 0;
    const inicio = performance.now() + inicioMs;
    const passo = (agora: number) => {
      const k = Math.min(texto.length, Math.max(0, Math.floor((agora - inicio) / velocidadeMs)));
      setN(k);
      if (k < texto.length) frame = requestAnimationFrame(passo);
    };
    frame = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(frame);
  }, [texto, inicioMs, velocidadeMs]);

  return (
    <span className="relative block">
      <span className="sr-only">{texto}</span>
      <span aria-hidden="true" className="invisible block">
        {texto}
      </span>
      <span aria-hidden="true" className="absolute inset-0 block">
        {texto.slice(0, n)}
        {n < texto.length && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-cyan" />}
      </span>
    </span>
  );
}

type Nivel = 'forte' | 'meio' | 'fraco';
const nivelDe = (p: number): Nivel => (p === 0 ? 'forte' : p <= 0.5 ? 'meio' : 'fraco');

const RAIO = 88;
const RAIO_MIN = 34;
const centro = 150;
const angulo = (i: number) => ((-90 + i * 60) * Math.PI) / 180;
const ponto = (i: number, raio: number) => [centro + raio * Math.cos(angulo(i)), centro + raio * Math.sin(angulo(i))] as const;
const pontos = (raios: number[]) => raios.map((r, i) => ponto(i, r).map((v) => v.toFixed(1)).join(',')).join(' ');
const raioDe = (p: number) => RAIO_MIN + (1 - p) * (RAIO - RAIO_MIN);
const MAXIMO = areas.reduce((soma, a) => soma + a.campos.length * 2, 0);

/**
 * Resultado do diagnóstico em cena: a névoa se dissipa, o medidor em arco sobe até a nota, o radar das seis áreas
 * se desenha, a área mais fraca pulsa e o ponto mais fraco aparece digitado. Depois da entrada, a pessoa brinca:
 * toca numa área para ler, ARRASTA a ponta do radar para fora e vê a nota subir (simulação, nada disso vai para o CRM)
 * e escolhe por onde quer começar (a escolha vai escrita na mensagem do WhatsApp).
 * As cores e os tempos ficam no CSS (globals.css, "Resultado: entrada elétrica" e "Resultado interativo").
 */
export default function ResultadoDiagnostico({
  nome,
  negocio,
  resultado,
  montarLink,
}: {
  nome: string;
  negocio: string;
  resultado: Diagnostico;
  /** Monta o link do WhatsApp com a área escolhida pela pessoa (já em minúsculas). */
  montarLink: (prioridade: string) => string;
}) {
  const { perfil, porArea, fraco } = resultado;

  const reais = areas.map((a) => porArea[a.id] / (a.campos.length * 2));
  const [simulados, setSimulados] = useState<number[]>(reais);
  const [selecionada, setSelecionada] = useState<AreaId>(fraco ?? 'desejo');
  const [prioridade, setPrioridade] = useState<AreaId>(fraco ?? 'desejo');
  const [arrastando, setArrastando] = useState<number | null>(null);
  const [vivo, setVivo] = useState(false); // depois da entrada, os elementos passam a responder aos toques
  const radarRef = useRef<HTMLDivElement>(null);
  const volta = useRef(0);

  useEffect(() => {
    const id = window.setTimeout(() => setVivo(true), semMovimento() ? 0 : 3400);
    return () => window.clearTimeout(id);
  }, []);
  useEffect(() => () => cancelAnimationFrame(volta.current), []);

  const pontosSimulados = areas.reduce((soma, a, i) => soma + simulados[i] * a.campos.length * 2, 0);
  const notaSimulada = Math.round(1 + (pontosSimulados / MAXIMO) * 9);
  const mudadas = areas.filter((_, i) => simulados[i] < reais[i] - 0.01);
  const simulando = mudadas.length > 0;
  const numero = useNumeroVivo(notaSimulada);

  const raios = simulados.map(raioDe);
  const areaFraca = fraco ? areas.find((a) => a.id === fraco)! : null;
  const areaAtual = areas.find((a) => a.id === selecionada)!;
  const nivelAtual = nivelDe(reais[areas.findIndex((a) => a.id === selecionada)]);
  const ang = -90 + notaSimulada * 18;

  const rotuloNivel = { forte: t.resultado.forte, meio: t.resultado.atencao, fraco: t.resultado.fragil }[nivelAtual];
  const classeNivel = {
    forte: 'bg-cyan text-black',
    meio: 'border border-black bg-paper text-black',
    fraco: 'bg-black text-cyan',
  }[nivelAtual];

  // Só dá para melhorar na simulação, nunca piorar além do resultado real
  const definirForca = (i: number, forca: number) => {
    const f = Math.min(1, Math.max(0, forca));
    setSimulados((atual) => atual.map((p, k) => (k === i ? Math.min(reais[i], 1 - f) : p)));
  };

  const aoMover = (e: React.PointerEvent, i: number) => {
    if (arrastando !== i || !radarRef.current) return;
    const r = radarRef.current.getBoundingClientRect();
    const escala = 300 / r.width;
    const px = (e.clientX - r.left) * escala - centro;
    const py = (e.clientY - r.top) * escala - centro;
    const projecao = px * Math.cos(angulo(i)) + py * Math.sin(angulo(i));
    definirForca(i, (projecao - RAIO_MIN) / (RAIO - RAIO_MIN));
  };

  const aoTeclar = (e: React.KeyboardEvent, i: number) => {
    const forca = 1 - simulados[i];
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') definirForca(i, forca + 0.25);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') definirForca(i, forca - 0.25);
    else return;
    e.preventDefault();
  };

  const voltarAoResultado = () => {
    vibrar(8);
    cancelAnimationFrame(volta.current);
    const de = simulados;
    const inicio = performance.now();
    const passo = (agora: number) => {
      const p = Math.min(1, (agora - inicio) / 420);
      setSimulados(de.map((v, i) => v + (reais[i] - v) * p));
      if (p < 1) volta.current = requestAnimationFrame(passo);
    };
    volta.current = requestAnimationFrame(passo);
  };

  const linkWhatsapp = montarLink(areas.find((a) => a.id === prioridade)!.rotulo.toLowerCase());

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      {/* Névoa que cobre a tela e se dissipa, e o clarão ciano */}
      <div aria-hidden="true" className="res-nevoa" />
      <div aria-hidden="true" className="res-flash pointer-events-none fixed inset-0 z-20 bg-[radial-gradient(ellipse_at_center,rgba(1,187,251,.7),rgba(1,187,251,0)_70%)]" />
      <div
        aria-hidden="true"
        className="luz-acende pointer-events-none absolute -top-16 left-1/2 -z-10 size-64 rounded-full bg-cyan blur-3xl md:size-80"
      />

      <p style={{ '--d': '400ms' } as React.CSSProperties} className="res-entra text-center text-[12px] font-semibold uppercase tracking-[0.08em]">
        {nome}, {t.resultado.rotulo}
      </p>
      <h1 tabIndex={-1} className="res-titulo display mt-2 text-center text-[30px] outline-none md:text-[44px]">
        {perfil.titulo.split(' ').slice(0, -1).join(' ')} <Accent>{perfil.titulo.split(' ').slice(-1)[0]}</Accent>
      </h1>
      {perfil.texto && (
        <p style={{ '--d': '1000ms' } as React.CSSProperties} className="res-entra mx-auto mt-3 max-w-[380px] text-center text-[16px] leading-snug">
          {perfil.texto}
        </p>
      )}

      {/* Medidor em arco: o ponteiro varre até a nota e, depois, acompanha a simulação */}
      <section
        aria-label={`${t.resultado.medidorTitulo}: ${t.resultado.pontuacao(notaSimulada)}`}
        style={{ '--d': '1000ms' } as React.CSSProperties}
        className="res-entra mt-6 rounded-[24px] border-2 border-black bg-paper px-4 pb-4 pt-4 shadow-[0_0_26px_rgba(1,187,251,.3)]"
      >
        <p className="text-center text-[12px] font-semibold uppercase tracking-[0.08em]">
          {t.resultado.medidorTitulo}
          {simulando && <span className="ml-2 rounded-full bg-black px-2 py-0.5 text-[10px] tracking-[0.06em] text-cyan">Simulação</span>}
        </p>
        <div className="relative mx-auto mt-2 w-full max-w-[300px]">
          <svg viewBox="0 0 240 190" className="block w-full" aria-hidden="true">
            <path d="M 20 120 A 100 100 0 0 1 220 120" pathLength={100} fill="none" stroke="#000" strokeOpacity="0.1" strokeWidth="14" strokeLinecap="round" />
            <path
              d="M 20 120 A 100 100 0 0 1 220 120"
              pathLength={100}
              fill="none"
              stroke="#01BBFB"
              strokeWidth="14"
              strokeLinecap="round"
              className={vivo ? 'arco-vivo' : 'arco-enche'}
              style={{ '--off': 100 - notaSimulada * 10, filter: 'drop-shadow(0 0 7px rgba(1,187,251,.85))' } as React.CSSProperties}
            />
            <g className={vivo ? 'ponteiro-vivo' : 'ponteiro'} style={{ '--ang': `${ang}deg` } as React.CSSProperties}>
              <line x1="120" y1="120" x2="120" y2="42" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
            </g>
            <circle cx="120" cy="120" r="8" fill="#000" />
            <circle cx="120" cy="120" r="3" fill="#01BBFB" />
          </svg>
          <p className="absolute bottom-0 left-1 text-[11px] font-medium">{t.resultado.medidorExtremos[0]}</p>
          <p className="absolute bottom-0 right-1 text-[11px] font-medium">{t.resultado.medidorExtremos[1]}</p>
          <p className="absolute inset-x-0 top-[70%] text-center leading-none">
            <span className="font-display text-[54px] font-black tabular-nums">{numero}</span>
            <span className="ml-1 font-display text-[16px] font-black">de 10</span>
          </p>
        </div>
      </section>

      {/* Radar das seis áreas: o desenho se traça sozinho, cada área é tocável e a ponta de cada uma pode ser arrastada */}
      <section
        aria-label={t.resultado.radarTitulo}
        style={{ '--d': '2600ms' } as React.CSSProperties}
        className="res-entra mt-4 rounded-[24px] border-2 border-black bg-paper px-4 pb-4 pt-4"
      >
        <p className="text-center text-[12px] font-semibold uppercase tracking-[0.08em]">{t.resultado.radarTitulo}</p>
        <div className="mt-0.5 flex min-h-[34px] flex-col items-center justify-center text-center" aria-live="polite">
          {simulando ? (
            <>
              <p className="text-[12px] font-semibold leading-snug">
                {mudadas.length === 1 ? t.resultado.simulacaoUma(mudadas[0].rotulo, notaSimulada) : t.resultado.simulacaoVarias(notaSimulada)}
              </p>
              <button type="button" onClick={voltarAoResultado} className="mt-0.5 text-[11px] font-medium underline underline-offset-2">
                {t.resultado.voltarResultado}
              </button>
            </>
          ) : (
            <p className="text-[11px] leading-snug text-gray">{t.resultado.toque}</p>
          )}
        </div>
        <div ref={radarRef} className="relative mx-auto mt-1 aspect-square w-full max-w-[330px] select-none">
          <svg viewBox="0 0 300 300" className="absolute inset-0 size-full" aria-hidden="true">
            {[1, 0.66, 0.33].map((n) => (
              <polygon key={n} points={pontos(areas.map(() => RAIO * n))} fill="none" stroke="#000" strokeOpacity="0.16" strokeWidth="1" />
            ))}
            {areas.map((a, i) => {
              const [x, y] = ponto(i, RAIO);
              return <line key={a.id} x1={centro} y1={centro} x2={x} y2={y} stroke="#000" strokeOpacity="0.16" strokeWidth="1" />;
            })}
            {/* Contorno do resultado real, que aparece como referência enquanto a pessoa simula */}
            {simulando && (
              <polygon points={pontos(reais.map(raioDe))} fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 4" />
            )}
            <polygon points={pontos(raios)} fill="#01BBFB" className="radar-fill" />
            <polygon
              points={pontos(raios)}
              pathLength={100}
              fill="none"
              stroke="#01BBFB"
              strokeWidth="3.5"
              strokeLinejoin="round"
              className="radar-traco"
              style={{ filter: 'drop-shadow(0 0 5px rgba(1,187,251,.8))' }}
            />
            {areas.map((a, i) => {
              const [x, y] = ponto(i, raios[i]);
              return (
                <g key={a.id}>
                  {a.id === fraco && !simulando && <circle cx={x} cy={y} r="9" fill="none" stroke="#01BBFB" strokeWidth="2.5" className="radar-pulso" />}
                  {arrastando === i && <circle cx={x} cy={y} r="13" fill="#01BBFB" fillOpacity="0.25" stroke="#01BBFB" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 8px rgba(1,187,251,.9))' }} />}
                  <circle cx={x} cy={y} r="5" fill="#01BBFB" stroke="#000" strokeWidth="1.5" className="radar-no" style={{ animationDelay: `${2.9 + i * 0.25}s` }} />
                </g>
              );
            })}
          </svg>

          {/* Alças de arrastar: uma sobre a ponta de cada área (só com o toque, a rolagem da página segue normal no resto) */}
          {vivo &&
            areas.map((a, i) => {
              const [x, y] = ponto(i, raios[i]);
              return (
                <div
                  key={a.id}
                  role="slider"
                  tabIndex={0}
                  aria-label={t.resultado.arrastar(a.rotulo)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round((1 - simulados[i]) * 100)}
                  onKeyDown={(e) => aoTeclar(e, i)}
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId);
                    setArrastando(i);
                    setSelecionada(a.id);
                    vibrar(10);
                  }}
                  onPointerMove={(e) => aoMover(e, i)}
                  onPointerUp={() => setArrastando(null)}
                  onPointerCancel={() => setArrastando(null)}
                  style={{ left: `${(x / 300) * 100}%`, top: `${(y / 300) * 100}%` }}
                  className="absolute size-10 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full outline-none [touch-action:none] focus-visible:ring-2 focus-visible:ring-black active:cursor-grabbing"
                />
              );
            })}

          {areas.map((a, i) => {
            const [x, y] = ponto(i, 124);
            const ativa = selecionada === a.id;
            return (
              <button
                key={a.id}
                type="button"
                aria-pressed={ativa}
                onClick={() => {
                  setSelecionada(a.id);
                  vibrar(8);
                }}
                style={{ left: `${(x / 300) * 100}%`, top: `${(y / 300) * 100}%`, '--d': `${3300 + i * 90}ms` } as React.CSSProperties}
                className={cn(
                  'res-label absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border-2 border-black px-2.5 py-1 text-[10.5px] font-semibold uppercase leading-none tracking-[0.06em] transition-colors duration-200 active:scale-95',
                  ativa ? 'bg-cyan' : 'bg-paper hover:border-cyan',
                  a.id === fraco && !ativa && 'res-label-pulsa',
                )}
              >
                {a.rotulo}
              </button>
            );
          })}
        </div>
        <div key={selecionada} className="animate-item mt-3 border-t-2 border-black pt-3" aria-live="polite">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em]">
            {areaAtual.rotulo}
            <span className={cn('rounded-full px-2 py-0.5 text-[10px] tracking-[0.06em]', classeNivel)}>{rotuloNivel}</span>
          </p>
          <p className="mt-1 text-[15px] leading-snug">{areaAtual[nivelAtual]}</p>
        </div>
      </section>

      {/* Por onde a pessoa quer começar: a escolha vai escrita na mensagem do WhatsApp */}
      <section
        aria-label={t.resultado.prioridadeTitulo}
        style={{ '--d': '4400ms' } as React.CSSProperties}
        className="res-entra mt-4 rounded-[24px] border-2 border-black bg-paper px-4 py-4"
      >
        <p className="text-center text-[12px] font-semibold uppercase tracking-[0.08em]">{t.resultado.prioridadeTitulo}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {areas.map((a) => {
            const ativa = prioridade === a.id;
            return (
              <button
                key={a.id}
                type="button"
                aria-pressed={ativa}
                onClick={() => {
                  setPrioridade(a.id);
                  vibrar(12);
                }}
                className={cn(
                  'rounded-full border-2 border-black px-3.5 py-2 text-[12px] font-semibold uppercase leading-none tracking-[0.06em] transition duration-200 active:scale-95',
                  ativa ? 'bg-cyan shadow-[0_0_16px_rgba(1,187,251,.6)]' : 'bg-paper hover:border-cyan',
                )}
              >
                {a.rotulo}
              </button>
            );
          })}
        </div>
      </section>

      {/* O que a pessoa foi buscar: o ponto mais fraco (digitado) e o primeiro passo */}
      <div className="mt-4 grid gap-3">
        {areaFraca && (
          <div className="rounded-[24px] border-2 border-black bg-black px-5 py-4 text-paper">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-cyan">{t.resultado.pontoFraco}</p>
            <p className="mt-1.5 text-[16px] leading-snug">
              <Digitado texto={`${negocio}, ${areaFraca.fraco}`} inicioMs={4800} />
            </p>
          </div>
        )}
        <div style={{ '--d': '5600ms' } as React.CSSProperties} className="res-entra rounded-[24px] border-2 border-black bg-paper px-5 py-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em]">{t.resultado.primeiroPasso}</p>
          <p className="mt-1.5 text-[16px] leading-snug">{t.resultado.primeiroPassoTexto}</p>
        </div>
      </div>

      {/* O botão acompanha a rolagem no celular e fecha a tela */}
      <div className="sticky bottom-3 z-10 mt-6 text-center">
        <a
          href={linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(btnPrincipal, 'res-cta w-full shadow-[0_10px_28px_rgba(0,0,0,.2)] md:w-auto md:min-w-[340px]')}
        >
          {t.resultado.whatsappBotao}
        </a>
      </div>
      <p className="mt-3 text-center">
        <Link href="/" className="inline-block text-[14px] font-medium underline underline-offset-4">
          {t.resultado.voltarSite}
        </Link>
      </p>
    </div>
  );
}
