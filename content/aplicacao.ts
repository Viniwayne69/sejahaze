/**
 * Textos, perguntas e regras do mini diagnóstico (/aplicar).
 * Para mudar uma pergunta, opção, perfil ou ponto de atenção, edite aqui: o componente só lê deste arquivo.
 */

export type CampoId = 'nome' | 'empresa' | 'processo' | 'desconto' | 'diferenca' | 'trava' | 'faturamento' | 'telefone';

export type Pergunta =
  | { id: 'nome' | 'empresa'; tipo: 'texto'; titulo: string; ajuda?: string; placeholder: string }
  | { id: 'telefone'; tipo: 'tel'; titulo: string; ajuda?: string; placeholder: string }
  | { id: 'processo' | 'desconto' | 'diferenca' | 'trava' | 'faturamento'; tipo: 'opcoes'; titulo: string; ajuda?: string; opcoes: readonly string[] };

/**
 * As três primeiras perguntas de opções valem pontos: a primeira opção vale 2, a segunda 1 e a terceira 0.
 * Por isso elas vão sempre da melhor para a pior resposta.
 */
export const perguntas: readonly Pergunta[] = [
  { id: 'nome', tipo: 'texto', titulo: 'Qual o seu primeiro nome?', placeholder: 'Digite seu nome' },
  { id: 'empresa', tipo: 'texto', titulo: 'Qual o nome do seu negócio?', placeholder: 'Ex: Almeida & Silva' },
  {
    id: 'processo',
    tipo: 'opcoes',
    titulo: 'Você já tem um processo comercial definido?',
    opcoes: ['Sim, bem definido', 'Mais ou menos, cada um faz de um jeito', 'Não tenho'],
  },
  {
    id: 'desconto',
    tipo: 'opcoes',
    titulo: 'Com que frequência você dá desconto para fechar uma venda?',
    opcoes: ['Nunca', 'Às vezes', 'Quase sempre'],
  },
  {
    id: 'diferenca',
    tipo: 'opcoes',
    titulo: 'O seu cliente sabe dizer por que você é diferente?',
    opcoes: ['Sim, com clareza', 'Mais ou menos', 'Não, ele compara com os outros'],
  },
  {
    id: 'trava',
    tipo: 'opcoes',
    titulo: 'O que mais trava o seu crescimento hoje?',
    opcoes: ['Atrair os clientes certos', 'Fechar as vendas', 'Vender barato', 'A equipe', 'Não sei'],
  },
  {
    id: 'faturamento',
    tipo: 'opcoes',
    titulo: 'Qual o faturamento anual da sua empresa?',
    ajuda: 'Escolha a faixa que mais se aproxima da sua realidade',
    opcoes: [
      'Ainda não faturamos',
      'Até R$ 500 mil/ano',
      'R$ 500 mil – 1 mi/ano',
      'R$ 1 – 5 mi/ano',
      'R$ 5 – 10 mi/ano',
      'R$ 10 – 50 mi/ano',
      'R$ 50 – 200 mi/ano',
      'R$ 200 mi+/ano',
    ],
  },
  {
    id: 'telefone',
    tipo: 'tel',
    titulo: 'Qual o seu WhatsApp?',
    ajuda: 'Com DDD, o seu resultado aparece na próxima tela e a equipe continua a conversa por aqui',
    placeholder: '(11) 99999-9999',
  },
];

/** Depois do nome, só esta pergunta chama a pessoa pelo primeiro nome, para não ficar repetitivo. */
export const titulosComNome: Partial<Record<CampoId, (nome: string) => string>> = {
  processo: (n) => `${n}, você já tem um processo comercial definido?`,
};

/** Perfis pela pontuação (0 a 6): quanto menor, mais a marca está na névoa. */
export const perfis = [
  {
    ate: 2,
    titulo: 'MARCA NA NÉVOA',
    texto: 'Hoje o cliente enxerga pouco do que você tem de melhor, e o preço acaba decidindo a compra',
  },
  {
    ate: 4,
    titulo: 'MARCA EM CONSTRUÇÃO',
    texto: 'Você tem boas bases, mas ainda deixa dinheiro na mesa por falta de clareza e de processo',
  },
  {
    ate: 6,
    titulo: 'MARCA QUASE DESEJADA',
    texto: 'Os seus pilares estão firmes, o próximo passo é escalar o que já funciona',
  },
] as const;

/** Ponto de atenção por pergunta: [pontuação 0, pontuação 1]. Com 2 pontos não há alerta. */
export const atencao = {
  processo: ['Sem processo comercial, cada venda depende de improviso', 'O processo existe, mas cada pessoa vende de um jeito'],
  desconto: ['Desconto frequente ensina o cliente a esperar preço baixo', 'O desconto ocasional já mostra que o preço não se sustenta sozinho'],
  diferenca: ['O cliente compara você só pelo preço', 'A sua diferença existe, mas o cliente ainda não a enxerga com clareza'],
} as const;

/** Por onde começar (índice da etapa do método): pontuação baixa começa pelo diagnóstico, senão depende da maior trava. */
export const etapaPorTrava: Record<string, 0 | 1 | 2> = {
  'Atrair os clientes certos': 1,
  'Fechar as vendas': 1,
  'Vender barato': 1,
  'A equipe': 2,
  'Não sei': 0,
};

export const textosAplicacao = {
  metaTitle: 'HAZE | Diagnóstico',
  metaDescription: '7 perguntas, 2 minutos e uma leitura direta do que está travando as suas vendas',
  boasVindas: {
    antes: 'QUANTO A SUA MARCA ESTÁ TE FAZENDO',
    destaque: 'PERDER?',
    paragrafos: ['7 perguntas, 2 minutos e uma leitura direta do que está travando as suas vendas'],
    fotoAlt:
      'Dona de uma marca olhando por cima do ombro, diante da loja com letreiro ciano e uma fila de clientes com sacolas pretas esperando para entrar',
    botao: 'Iniciar diagnóstico',
  },
  som: { arquivo: '/audio/get-away.mp3', rotulo: 'Escute um som enquanto nos conta sobre você' },
  ok: 'OK',
  dicaEnter: 'ou pressione Enter',
  voltar: 'Voltar',
  ver: 'Ver o meu resultado',
  enviando: 'Enviando',
  de: 'de',
  incentivos: { quaseLa: 'Quase lá', ultima: 'Última pergunta' },
  erros: {
    obrigatoria: 'Esta pergunta é obrigatória',
    nome: 'Informe o seu primeiro nome',
    telefone: 'Informe um WhatsApp válido com DDD',
    envio: 'Não foi possível enviar agora, tente novamente em instantes',
  },
  resultado: {
    rotulo: 'Leitura rápida da sua marca',
    pontuacao: (pontos: number) => `${pontos} de 6`,
    atencaoTitulo: 'Pontos de atenção',
    atencaoTrava: (trava: string) => `Você apontou como maior trava: ${trava.toLowerCase()}`,
    atencaoOk: 'Processo, preço e diferença estão firmes, o desafio agora é crescer',
    comecarTitulo: 'Por onde começar',
    whatsappBotao: 'Falar com a HAZE sobre o meu resultado',
    whatsappMensagem: (nome: string, empresa: string, perfil: string, faturamento: string) =>
      `Oi, sou ${nome}, da ${empresa}. Fiz o diagnóstico da HAZE e o meu resultado foi: ${perfil.toLowerCase()}. Faturamento: ${faturamento}. Quero conversar`,
    semWhatsapp: 'Recebemos as suas respostas, em breve nossa equipe entra em contato pelo WhatsApp',
    nota: 'Leitura baseada nas suas respostas, o diagnóstico completo acontece na primeira etapa',
    voltarSite: 'Voltar ao site',
  },
} as const;
