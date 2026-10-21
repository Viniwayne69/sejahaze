/**
 * Envio das aplicações do formulário /aplicar.
 *
 * AINDA NÃO ESTÁ LIGADO A NENHUM CRM: `enviarAplicacao` só confirma o envio para a tela
 * de agradecimento, as respostas não são salvas. Não divulgue a página antes de ligar o CRM.
 *
 * Para ligar: implemente `enviarAplicacao` (gravar o lead) e `buscarHorariosOcupados`
 * (para não agendar dois leads no mesmo dia e horário). O resto do formulário não muda.
 */

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

/** Grava a aplicação no CRM. TODO: ligar ao CRM. */
export async function enviarAplicacao(aplicacao: Aplicacao): Promise<void> {
  if (process.env.NODE_ENV === 'development') {
    console.info('[aplicacao] CRM ainda não ligado, aplicação não foi salva:', aplicacao);
  }
}

/** Datas e horários já ocupados, no formato "AAAA-MM-DD|HH:MM". TODO: buscar no CRM. */
export async function buscarHorariosOcupados(): Promise<Set<string>> {
  return new Set();
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
