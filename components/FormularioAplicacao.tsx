'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { copy } from '@/content/copy';
import {
  diasReuniao,
  horariosReuniao,
  perguntas,
  textosAplicacao as t,
  titulosComNome,
  type Pergunta,
} from '@/content/aplicacao';
import {
  apenasDigitos,
  buscarHorariosOcupados,
  dataPorExtenso,
  enviarAplicacao,
  formatarTelefone,
  proximaDataReuniao,
  type RespostasAplicacao,
} from '@/lib/aplicacao';
import Logo from './Logo';
import { Accent, cn, textureProps } from './ui';

const vazio: RespostasAplicacao = {
  nome: '',
  email: '',
  telefone: '',
  empresa: '',
  cargo: '',
  faturamento: '',
  setor: '',
  dia: '',
  horario: '',
};

const total = perguntas.length;
const doisDigitos = (n: number) => String(n).padStart(2, '0');
const capitalizar = (s: string) => (s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : '');

/** Vibração curta no celular (ignora onde não existe). */
const vibrar = (padrao: number | number[]) => {
  try {
    navigator.vibrate?.(padrao);
  } catch {
    // sem vibração, segue normal
  }
};

const btnPrincipal =
  'brilho inline-flex min-h-[52px] items-center justify-center rounded-full bg-cyan px-8 text-[16px] font-semibold text-black transition hover:brightness-[.93] disabled:cursor-not-allowed disabled:opacity-40';

function validar(pergunta: Pergunta, respostas: RespostasAplicacao) {
  if (pergunta.tipo === 'horario') return '';
  const valor = respostas[pergunta.id].trim();
  if (!valor) return t.erros.obrigatoria;
  if (pergunta.id === 'nome' && valor.split(/\s+/).length < 2) return t.erros.nome;
  if (pergunta.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) return t.erros.email;
  if (pergunta.id === 'telefone' && ![10, 11].includes(apenasDigitos(valor).length)) return t.erros.telefone;
  return '';
}

export default function FormularioAplicacao() {
  const [etapa, setEtapa] = useState(-1); // -1 boas-vindas, 0..total-1 perguntas, total = obrigado
  const [direcao, setDirecao] = useState<'frente' | 'tras'>('frente');
  const [respostas, setRespostas] = useState<RespostasAplicacao>(vazio);
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [dataReuniao, setDataReuniao] = useState('');
  const [armadilha, setArmadilha] = useState(''); // campo escondido contra robôs
  const inputRef = useRef<HTMLInputElement>(null);
  const tituloRef = useRef<HTMLHeadingElement>(null);

  const pergunta = etapa >= 0 && etapa < total ? perguntas[etapa] : null;
  const incentivo = etapa === total - 1 ? t.incentivos.ultima : etapa === total - 3 ? t.incentivos.quaseLa : '';
  const progresso = etapa < 0 ? 0 : Math.min(100, Math.round((etapa / total) * 100));
  const primeiroNome = capitalizar(respostas.nome.trim().split(/\s+/)[0] ?? '');
  const tituloDaPergunta = pergunta && primeiroNome && titulosComNome[pergunta.id] ? titulosComNome[pergunta.id]!(primeiroNome) : pergunta?.titulo;

  // Leva o foco para o campo (ou para o título) a cada nova etapa
  useEffect(() => {
    if (etapa < 0) return;
    if (inputRef.current) inputRef.current.focus();
    else tituloRef.current?.focus();
  }, [etapa]);

  // Ao terminar, uma vibração de comemoração
  useEffect(() => {
    if (etapa === total) vibrar([20, 60, 20]);
  }, [etapa]);

  const ir = (proxima: number) => {
    setDirecao(proxima >= etapa ? 'frente' : 'tras');
    setEtapa(proxima);
  };

  const responder = (campo: keyof RespostasAplicacao, valor: string) => {
    setErro('');
    setRespostas((r) => ({ ...r, [campo]: valor }));
  };

  const enviar = useCallback(
    async (dados: RespostasAplicacao) => {
      if (armadilha) {
        setDirecao('frente');
        setEtapa(total);
        return;
      }
      setEnviando(true);
      setErro('');
      try {
        let data = '';
        if (dados.dia && dados.horario) {
          const ocupados = await buscarHorariosOcupados();
          data = proximaDataReuniao(Number(dados.dia), dados.horario, ocupados);
        }
        await enviarAplicacao({
          nome: dados.nome.trim(),
          email: dados.email.trim(),
          telefone: dados.telefone.trim(),
          empresa: dados.empresa.trim(),
          cargo: dados.cargo,
          faturamento: dados.faturamento,
          setor: dados.setor,
          dia: dados.dia,
          horario: dados.horario,
          dataReuniao: data,
          origem: 'formulario-aplicar',
          enviadoEm: new Date().toISOString(),
        });
        setDataReuniao(data);
        setDirecao('frente');
        setEtapa(total);
      } catch {
        setErro(t.erros.envio);
      } finally {
        setEnviando(false);
      }
    },
    [armadilha],
  );

  const avancar = () => {
    if (!pergunta || enviando) return;
    const mensagem = validar(pergunta, respostas);
    if (mensagem) {
      setErro(mensagem);
      return;
    }
    vibrar(10);
    if (etapa === total - 1) void enviar(respostas);
    else {
      setErro('');
      ir(etapa + 1);
    }
  };

  // Escolher uma opção marca e avança sozinho, como na referência
  const escolherOpcao = useCallback((campo: keyof RespostasAplicacao, opcao: string) => {
    setErro('');
    vibrar(10);
    setRespostas((r) => ({ ...r, [campo]: opcao }));
    setTimeout(() => {
      setDirecao('frente');
      setEtapa((e) => e + 1);
    }, 260);
  }, []);

  // Atalho de teclado: A, B, C... escolhem a opção correspondente
  useEffect(() => {
    if (!pergunta || pergunta.tipo !== 'opcoes') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
      const i = e.key.toUpperCase().charCodeAt(0) - 65;
      const opcao = pergunta.opcoes[i];
      if (opcao) escolherOpcao(pergunta.id, opcao);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pergunta, escolherOpcao]);

  const bg = textureProps('papel-azul');

  return (
    // No celular a textura fica um pouco mais larga que a tela, para só um toque da névoa azul aparecer nas laterais
    <main
      className={cn('relative flex min-h-dvh flex-col overflow-x-hidden bg-[length:108%_100%] md:bg-cover', bg.className)}
      style={bg.style}
    >
      {/* Barra de progresso, com brilho ciano */}
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-10 h-[4px] bg-gray">
        <div
          className="h-full bg-cyan shadow-[0_0_12px_rgba(1,187,251,.9)] transition-[width] duration-500 ease-out"
          style={{ width: `${progresso}%` }}
        />
      </div>

      <header className="flex justify-center px-[22px] pt-7 md:pt-10">
        <Link href="/" aria-label="HAZE, voltar ao site">
          <Logo tone="dark" size="sm" />
        </Link>
      </header>

      <div className="flex flex-1 items-center px-[22px] py-7 md:py-14">
        <div key={etapa} className={cn('relative mx-auto w-full max-w-[680px]', direcao === 'frente' ? 'animate-etapa-frente' : 'animate-etapa-tras')}>
          {/* Boas-vindas: foto da marca, título e botão */}
          {etapa === -1 && (
            <div className="text-center">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-[24px] border-2 border-black bg-black">
                <Image
                  src="/images/capa.webp"
                  alt={t.boasVindas.fotoAlt}
                  fill
                  priority
                  sizes="(min-width: 768px) 420px, 100vw"
                  className="object-cover object-[50%_46%]"
                />
                <div aria-hidden="true" className="hero-nevoa pointer-events-none absolute inset-0" />
              </div>
              <h1 className="display mt-6 text-[27px] md:mt-8 md:text-[44px]">
                {copy.aplicacao.before} <Accent>{copy.aplicacao.accent}</Accent>
              </h1>
              {t.boasVindas.paragrafos.map((p) => (
                <p key={p} className="mx-auto mt-3 max-w-[540px] text-[15px] leading-[1.45] md:mt-4 md:text-[19px]">
                  {p}
                </p>
              ))}
              <button type="button" onClick={() => ir(0)} className={cn(btnPrincipal, 'mt-6 w-full md:mt-8 md:w-auto md:min-w-[300px]')}>
                {t.boasVindas.botao}
              </button>
            </div>
          )}

          {/* Pergunta */}
          {pergunta && (
            <div>
              <p className="font-display text-[15px] font-black md:text-[17px]">
                {doisDigitos(etapa + 1)} <span className="text-gray">{t.de} {doisDigitos(total)}</span>
                {incentivo && <span className="ml-3 font-sans text-[13px] font-semibold uppercase tracking-[0.08em]">{incentivo}</span>}
              </p>
              <h1
                ref={tituloRef}
                id="pergunta-titulo"
                tabIndex={-1}
                className="display mt-3 text-[24px] outline-none md:text-[38px]"
              >
                {tituloDaPergunta}
              </h1>
              {pergunta.ajuda && <p className="mt-3 text-[15px] leading-snug md:text-[17px]">{pergunta.ajuda}</p>}

              {(pergunta.tipo === 'texto' || pergunta.tipo === 'email' || pergunta.tipo === 'tel') && (
                <>
                  <input
                    ref={inputRef}
                    aria-labelledby="pergunta-titulo"
                    aria-invalid={Boolean(erro)}
                    aria-describedby={erro ? 'erro-aplicacao' : undefined}
                    type={pergunta.tipo === 'texto' ? 'text' : pergunta.tipo}
                    inputMode={pergunta.tipo === 'tel' ? 'tel' : undefined}
                    autoComplete={
                      pergunta.id === 'nome' ? 'name' : pergunta.id === 'email' ? 'email' : pergunta.id === 'telefone' ? 'tel' : 'organization'
                    }
                    placeholder={pergunta.placeholder}
                    value={respostas[pergunta.id]}
                    onChange={(e) =>
                      responder(pergunta.id, pergunta.id === 'telefone' ? formatarTelefone(e.target.value) : e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        avancar();
                      }
                    }}
                    className="mt-7 w-full border-0 border-b-2 border-black bg-transparent py-3 text-[22px] text-black outline-none transition-[border-color,box-shadow] placeholder:text-gray focus:border-cyan focus:shadow-[0_12px_18px_-12px_#01BBFB] focus-visible:outline-none md:text-[28px]"
                  />
                  <div className="mt-7 flex items-center gap-4">
                    <button type="button" onClick={avancar} className={btnPrincipal}>
                      {t.ok}
                    </button>
                    <span className="hidden text-[13px] md:inline">{t.dicaEnter}</span>
                  </div>
                </>
              )}

              {pergunta.tipo === 'opcoes' && (
                <div role="group" aria-labelledby="pergunta-titulo" className={cn('mt-6 grid gap-2.5', pergunta.opcoes.length > 4 && 'md:grid-cols-2')}>
                  {pergunta.opcoes.map((opcao, i) => {
                    const selecionada = respostas[pergunta.id] === opcao;
                    return (
                      <button
                        key={opcao}
                        type="button"
                        aria-pressed={selecionada}
                        onClick={() => escolherOpcao(pergunta.id, opcao)}
                        style={{ '--i': i } as React.CSSProperties}
                        className={cn(
                          'animate-item flex items-center gap-3.5 rounded-[18px] border-2 border-black px-4 py-3.5 text-left text-[16px] transition duration-200 active:scale-[0.98] md:text-[17px]',
                          selecionada
                            ? 'scale-[1.015] bg-cyan shadow-[0_0_22px_rgba(1,187,251,.6)]'
                            : 'bg-paper hover:border-cyan hover:shadow-[0_0_16px_rgba(1,187,251,.35)]',
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            'grid size-7 shrink-0 place-items-center rounded-[8px] border font-display text-[13px] font-black',
                            selecionada ? 'border-black bg-black text-cyan' : 'border-black text-black',
                          )}
                        >
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opcao}
                      </button>
                    );
                  })}
                </div>
              )}

              {pergunta.tipo === 'horario' && (
                <>
                  <div role="group" aria-label="Dia da reunião" className="mt-7 flex flex-wrap gap-2">
                    {diasReuniao.map(({ dia, nome }) => (
                      <Chip key={dia} ativo={respostas.dia === String(dia)} onClick={() => responder('dia', String(dia))}>
                        {nome}
                      </Chip>
                    ))}
                  </div>
                  {respostas.dia && (
                    <div role="group" aria-label="Horário da reunião" className="mt-4 flex flex-wrap gap-2">
                      {horariosReuniao.map((hora) => (
                        <Chip key={hora} ativo={respostas.horario === hora} onClick={() => responder('horario', hora)}>
                          {hora}
                        </Chip>
                      ))}
                    </div>
                  )}
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                    <button
                      type="button"
                      onClick={avancar}
                      disabled={enviando || !(respostas.dia && respostas.horario)}
                      className={btnPrincipal}
                    >
                      {enviando ? t.enviando : t.enviar}
                    </button>
                    <button
                      type="button"
                      disabled={enviando}
                      onClick={() => void enviar({ ...respostas, dia: '', horario: '' })}
                      className="text-[15px] font-medium underline decoration-gray underline-offset-4 transition-colors hover:decoration-cyan disabled:opacity-40"
                    >
                      {t.pular}
                    </button>
                  </div>
                </>
              )}

              {erro && (
                <p id="erro-aplicacao" role="alert" className="mt-5 flex items-center gap-2.5 text-[15px] font-medium text-black">
                  <span aria-hidden="true" className="inline-block h-[3px] w-4 bg-cyan" />
                  {erro}
                </p>
              )}
            </div>
          )}

          {/* Obrigado: a luz acende, o primeiro passo vira feito e a reunião aparece em destaque */}
          {etapa === total && (
            <div className="relative text-center">
              <div
                aria-hidden="true"
                className="luz-acende pointer-events-none absolute -top-16 left-1/2 -z-10 size-64 rounded-full bg-cyan blur-3xl md:size-80"
              />
              <h1 ref={tituloRef} tabIndex={-1} className="display text-[30px] outline-none md:text-[52px]">
                {t.fim.titulo} <Accent>{primeiroNome}</Accent>
              </h1>
              <p className="mx-auto mt-4 max-w-[540px] text-[16px] leading-[1.5] md:text-[18px]">
                {dataReuniao ? t.fim.recebido : t.fim.semReuniao}
              </p>

              {dataReuniao && (
                <div className="mx-auto mt-5 max-w-[440px] rounded-[24px] border-2 border-black bg-paper px-5 py-4 shadow-[0_0_26px_rgba(1,187,251,.45)]">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.08em]">{t.fim.reuniaoRotulo}</p>
                  <p className="display mt-1.5 text-[20px] md:text-[24px]">
                    {dataPorExtenso(dataReuniao)}, às {respostas.horario}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-snug">{t.fim.resumoReuniao}</p>
                </div>
              )}

              <p className="mt-7 text-[13px] font-semibold uppercase tracking-[0.08em]">{t.fim.proximos}</p>
              <ol className="relative mx-auto mt-3 grid max-w-[420px] grid-cols-3 gap-2">
                <span aria-hidden="true" className="absolute left-[16.6%] right-[16.6%] top-[18px] h-[3px] bg-black" />
                {copy.aplicacao.passos.map((passo, i) => (
                  <li key={passo} className="relative flex flex-col items-center gap-2 text-center">
                    <span
                      className={cn(
                        'grid size-9 place-items-center rounded-full border-2 border-black font-display text-[14px] font-black text-black',
                        i === 0 ? 'bg-cyan shadow-[0_0_14px_rgba(1,187,251,.8)]' : 'bg-paper',
                      )}
                    >
                      {i === 0 ? (
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span className="text-[12.5px] font-semibold leading-tight">{passo}</span>
                  </li>
                ))}
              </ol>

              <Link href="/" className={cn(btnPrincipal, 'mt-8')}>
                {t.fim.voltarSite}
              </Link>
            </div>
          )}

          <input
            aria-hidden="true"
            tabIndex={-1}
            autoComplete="off"
            value={armadilha}
            onChange={(e) => setArmadilha(e.target.value)}
            className="absolute -left-[9999px] size-0 opacity-0"
          />
        </div>
      </div>

      {pergunta && (
        <nav className="flex justify-center pb-8">
          <button
            type="button"
            onClick={() => {
              setErro('');
              ir(Math.max(-1, etapa - 1));
            }}
            className="text-[14px] font-medium underline-offset-4 hover:underline"
          >
            {t.voltar}
          </button>
        </nav>
      )}
    </main>
  );
}

function Chip({ ativo, onClick, children }: { ativo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={ativo}
      onClick={onClick}
      className={cn(
        'rounded-full border-2 border-black px-4 py-2.5 text-[14px] font-medium transition duration-200 active:scale-[0.97] md:text-[15px]',
        ativo ? 'bg-cyan shadow-[0_0_16px_rgba(1,187,251,.55)]' : 'bg-paper hover:border-cyan',
      )}
    >
      {children}
    </button>
  );
}
