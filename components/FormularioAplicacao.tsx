'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { WHATSAPP_NUMBER } from '@/config';
import { copy } from '@/content/copy';
import { areas, perguntas, textosAplicacao as t, titulosComNome, type Pergunta } from '@/content/aplicacao';
import { apenasDigitos, enviarAplicacao, formatarTelefone, type RespostasAplicacao } from '@/lib/aplicacao';
import { calcularDiagnostico } from '@/lib/diagnostico';
import Logo from './Logo';
import SomAmbiente from './SomAmbiente';
import { Accent, cn, textureProps } from './ui';

const vazio = Object.fromEntries(perguntas.map((p) => [p.id, ""])) as RespostasAplicacao;

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
  const valor = respostas[pergunta.id].trim();
  if (!valor) return t.erros.obrigatoria;
  if (pergunta.id === 'nome' && valor.length < 2) return t.erros.nome;
  if (pergunta.id === 'telefone' && ![10, 11].includes(apenasDigitos(valor).length)) return t.erros.telefone;
  return '';
}

export default function FormularioAplicacao() {
  const [etapa, setEtapa] = useState(-1); // -1 boas-vindas, 0..total-1 perguntas, total = resultado
  const [direcao, setDirecao] = useState<'frente' | 'tras'>('frente');
  const [respostas, setRespostas] = useState<RespostasAplicacao>(vazio);
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [calculando, setCalculando] = useState(false); // pausa curta de expectativa antes do resultado
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

  // Ao ver o resultado, uma vibração de comemoração
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

  // O lead é gravado aqui, antes do resultado: mesmo que a pessoa feche a tela, o contato e as respostas ficam no CRM
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
        const { perfil, nota, porArea, graves } = calcularDiagnostico(dados);
        const resumo = [
          `Diagnóstico HAZE: ${perfil.titulo} (dificuldade ${nota}/10)`,
          `Dor por área (0 a 4): ${areas.map((a) => `${a.rotulo} ${porArea[a.id]}`).join(', ')}`,
          `Maior desafio: ${dados.trava}`,
          `Faturamento: ${dados.faturamento}`,
          graves.length ? `Mais graves: ${graves.slice(0, 5).join('; ')}` : '',
          `Começar por: ${copy.metodo.steps[0].title}`,
        ]
          .filter(Boolean)
          .join(' | ');
        await enviarAplicacao({
          ...dados,
          nome: dados.nome.trim().split(/\s+/).map(capitalizar).join(' '),
          empresa: dados.empresa.trim(),
          telefone: dados.telefone.trim(),
          resumo,
        });
        setDirecao('frente');
        setCalculando(true);
        setEtapa(total);
        setTimeout(() => setCalculando(false), 3000);
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
  const resultado = etapa === total && !calculando ? calcularDiagnostico(respostas) : null;
  // Sem o número da HAZE configurado, o link abre o WhatsApp só com a mensagem pronta (a pessoa escolhe o contato)
  const linkWhatsapp = resultado
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        t.resultado.whatsappMensagem(primeiroNome, respostas.empresa.trim(), resultado.nota, respostas.trava, respostas.faturamento),
      )}`
    : '';

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

      <header className="flex flex-col items-center px-[22px] pt-7 md:pt-10">
        <Link href="/" aria-label="HAZE, voltar ao site">
          <Logo tone="dark" size="sm" />
        </Link>
        <SomAmbiente src={t.som.arquivo} rotulo={t.som.rotulo} />
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
                {t.boasVindas.antes} <Accent>{t.boasVindas.destaque}</Accent> {t.boasVindas.depois}
              </h1>
              {t.boasVindas.paragrafos.map((p) => (
                <p key={p} className="mx-auto mt-3 max-w-[540px] text-[15px] leading-[1.45] md:mt-4 md:text-[19px]">
                  {p}
                </p>
              ))}
              <button type="button" onClick={() => ir(0)} className={cn(btnPrincipal, 'mt-6 w-full md:mt-8 md:w-auto md:min-w-[300px]')}>
                {t.boasVindas.botao}
              </button>
              <ul className="mx-auto mt-5 grid max-w-[340px] gap-2 text-left text-[14px] leading-snug md:text-[15px]">
                {t.boasVindas.recebe.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-[0.55em] inline-block h-[3px] w-4 shrink-0 bg-cyan" />
                    {item}
                  </li>
                ))}
              </ul>
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
                className="mt-3 text-[26px] font-bold leading-[1.18] tracking-[-0.015em] outline-none md:text-[38px]"
              >
                {tituloDaPergunta}
              </h1>
              {pergunta.ajuda && <p className="mt-3 text-[15px] leading-snug md:text-[17px]">{pergunta.ajuda}</p>}

              {(pergunta.tipo === 'texto' || pergunta.tipo === 'tel') && (
                <>
                  <input
                    ref={inputRef}
                    aria-labelledby="pergunta-titulo"
                    aria-invalid={Boolean(erro)}
                    aria-describedby={erro ? 'erro-aplicacao' : undefined}
                    type={pergunta.tipo === 'texto' ? 'text' : 'tel'}
                    inputMode={pergunta.tipo === 'tel' ? 'tel' : undefined}
                    autoComplete={pergunta.id === 'nome' ? 'given-name' : pergunta.id === 'telefone' ? 'tel' : 'organization'}
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
                    <button type="button" onClick={avancar} disabled={enviando} className={btnPrincipal}>
                      {pergunta.id === 'telefone' ? (enviando ? t.enviando : t.ver) : t.ok}
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

              {erro && (
                <p id="erro-aplicacao" role="alert" className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[15px] font-medium text-black">
                  <span aria-hidden="true" className="inline-block h-[3px] w-4 bg-cyan" />
                  {erro}
                </p>
              )}
            </div>
          )}

          {/* Antecipação: as barras acendem uma a uma enquanto o resultado "carrega" */}
          {etapa === total && calculando && (
            <div className="text-center" role="status">
              <p className="display text-[22px] md:text-[30px]">{t.resultado.calculando}</p>
              <div className="mx-auto mt-5 flex max-w-[340px] gap-1" aria-hidden="true">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    style={{ animationDelay: `${i * 250}ms` }}
                    className="animate-item h-2 flex-1 rounded-full border border-black bg-cyan shadow-[0_0_8px_rgba(1,187,251,.8)]"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Resultado minimalista: o perfil, onde a marca está de 1 a 10 e o WhatsApp */}
          {resultado && (
            <div className="relative">
              <div
                aria-hidden="true"
                className="luz-acende pointer-events-none absolute -top-16 left-1/2 -z-10 size-64 rounded-full bg-cyan blur-3xl md:size-80"
              />
              <p className="text-center text-[12px] font-semibold uppercase tracking-[0.08em]">
                {primeiroNome}, {t.resultado.rotulo}
              </p>
              <h1 ref={tituloRef} tabIndex={-1} className="display mt-2 text-center text-[30px] outline-none md:text-[48px]">
                {resultado.perfil.titulo.split(' ').slice(0, -1).join(' ')}{' '}
                <Accent>{resultado.perfil.titulo.split(' ').slice(-1)[0]}</Accent>
              </h1>

              {/* Medidor de 1 a 10: quantas barras estão acesas é a nota da marca (processo, desconto e diferença) */}
              {resultado.perfil.texto && (
                <p className="mx-auto mt-4 max-w-[440px] text-center text-[16px] leading-snug md:text-[18px]">{resultado.perfil.texto}</p>
              )}

              <div className="mx-auto mt-6 max-w-[340px]" role="img" aria-label={`${t.resultado.medidorTitulo}: ${t.resultado.pontuacao(resultado.nota)}`}>
                <p className="flex items-baseline justify-between gap-3 text-[12px] font-semibold uppercase tracking-[0.08em]">
                  <span>{t.resultado.medidorTitulo}</span>
                  <span className="font-display text-[14px] font-black tracking-normal">{t.resultado.pontuacao(resultado.nota)}</span>
                </p>
                <div className="mt-2 flex gap-1" aria-hidden="true">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className={cn('h-2 flex-1 rounded-full border border-black', i < resultado.nota ? 'bg-cyan shadow-[0_0_8px_rgba(1,187,251,.8)]' : 'bg-transparent')} />
                  ))}
                </div>
                <p className="mt-1.5 flex justify-between text-[11px] font-medium" aria-hidden="true">
                  <span>{t.resultado.medidorExtremos[0]}</span>
                  <span>{t.resultado.medidorExtremos[1]}</span>
                </p>
              </div>

              {/* O que a pessoa foi buscar: o ponto mais fraco e o primeiro passo */}
              <div className="mx-auto mt-6 grid max-w-[360px] gap-2.5 text-left text-[15px] leading-snug">
                {resultado.fraco && (
                  <p>
                    <span className="font-semibold uppercase tracking-[0.08em] text-[12px]">{t.resultado.pontoFraco}: </span>
                    {areas.find((a) => a.id === resultado.fraco)?.fraco}
                  </p>
                )}
                <p>
                  <span className="font-semibold uppercase tracking-[0.08em] text-[12px]">{t.resultado.primeiroPasso}: </span>
                  {t.resultado.primeiroPassoTexto}
                </p>
              </div>

              <div className="mt-7 text-center">
                <a href={linkWhatsapp} target="_blank" rel="noopener noreferrer" className={cn(btnPrincipal, 'w-full md:w-auto md:min-w-[340px]')}>
                  {t.resultado.whatsappBotao}
                </a>
                <Link href="/" className="mt-3 inline-block text-[14px] font-medium underline underline-offset-4">
                  {t.resultado.voltarSite}
                </Link>
              </div>
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
