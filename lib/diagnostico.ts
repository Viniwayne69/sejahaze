/**
 * Leitura rápida da marca, calculada só pelas respostas (sem IA): três perguntas valem pontos
 * (a primeira opção vale 2, a segunda 1, a terceira 0), a soma vai de 0 a 6 e define o perfil.
 */

import { atencao, perfis, perguntas, textosAplicacao as t } from '@/content/aplicacao';
import type { RespostasAplicacao } from './aplicacao';

const pontuaveis = ['processo', 'desconto', 'diferenca'] as const;

export type Diagnostico = {
  pontos: number;
  /** Pontuação convertida para a escala de 1 a 10 (0 pontos = 1, 6 pontos = 10). */
  nota: number;
  perfil: (typeof perfis)[number];
  /** Até 3 pontos de atenção, dos mais críticos para os menos. */
  alertas: string[];
  /** Índice da etapa do método para começar: sempre 0 (Raio-X), seja qual for o resultado. */
  etapa: 0;
};

function pontosDe(id: (typeof pontuaveis)[number], resposta: string) {
  const pergunta = perguntas.find((p) => p.id === id);
  const indice = pergunta && pergunta.tipo === 'opcoes' ? pergunta.opcoes.indexOf(resposta) : -1;
  return indice < 0 ? 0 : Math.max(0, 2 - indice);
}

export function calcularDiagnostico(r: RespostasAplicacao): Diagnostico {
  const por = pontuaveis.map((id) => ({ id, pontos: pontosDe(id, r[id]) }));
  const pontos = por.reduce((soma, p) => soma + p.pontos, 0);
  const perfil = perfis.find((p) => pontos <= p.ate) ?? perfis[perfis.length - 1];

  const alertas: string[] = por
    .filter((p) => p.pontos < 2)
    .sort((a, b) => a.pontos - b.pontos)
    .map((p) => atencao[p.id][p.pontos]);
  if (alertas.length < 3 && r.trava && r.trava !== 'Não sei') alertas.push(t.resultado.atencaoTrava(r.trava));
  if (!alertas.length) alertas.push(t.resultado.atencaoOk);

  return { pontos, nota: Math.round(1 + pontos * 1.5), perfil, alertas: alertas.slice(0, 3), etapa: 0 };
}
