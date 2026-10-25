/**
 * Leitura rápida das dores, calculada só pelas respostas (sem IA): cada opção das perguntas de dor vale
 * 0, 1 ou 2 pontos (definidos em `pontos` no conteúdo). A soma (0 a 22) vira a nota de 1 a 10 de desejo pela marca (quanto menos dificuldade, mais desejo),
 * e a soma por área (duas perguntas cada) mostra qual área está mais fraca.
 */

import { areas, camposDeDor, padroes, perfis, perguntas, prioridadeAreas, type AreaId } from '@/content/aplicacao';
import type { RespostasAplicacao } from './aplicacao';

export type Diagnostico = {
  /** Soma dos pontos de dificuldade (0 a 22). */
  pontos: number;
  /** Nota de desejo pela marca, de 1 a 10: 1 é pouco desejada, 10 é muito desejada. */
  nota: number;
  /** Título e texto do resultado: o padrão que combina duas áreas, ou o perfil pelos pontos. */
  perfil: { titulo: string; texto: string };
  /** Pontos de dificuldade por área (cinco áreas vão de 0 a 4 e Dinheiro de 0 a 2). */
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
  const maximo = camposDeDor.length * 2;

  const porArea = Object.fromEntries(
    areas.map((a) => [a.id, a.campos.reduce((soma, id) => soma + pontosDe(id, r[id]), 0)]),
  ) as Record<AreaId, number>;

  const proporcoes = Object.fromEntries(areas.map((a) => [a.id, porArea[a.id] / (a.campos.length * 2)])) as Record<AreaId, number>;
  const padrao = padroes.find((p) => p.quando(proporcoes));
  const base = perfis.find((p) => pontos <= p.ate) ?? perfis[perfis.length - 1];
  const perfil = padrao ?? { titulo: base.titulo, texto: base.texto };

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
