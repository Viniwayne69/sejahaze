/**
 * Leitura rápida das dores, calculada só pelas respostas (sem IA): cada pergunta de dor vale 0, 1 ou 2 pontos
 * (a primeira opção vale 0, a terceira 2), a soma (0 a 8) vira uma nota de 1 a 10 de dificuldade hoje.
 */

import { camposDeDor, perfis, perguntas } from '@/content/aplicacao';
import type { RespostasAplicacao } from './aplicacao';

export type Diagnostico = {
  /** Soma dos pontos de dificuldade (0 a 8). */
  pontos: number;
  /** Nota de 1 a 10: 1 é tranquilo, 10 é crítico. */
  nota: number;
  perfil: (typeof perfis)[number];
  /** Área com mais pontos de dificuldade (a que mais trava), ou null se nenhuma pontuou. */
  fraco: (typeof camposDeDor)[number] | null;
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
  // Em empate, vale a ordem abaixo: do que mais liga à oferta da HAZE para o que menos liga
  const prioridade = ['diferenca', 'folga', 'preco', 'procura'] as const;
  let fraco: Diagnostico['fraco'] = null;
  let melhor = 0;
  for (const id of prioridade) {
    const p = pontosDe(id, r[id]);
    if (p > melhor) {
      melhor = p;
      fraco = id;
    }
  }
  return { pontos, nota: Math.round(1 + (pontos / maximo) * 9), perfil, fraco };
}
