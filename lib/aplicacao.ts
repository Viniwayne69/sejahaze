/**
 * Envio das aplicações do formulário /aplicar para o CRM da HAZE.
 *
 * Cada aplicação vira um negócio na tabela `negocios` do Supabase do CRM (estágio "Lead novo",
 * ou "Agendado" se a pessoa escolheu dia e horário), no mesmo formato que o próprio CRM grava.
 * A comunicação é feita direto pela API REST do Supabase, sem biblioteca extra.
 */

import { SUPABASE_KEY, SUPABASE_URL } from '@/config';

export type RespostasAplicacao = {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
  faturamento: string;
  setor: string;
  /** Dia da semana escolhido (1 = segunda ... 5 = sexta), vazio se pulou. */
  dia: string;
  /** Horário escolhido (ex.: "10:00"), vazio se pulou. */
  horario: string;
};

export type Aplicacao = RespostasAplicacao & {
  /** Data da reunião calculada (AAAA-MM-DD), vazia se pulou o agendamento. */
  dataReuniao: string;
  origem: 'formulario-aplicar';
  enviadoEm: string;
};

const TABELA = `${SUPABASE_URL}/rest/v1/negocios`;
const cabecalhos = { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' };

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

/** Data curta no formato do CRM ("21 out"). */
function dataCurta(data = new Date()) {
  return `${String(data.getDate()).padStart(2, '0')} ${MESES[data.getMonth()]}`;
}

/** Grava a aplicação no CRM. Lança erro se o CRM não aceitar, para o formulário avisar a pessoa. */
export async function enviarAplicacao(aplicacao: Aplicacao): Promise<void> {
  const id = `n${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
  const agendada = Boolean(aplicacao.dataReuniao && aplicacao.horario);

  const resposta = await fetch(TABELA, {
    method: 'POST',
    headers: { ...cabecalhos, Prefer: 'return=minimal' },
    signal: AbortSignal.timeout(15000),
    body: JSON.stringify({
      id,
      nome: aplicacao.empresa,
      faturamento: aplicacao.faturamento,
      estagio: agendada ? 'agendado' : 'lead',
      contato_nome: aplicacao.nome,
      contato_cargo: aplicacao.cargo,
      contato_email: aplicacao.email,
      contato_telefone: aplicacao.telefone,
      setor: aplicacao.setor,
      funcionarios: '',
      data_reuniao: agendada ? aplicacao.dataReuniao : null,
      hora_reuniao: agendada ? aplicacao.horario : null,
      nota: 'Lead via formulário HAZE /aplicar',
      data_label: dataCurta(),
    }),
  });

  if (!resposta.ok) throw new Error(`CRM recusou a aplicação (${resposta.status})`);
  if (process.env.NODE_ENV === 'development') console.info('[aplicacao] lead gravado no CRM:', id);
}

/** Datas e horários já ocupados no CRM, no formato "AAAA-MM-DD|HH:MM". Se falhar, não bloqueia o formulário. */
export async function buscarHorariosOcupados(): Promise<Set<string>> {
  try {
    const hoje = paraISO(new Date());
    const resposta = await fetch(`${TABELA}?select=data_reuniao,hora_reuniao&data_reuniao=gte.${hoje}`, {
      headers: cabecalhos,
      signal: AbortSignal.timeout(8000),
    });
    if (!resposta.ok) return new Set();
    const linhas: Array<{ data_reuniao: string | null; hora_reuniao: string | null }> = await resposta.json();
    return new Set(
      linhas
        .filter((l) => l.data_reuniao && l.hora_reuniao)
        .map((l) => `${l.data_reuniao}|${String(l.hora_reuniao).slice(0, 5)}`),
    );
  } catch {
    return new Set();
  }
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

function paraISO(data: Date) {
  const m = String(data.getMonth() + 1).padStart(2, '0');
  const d = String(data.getDate()).padStart(2, '0');
  return `${data.getFullYear()}-${m}-${d}`;
}

/** Próxima data (a partir de amanhã) no dia da semana escolhido, pulando horários ocupados. */
export function proximaDataReuniao(diaSemana: number, horario: string, ocupados: Set<string>) {
  const data = new Date();
  data.setHours(0, 0, 0, 0);
  data.setDate(data.getDate() + 1);
  for (let i = 0; i < 120; i++) {
    if (data.getDay() === diaSemana && !ocupados.has(`${paraISO(data)}|${horario}`)) break;
    data.setDate(data.getDate() + 1);
  }
  return paraISO(data);
}

/** "2026-10-27" -> "terça-feira, 27 de outubro". */
export function dataPorExtenso(iso: string) {
  const [ano, mes, dia] = iso.split('-').map(Number);
  return new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
}
