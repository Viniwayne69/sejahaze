'use client';

import { useEffect, useState } from 'react';
import { areas, textosAplicacao as t, type AreaId } from '@/content/aplicacao';
import type { Diagnostico } from '@/lib/diagnostico';
import { Accent, btnPrincipal, cn } from './ui';

/** Quem tem "reduzir movimento" ligado no aparelho vê tudo pronto, sem animar. */
const semMovimento = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Número que sobe de 0 até o alvo, começando depois de `inicioMs`. */
function useContagem(alvo: number, inicioMs: number, duracaoMs: number) {
  const [valor, setValor] = useState(0);
  useEffect(() => {
    if (semMovimento()) {
      setValor(alvo);
      return;
    }
    let frame = 0;
    const inicio = performance.now() + inicioMs;
    const passo = (agora: number) => {
      const p = Math.min(1, Math.max(0, (agora - inicio) / duracaoMs));
      setValor(Math.round(p * alvo));
      if (p < 1) frame = requestAnimationFrame(passo);
    };
    frame = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(frame);
  }, [alvo, inicioMs, duracaoMs]);
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

/** Vermelho só na bolinha da área mais fraca, para chamar a atenção para o que precisa de ação. */
const ALERTA = '#FF3B30';

const RAIO = 88;
const RAIO_MIN = 20;
const centro = 150;
const angulo = (i: number) => ((-90 + i * 60) * Math.PI) / 180;
const ponto = (i: number, raio: number) => [centro + raio * Math.cos(angulo(i)), centro + raio * Math.sin(angulo(i))] as const;
const pontos = (raios: number[]) => raios.map((r, i) => ponto(i, r).map((v) => v.toFixed(1)).join(',')).join(' ');

/**
 * Resultado do diagnóstico em cena: a névoa se dissipa, o medidor em arco sobe até a nota, o radar das seis áreas
 * se desenha, a área mais fraca pulsa (e dá para tocar em qualquer área), o ponto mais fraco aparece digitado
 * e o botão do WhatsApp fecha a tela. As cores e os tempos ficam no CSS (globals.css, "Resultado: entrada elétrica").
 */
export default function ResultadoDiagnostico({
  nome,
  resultado,
  linkWhatsapp,
}: {
  nome: string;
  resultado: Diagnostico;
  linkWhatsapp: string;
}) {
  const { nota, perfil, porArea, fraco } = resultado;
  const [selecionada, setSelecionada] = useState<AreaId>(fraco ?? 'desejo');
  const contagem = useContagem(nota, 1300, 1600);

  const proporcao = (id: AreaId) => {
    const a = areas.find((x) => x.id === id)!;
    return porArea[id] / (a.campos.length * 2);
  };
  // Quanto maior o desenho, mais forte a área (menos dificuldade)
  const raios = areas.map((a) => RAIO_MIN + (1 - proporcao(a.id)) * (RAIO - RAIO_MIN));
  const areaFraca = fraco ? areas.find((a) => a.id === fraco)! : null;
  const areaAtual = areas.find((a) => a.id === selecionada)!;
  const nivelAtual = nivelDe(proporcao(selecionada));
  const ang = -90 + nota * 18;

  const rotuloNivel = { forte: t.resultado.forte, meio: t.resultado.atencao, fraco: t.resultado.fragil }[nivelAtual];
  const classeNivel = {
    forte: 'bg-cyan text-black',
    meio: 'border border-black bg-paper text-black',
    fraco: 'bg-black text-cyan',
  }[nivelAtual];

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

      {/* Medidor em arco: o ponteiro varre até a nota, passa um pouco e volta */}
      <section
        aria-label={`${t.resultado.medidorTitulo}: ${t.resultado.pontuacao(nota)}`}
        style={{ '--d': '1000ms' } as React.CSSProperties}
        className="res-entra mt-6 rounded-[24px] border-2 border-black bg-paper px-4 pb-4 pt-4 shadow-[0_0_26px_rgba(1,187,251,.3)]"
      >
        <p className="text-center text-[12px] font-semibold uppercase tracking-[0.08em]">{t.resultado.medidorTitulo}</p>
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
              className="arco-enche"
              style={{ '--off': 100 - nota * 10, filter: 'drop-shadow(0 0 7px rgba(1,187,251,.85))' } as React.CSSProperties}
            />
            <g className="ponteiro" style={{ '--ang': `${ang}deg` } as React.CSSProperties}>
              <line x1="120" y1="120" x2="120" y2="42" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
            </g>
            <circle cx="120" cy="120" r="8" fill="#000" />
            <circle cx="120" cy="120" r="3" fill="#01BBFB" />
          </svg>
          <p className="absolute bottom-0 left-1 text-[11px] font-medium">{t.resultado.medidorExtremos[0]}</p>
          <p className="absolute bottom-0 right-1 text-[11px] font-medium">{t.resultado.medidorExtremos[1]}</p>
          <p className="absolute inset-x-0 top-[70%] text-center leading-none">
            <span className="font-display text-[54px] font-black tabular-nums">{contagem}</span>
            <span className="ml-1 font-display text-[16px] font-black">de 10</span>
          </p>
        </div>
      </section>

      {/* Radar das seis áreas: o desenho se traça sozinho e cada área é tocável */}
      <section
        aria-label={t.resultado.radarTitulo}
        style={{ '--d': '2600ms' } as React.CSSProperties}
        className="res-entra mt-4 rounded-[24px] border-2 border-black bg-paper px-4 pb-4 pt-4"
      >
        <p className="text-center text-[12px] font-semibold uppercase tracking-[0.08em]">{t.resultado.radarTitulo}</p>
        <p className="mt-0.5 text-center text-[11px] text-gray">{t.resultado.toque}</p>
        <div className="relative mx-auto mt-1 aspect-square w-full max-w-[330px]">
          <svg viewBox="0 0 300 300" className="absolute inset-0 size-full" aria-hidden="true">
            {[1, 0.66, 0.33].map((n) => (
              <polygon key={n} points={pontos(areas.map(() => RAIO * n))} fill="none" stroke="#000" strokeOpacity="0.16" strokeWidth="1" />
            ))}
            {areas.map((a, i) => {
              const [x, y] = ponto(i, RAIO);
              return <line key={a.id} x1={centro} y1={centro} x2={x} y2={y} stroke="#000" strokeOpacity="0.16" strokeWidth="1" />;
            })}
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
                  {a.id === fraco && <circle cx={x} cy={y} r="9" fill="none" stroke={ALERTA} strokeWidth="2.5" className="radar-pulso" />}
                  <circle cx={x} cy={y} r={a.id === fraco ? 6 : 5} fill={a.id === fraco ? ALERTA : '#01BBFB'} stroke="#000" strokeWidth="1.5" className="radar-no" style={{ animationDelay: `${2.9 + i * 0.25}s` }} />
                </g>
              );
            })}
          </svg>
          {areas.map((a, i) => {
            const [x, y] = ponto(i, 124);
            const ativa = selecionada === a.id;
            return (
              <button
                key={a.id}
                type="button"
                aria-pressed={ativa}
                onClick={() => setSelecionada(a.id)}
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

      {/* O que a pessoa foi buscar: o ponto mais fraco (digitado) e o primeiro passo */}
      <div className="mt-4 grid gap-3">
        {areaFraca && (
          <div className="rounded-[24px] border-2 border-black bg-black px-5 py-4 text-paper">
            <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-cyan">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-[#FF3B30] shadow-[0_0_8px_rgba(255,59,48,.9)]" />
              {t.resultado.pontoFraco}
            </p>
            <p className="mt-1.5 text-[16px] leading-snug">
              <Digitado texto={`${nome}, ${areaFraca.fraco}`} inicioMs={4800} />
            </p>
            <p style={{ '--d': '6600ms' } as React.CSSProperties} className="res-entra mt-2 text-[13px] font-semibold leading-snug text-cyan">
              {t.resultado.urgencia}
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
    </div>
  );
}
