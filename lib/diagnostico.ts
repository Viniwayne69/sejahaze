/**
 * Leitura rápida das dores, calculada só pelas respostas (sem IA): cada pergunta de dor vale 0, 1 ou 2 pontos
 * (a primeira opção vale 0, a terceira 2). A soma (0 a 24) vira a nota de 1 a 10 de dificuldade hoje,
 * e a soma por área (duas perguntas cada) mostra qual área está mais fraca.
 */

import { areas, camposDeDor, perfis, perguntas, prioridadeAreas, type AreaId } from '@/content/aplicacao';
import type { RespostasAplicacao } from './aplicacao';

export type Diagnostico = {
  /** Soma dos pontos de dificuldade (0 a 24). */
  pontos: number;
  /** Nota de 1 a 10: 1 é tranquilo, 10 é crítico. */
  nota: number;
  perfil: (typeof perfis)[number];
  /** Pontos de dificuldade por área (0 a 4). */
  porArea: Record<AreaId, number>;
  /** Área com mais pontos (a que mais trava), ou null se nenhuma pontuou. */
  fraco: AreaId | null;
  /** Os problemas mais graves (resposta de 2 pontos), em poucas palavras, para o resumo da equipe. */
  graves: string[];
};

function pontosDe(id: (typeof camposDeDor)[number], resposta: string) {
  const pergunta = perguntas.find((p) => p.id === id);
  const indice = pergunta && pergunta.tipo === 'opcoes' ? pergunta.opcoes.indexOf(resposta) : -1;
  return Math.max(0, indice);
}

export function calcularDiagnostico(r: RespostasAplicacao): Diagnostico {
  const pontos = camposDeDor.reduce((soma, id) => soma + pontosDe(id, r[id]), 0);
  const perfil = perfis.find((p) => pontos <= p.ate) ?? perfis[perfis.length - 1];
  const maximo = camposDeDor.length * 2;

  const porArea = Object.fromEntries(
    areas.map((a) => [a.id, a.campos.reduce((soma, id) => soma + pontosDe(id, r[id]), 0)]),
  ) as Record<AreaId, number>;

  let fraco: AreaId | null = null;
  let melhor = 0;
  for (const id of prioridadeAreas) {
    if (porArea[id] > melhor) {
      melhor = porArea[id];
      fraco = id;
    }
  }

  const graves = camposDeDor.flatMap((id) => {
    const p = perguntas.find((q) => q.id === id);
    return p && p.tipo === 'opcoes' && p.dor && pontosDe(id, r[id]) === 2 ? [p.dor] : [];
  });

  return { pontos, nota: Math.round(1 + (pontos / maximo) * 9), perfil, porArea, fraco, graves };
}
