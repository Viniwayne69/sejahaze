/**
 * Envio das aplicações do formulário /aplicar para o CRM da HAZE.
 *
 * Cada diagnóstico vira um negócio na tabela `negocios` do Supabase do CRM (estágio "Lead novo"),
 * no mesmo formato que o próprio CRM grava, com o resumo das respostas na observação.
 * A comunicação é feita direto pela API REST do Supabase, sem biblioteca extra.
 */

import { SUPABASE_KEY, SUPABASE_URL } from '@/config';

export type RespostasAplicacao = {
  nome: string;
  empresa: string;
  folga: string;
  preco: string;
  diferenca: string;
  procura: string;
  trava: string;
  faturamento: string;
  telefone: string;
};

export type Aplicacao = RespostasAplicacao & {
  /** Resumo do diagnóstico, gravado na observação do negócio (o banco aceita até 500 caracteres). */
  resumo: string;
};

const TABELA = `${SUPABASE_URL}/rest/v1/negocios`;
const cabecalhos = { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' };

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

/** Data curta no formato do CRM ("21 out"). */
function dataCurta(data = new Date()) {
  return `${String(data.getDate()).padStart(2, '0')} ${MESES[data.getMonth()]}`;
}

/** Grava o diagnóstico no CRM. Lança erro se o CRM não aceitar, para o formulário avisar a pessoa. */
export async function enviarAplicacao(aplicacao: Aplicacao): Promise<void> {
  const id = `n${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;

  const resposta = await fetch(TABELA, {
    method: 'POST',
    headers: { ...cabecalhos, Prefer: 'return=minimal' },
    signal: AbortSignal.timeout(15000),
    body: JSON.stringify({
      id,
      nome: aplicacao.empresa,
      faturamento: aplicacao.faturamento,
      estagio: 'lead',
      contato_nome: aplicacao.nome,
      contato_cargo: '',
      contato_email: '',
      contato_telefone: aplicacao.telefone,
      setor: '',
      funcionarios: '',
      data_reuniao: null,
      hora_reuniao: null,
      nota: aplicacao.resumo.slice(0, 500),
      data_label: dataCurta(),
    }),
  });

  if (!resposta.ok) throw new Error(`CRM recusou o diagnóstico (${resposta.status})`);
  if (process.env.NODE_ENV === 'development') console.info('[diagnostico] lead gravado no CRM:', id);
}

export function apenasDigitos(valor: string) {
  return valor.replace(/\D/g, '');
}

/** Máscara de WhatsApp brasileiro: (11) 99999-9999 ou (11) 9999-9999. */
export function formatarTelefone(valor: string) {
  let d = apenasDigitos(valor);
  if (d.startsWith('55') && d.length > 11) d = d.slice(2);
  d = d.slice(0, 11);
  if (!d) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
