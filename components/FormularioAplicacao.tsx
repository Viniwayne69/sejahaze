'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { diasReuniao, horariosReuniao, perguntas, textosAplicacao as t, type Pergunta } from '@/content/aplicacao';
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

const btnPrincipal =
  'inline-flex min-h-[52px] items-center justify-center rounded-full bg-cyan px-8 text-[16px] font-semibold text-black transition hover:brightness-[.93] disabled:cursor-not-allowed disabled:opacity-40';

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
  const [respostas, setRespostas] = useState<RespostasAplicacao>(vazio);
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [dataReuniao, setDataReuniao] = useState('');
  const [armadilha, setArmadilha] = useState(''); // campo escondido contra robôs
  const inputRef = useRef<HTMLInputElement>(null);
  const tituloRef = useRef<HTMLHeadingElement>(null);

  const pergunta = etapa >= 0 && etapa < total ? perguntas[etapa] : null;
  const progresso = etapa < 0 ? 0 : Math.min(100, Math.round((etapa / total) * 100));

  // Leva o foco para o campo (ou para o título) a cada nova etapa
  useEffect(() => {
    if (etapa < 0) return;
    if (inputRef.current) inputRef.current.focus();
    else tituloRef.current?.focus();
  }, [etapa]);

  const responder = (campo: keyof RespostasAplicacao, valor: string) => {
    setErro('');
    setRespostas((r) => ({ ...r, [campo]: valor }));
  };

  const enviar = useCallback(
    async (dados: RespostasAplicacao) => {
      if (armadilha) {
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
    if (etapa === total - 1) void enviar(respostas);
    else {
      setErro('');
      setEtapa(etapa + 1);
    }
  };

  // Escolher uma opção marca e avança sozinho, como na referência
  const escolherOpcao = useCallback((campo: keyof RespostasAplicacao, opcao: string) => {
    setErro('');
    setRespostas((r) => ({ ...r, [campo]: opcao }));
    setTimeout(() => setEtapa((e) => e + 1), 220);
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
  const primeiroNome = respostas.nome.trim().split(/\s+/)[0] ?? '';

  return (
    // No celular a textura fica um pouco mais larga que a tela, para só um toque da névoa azul aparecer nas laterais
    <main
      className={cn('relative flex min-h-dvh flex-col bg-[length:108%_100%] md:bg-cover', bg.className)}
      style={bg.style}
    >
      {/* Barra de progresso */}
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-10 h-[3px] bg-gray">
        <div className="h-full bg-cyan transition-[width] duration-500 ease-out" style={{ width: `${progresso}%` }} />
      </div>

      <header className="flex justify-center px-[22px] pt-7 md:pt-10">
        <Link href="/" aria-label="HAZE, voltar ao site">
          <Logo tone="dark" size="sm" />
        </Link>
      </header>

      <div className="flex flex-1 items-center px-[22px] py-10 md:py-16">
        <div key={etapa} className="animate-etapa mx-auto w-full max-w-[680px]">
          {/* Boas-vindas */}
          {etapa === -1 && (
            <div className="text-center">
              {/* Título só para leitores de tela: a abertura mostra apenas o texto e o botão */}
              <h1 className="sr-only">{t.boasVindas.tituloAcessivel}</h1>
              {t.boasVindas.paragrafos.map((p) => (
                <p key={p} className="mx-auto max-w-[540px] text-[17px] leading-[1.45] md:text-[20px]">
                  {p}
                </p>
              ))}
              <button type="button" onClick={() => setEtapa(0)} className={cn(btnPrincipal, 'mt-8 w-full md:w-auto md:min-w-[300px]')}>
                {t.boasVindas.botao}
              </button>
            </div>
          )}

          {/* Pergunta */}
          {pergunta && (
            <div>
              <p className="font-display text-[15px] font-black md:text-[17px]">
                {doisDigitos(etapa + 1)} <span className="text-gray">{t.de} {doisDigitos(total)}</span>
              </p>
              <h1
                ref={tituloRef}
                id="pergunta-titulo"
                tabIndex={-1}
                className="display mt-3 text-[24px] outline-none md:text-[38px]"
              >
                {pergunta.titulo}
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
                    className="mt-7 w-full border-0 border-b-2 border-black bg-transparent py-3 text-[22px] text-black outline-none transition-colors placeholder:text-gray focus:border-cyan focus-visible:outline-none md:text-[28px]"
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
                <div role="group" aria-labelledby="pergunta-titulo" className="mt-7 grid gap-2.5">
                  {pergunta.opcoes.map((opcao, i) => {
                    const selecionada = respostas[pergunta.id] === opcao;
                    return (
                      <button
                        key={opcao}
                        type="button"
                        aria-pressed={selecionada}
                        onClick={() => escolherOpcao(pergunta.id, opcao)}
                        className={cn(
                          'flex items-center gap-3.5 rounded-[18px] border-2 border-black px-4 py-3.5 text-left text-[16px] transition-colors md:text-[17px]',
                          selecionada ? 'bg-cyan' : 'bg-paper hover:border-cyan',
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

          {/* Obrigado */}
          {etapa === total && (
            <div className="text-center">
              <h1 ref={tituloRef} tabIndex={-1} className="display text-[30px] outline-none md:text-[52px]">
                {t.fim.titulo} <Accent>{primeiroNome}</Accent>
              </h1>
              <p className="mx-auto mt-5 max-w-[540px] text-[16px] leading-[1.5] md:text-[18px]">
                {dataReuniao ? t.fim.comReuniao(dataPorExtenso(dataReuniao), respostas.horario) : t.fim.semReuniao}
              </p>
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
              setEtapa((e) => Math.max(-1, e - 1));
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
        'rounded-full border-2 border-black px-4 py-2.5 text-[14px] font-medium transition-colors md:text-[15px]',
        ativo ? 'bg-cyan' : 'bg-paper hover:border-cyan',
      )}
    >
      {children}
    </button>
  );
}
