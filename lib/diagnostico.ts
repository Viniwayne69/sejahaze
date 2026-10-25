/**
 * Leitura rápida das dores, calculada só pelas respostas (sem IA): cada opção das perguntas de dor vale
 * 0, 1 ou 2 pontos (definidos em `pontos` no conteúdo). A soma (0 a 14) vira a nota de 1 a 10 de desejo pela marca (quanto menos dificuldade, mais desejo),
 * e a soma por área (duas perguntas cada) mostra qual área está mais fraca.
 */

import { areas, camposDeDor, perfis, perguntas, prioridadeAreas, type AreaId } from '@/content/aplicacao';
import type { RespostasAplicacao } from './aplicacao';

export type Diagnostico = {
  /** Soma dos pontos de dificuldade (0 a 14). */
  pontos: number;
  /** Nota de desejo pela marca, de 1 a 10: 1 é pouco desejada, 10 é muito desejada. */
  nota: number;
  perfil: (typeof perfis)[number];
  /** Pontos de dificuldade por área (Desejo vai de 0 a 4, as outras de 0 a 2). */
  porArea: Record<AreaId, number>;
  /** Área com mais pontos (a que mais trava), ou null se nenhuma pontuou. */
  fraco: AreaId | null;
  /** Os problemas mais graves (resposta de 2 pontos), em poucas palavras, para o resumo da equipe. */
  graves: string[];
};

function pontosDe(id: (typeof camposDeDor)[number], resposta: string) {
  const pergunta = perguntas.find((p) => p.id === id);
  if (!pergunta || pergunta.tipo !== 'opcoes') return 0;
  const indice = pergunta.opcoes.indexOf(resposta);
  if (indice < 0) return 0;
  return pergunta.pontos?.[indice] ?? Math.min(indice, 2);
}

export function calcularDiagnostico(r: RespostasAplicacao): Diagnostico {
  const pontos = camposDeDor.reduce((soma, id) => soma + pontosDe(id, r[id]), 0);
  const perfil = perfis.find((p) => pontos <= p.ate) ?? perfis[perfis.length - 1];
  const maximo = camposDeDor.length * 2;

  const porArea = Object.fromEntries(
    areas.map((a) => [a.id, a.campos.reduce((soma, id) => soma + pontosDe(id, r[id]), 0)]),
  ) as Record<AreaId, number>;

  // A área mais fraca é a de maior proporção de pontos; em empate vale a ordem de prioridade
  let fraco: AreaId | null = null;
  let melhor = 0;
  for (const id of prioridadeAreas) {
    const area = areas.find((a) => a.id === id)!;
    const proporcao = porArea[id] / (area.campos.length * 2);
    if (proporcao > melhor) {
      melhor = proporcao;
      fraco = id;
    }
  }

  const graves = camposDeDor.flatMap((id) => {
    const p = perguntas.find((q) => q.id === id);
    return p && p.tipo === 'opcoes' && p.dor && pontosDe(id, r[id]) === 2 ? [p.dor] : [];
  });

  return { pontos, nota: Math.round(1 + ((maximo - pontos) / maximo) * 9), perfil, porArea, fraco, graves };
}
